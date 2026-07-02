import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function maskPan(pan: string): string {
  if (!pan || pan.length !== 10) return "XXXXXXXXXX";
  return `XXXXX${pan.slice(5, 9)}${pan[9]}`;
}

function isValidPan(pan: string): boolean {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase());
}

function isValidDob(dob: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dob);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sandboxApiKey = Deno.env.get("SANDBOX_API_KEY");
    const sandboxApiSecret = Deno.env.get("SANDBOX_API_SECRET");

    if (!sandboxApiKey || !sandboxApiSecret) {
      console.error("Missing Sandbox API credentials in environment variables.");
      return new Response(JSON.stringify({ error: "Server misconfiguration. Contact support." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUser = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid session." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const panRaw: string = (body.pan_number || "").toUpperCase().trim();
    const fullName: string = (body.full_name || "").trim();
    const dob: string = (body.dob || "").trim();

    if (!isValidPan(panRaw)) {
      return new Response(JSON.stringify({ error: "Invalid PAN format. Must be like ABCDE1234F." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!fullName) {
      return new Response(JSON.stringify({ error: "Full name is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!isValidDob(dob)) {
      return new Response(JSON.stringify({ error: "Invalid Date of Birth. Use YYYY-MM-DD format." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const maskedPan = maskPan(panRaw);

    // Step 1: Get Sandbox Auth Token
    let sandboxToken: string;
    try {
      const tokenRes = await fetch("https://api.sandbox.co.in/authenticate", {
        method: "POST",
        headers: {
          "x-api-key": sandboxApiKey,
          "x-api-secret": sandboxApiSecret,
          "x-api-version": "1.0",
        },
      });
      if (!tokenRes.ok) {
        throw new Error(`Sandbox auth failed with status ${tokenRes.status}`);
      }
      const tokenData = await tokenRes.json();
      sandboxToken = tokenData.access_token;
    } catch (e: any) {
      console.error("Sandbox auth error:", e.message);
      await supabaseAdmin.from("activity_logs").insert({
        member_uuid: user.id,
        action: "KYC_PAN_VERIFICATION_FAILED",
        details: { masked_pan: maskedPan, reason: "Sandbox API unavailable", provider: "SANDBOX" },
        created_by: user.id,
      });
      return new Response(JSON.stringify({ error: "Verification service is currently unavailable. Please try again later." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 2: Call Sandbox PAN Verification API
    let verificationRef: string | null = null;
    let verificationSuccess = false;
    let failureReason: string | null = null;

    try {
      const panRes = await fetch("https://api.sandbox.co.in/kyc/pan/verify", {
        method: "POST",
        headers: {
          "Authorization": sandboxToken,
          "x-api-key": sandboxApiKey,
          "x-api-version": "1.0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "@entity": "in.co.sandbox.kyc.pan_verification.request",
          "pan": panRaw,
          "name_as_per_pan": fullName,
          "date_of_birth": dob,
          "consent": "y",
          "reason": "For KYC Verification"
        }),
      });

      const sandboxResult = await panRes.json();

      if (panRes.ok && (sandboxResult.code === 200 || sandboxResult.data?.status === "VALID")) {
        verificationSuccess = true;
        verificationRef = sandboxResult.data?.reference_id || sandboxResult.transaction_id || null;
      } else {
        failureReason = sandboxResult.message || sandboxResult.data?.message || "PAN verification failed.";
      }
    } catch (e: any) {
      console.error("Sandbox PAN API error:", e.message);
      failureReason = "Verification service timeout. Please try again.";
    }

    const nowIso = new Date().toISOString();

    // Step 3: Update member_kyc table
    await supabaseAdmin
      .from("member_kyc")
      .update({
        pan_masked: maskedPan,
        pan_status: verificationSuccess ? "VERIFIED" : "REJECTED",
        pan_verification_ref: verificationRef,
        pan_verified_at: verificationSuccess ? nowIso : null,
        pan_verification_provider: "SANDBOX",
        pan_failure_reason: failureReason,
        updated_at: nowIso,
        updated_by: user.id,
      })
      .eq("id", user.id);

    // Step 4: Activity Log (never logs full PAN)
    await supabaseAdmin.from("activity_logs").insert({
      member_uuid: user.id,
      action: verificationSuccess ? "KYC_PAN_VERIFICATION_SUCCESS" : "KYC_PAN_VERIFICATION_FAILED",
      details: {
        masked_pan: maskedPan,
        provider: "SANDBOX",
        reference_id: verificationRef,
        ...(failureReason ? { reason: failureReason } : {}),
      },
      created_by: user.id,
    });

    // Step 5: Notification
    await supabaseAdmin.from("notifications").insert({
      member_uuid: user.id,
      title: verificationSuccess ? "PAN Verified Successfully ✅" : "PAN Verification Failed ❌",
      message: verificationSuccess
        ? `Your PAN (${maskedPan}) has been verified successfully.`
        : `Your PAN verification failed. Reason: ${failureReason}`,
      type: verificationSuccess ? "SUCCESS" : "WARNING",
    });

    if (verificationSuccess) {
      return new Response(JSON.stringify({
        success: true,
        masked_pan: maskedPan,
        reference_id: verificationRef,
        verified_at: nowIso,
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: failureReason }), {
        status: 422,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (err: any) {
    console.error("Unhandled error in verify-pan:", err.message);
    return new Response(JSON.stringify({ error: "Internal server error. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
