import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';
import {
  CreditCard, CheckCircle2, XCircle, Loader2, ShieldCheck,
  AlertCircle, RefreshCw, Calendar, User, Hash, Info
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────
type PanStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'PROCESSING';

interface KycState {
  panStatus: PanStatus;
  panMasked: string | null;
  panVerifiedAt: string | null;
  panFailureReason: string | null;
  panRef: string | null;
}

// ─── Helpers ────────────────────────────────────────────────────────────────
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ─── Status Display ─────────────────────────────────────────────────────────
const StatusBanner = ({ status, maskedPan, verifiedAt, failureReason, refId }: {
  status: PanStatus;
  maskedPan: string | null;
  verifiedAt: string | null;
  failureReason: string | null;
  refId: string | null;
}) => {
  if (status === 'VERIFIED') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-1">PAN Verification Successful</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            <div>
              <p className="text-[10px] text-emerald-600 font-semibold uppercase">Masked PAN</p>
              <p className="text-sm font-black text-emerald-800 font-mono">{maskedPan || '—'}</p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-600 font-semibold uppercase">Verified On</p>
              <p className="text-sm font-bold text-emerald-800">{formatDate(verifiedAt)}</p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-600 font-semibold uppercase">Reference ID</p>
              <p className="text-xs font-mono text-emerald-700 break-all">{refId || '—'}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (status === 'REJECTED') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-red-50 border border-red-200 p-4 flex items-start gap-3"
      >
        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-red-700">Previous attempt failed</p>
          <p className="text-xs text-red-600 mt-0.5">{failureReason || 'PAN details could not be verified. Please check your details and retry.'}</p>
        </div>
      </motion.div>
    );
  }

  return null;
};

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function KycCenterPage() {
  const [loading, setLoading] = useState(true);
  const [kycState, setKycState] = useState<KycState>({
    panStatus: 'PENDING',
    panMasked: null,
    panVerifiedAt: null,
    panFailureReason: null,
    panRef: null,
  });

  // Form state
  const [panNumber, setPanNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [consent, setConsent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<{ success: boolean; message: string } | null>(null);

  const fetchKyc = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: kyc }, { data: profile }] = await Promise.all([
        supabase.from('member_kyc').select('pan_status, pan_masked, pan_verified_at, pan_failure_reason, pan_verification_ref').eq('id', user.id).maybeSingle(),
        supabase.from('member_profile').select('full_name').eq('id', user.id).maybeSingle(),
      ]);

      setKycState({
        panStatus: (kyc?.pan_status as PanStatus) || 'PENDING',
        panMasked: kyc?.pan_masked || null,
        panVerifiedAt: kyc?.pan_verified_at || null,
        panFailureReason: kyc?.pan_failure_reason || null,
        panRef: kyc?.pan_verification_ref || null,
      });

      if (profile?.full_name) setFullName(profile.full_name);
    } catch (e) {
      console.error('Error fetching KYC:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchKyc(); }, [fetchKyc]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setVerifyResult(null);

    // Client-side validation
    const panUpper = panNumber.toUpperCase().trim();
    if (!PAN_REGEX.test(panUpper)) {
      setFormError('Invalid PAN format. It must be 10 characters like ABCDE1234F.');
      return;
    }
    if (!fullName.trim()) {
      setFormError('Full name is required.');
      return;
    }
    if (!dob) {
      setFormError('Date of Birth is required.');
      return;
    }
    if (!consent) {
      setFormError('You must provide consent to proceed with verification.');
      return;
    }

    setVerifying(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('Session expired. Please log in again.');

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const res = await fetch(`${supabaseUrl}/functions/v1/verify-pan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ pan_number: panUpper, full_name: fullName.trim(), dob }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setVerifyResult({ success: true, message: `PAN ${result.masked_pan} verified successfully!` });
        // Refresh KYC state
        await fetchKyc();
      } else {
        const errMsg = result.error || 'Verification failed. Please check your details and try again.';
        setVerifyResult({ success: false, message: errMsg });
        // Refresh to update status
        await fetchKyc();
      }
    } catch (err: any) {
      setVerifyResult({ success: false, message: err.message || 'An unexpected error occurred.' });
    } finally {
      setVerifying(false);
    }
  };

  const isVerified = kycState.panStatus === 'VERIFIED';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="KYC Center"
        description="Complete PAN Card verification to enable withdrawals and full portal access."
        breadcrumbs={[{ label: 'Account' }, { label: 'KYC Center' }]}
      />

      {/* Status Header Card */}
      <Card className="bg-[#232F46] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
            isVerified ? 'bg-emerald-500' : kycState.panStatus === 'REJECTED' ? 'bg-red-500/80' : 'bg-white/10'
          }`}>
            {isVerified
              ? <ShieldCheck className="w-7 h-7 text-white" />
              : kycState.panStatus === 'REJECTED'
              ? <XCircle className="w-7 h-7 text-white" />
              : <CreditCard className="w-7 h-7 text-white/60" />
            }
          </div>
          <div>
            <p className="text-xs text-white/50 uppercase font-bold tracking-wider">PAN Verification</p>
            <p className="text-lg font-black mt-0.5">
              {isVerified ? 'Verified' : kycState.panStatus === 'REJECTED' ? 'Verification Failed' : 'Not Yet Verified'}
            </p>
            {kycState.panMasked && (
              <p className="text-sm font-mono text-[#ED8C32] mt-0.5">{kycState.panMasked}</p>
            )}
          </div>
          <div className="ml-auto shrink-0">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
              isVerified ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : kycState.panStatus === 'REJECTED' ? 'bg-red-500/20 text-red-300 border border-red-500/30'
              : 'bg-white/10 text-white/60 border border-white/10'
            }`}>
              {kycState.panStatus}
            </span>
          </div>
        </div>
      </Card>

      {/* Loading skeleton */}
      {loading ? (
        <Card>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-100 rounded w-1/3" />
            <div className="h-10 bg-gray-100 rounded" />
            <div className="h-10 bg-gray-100 rounded" />
            <div className="h-10 bg-gray-100 rounded" />
          </div>
        </Card>
      ) : isVerified ? (
        /* ── Verified State ─────────────────────────────────────────────── */
        <StatusBanner
          status={kycState.panStatus}
          maskedPan={kycState.panMasked}
          verifiedAt={kycState.panVerifiedAt}
          failureReason={kycState.panFailureReason}
          refId={kycState.panRef}
        />
      ) : (
        /* ── PAN Verification Form ──────────────────────────────────────── */
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#232F46] flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-[#ED8C32]" />
            </div>
            <div>
              <h3 className="font-bold text-[#232F46]">PAN Card Verification</h3>
              <p className="text-xs text-gray-500">Powered by Sandbox.co.in — Secure & Instant</p>
            </div>
          </div>

          {/* Previous failure banner */}
          <AnimatePresence>
            {kycState.panStatus === 'REJECTED' && !verifyResult && (
              <StatusBanner
                status="REJECTED"
                maskedPan={null}
                verifiedAt={null}
                failureReason={kycState.panFailureReason}
                refId={null}
              />
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-5 mt-5">
            {/* PAN Number */}
            <div>
              <label className="block text-sm font-bold text-[#232F46] mb-1.5">
                PAN Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={panNumber}
                  onChange={e => setPanNumber(e.target.value.toUpperCase())}
                  maxLength={10}
                  placeholder="ABCDE1234F"
                  disabled={verifying}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#ED8C32] text-sm font-mono tracking-widest placeholder:font-sans placeholder:tracking-normal uppercase"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                <Info className="w-3 h-3" /> Format: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-[#232F46] mb-1.5">
                Full Name (as on PAN) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Your full name"
                  disabled={verifying}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#ED8C32] text-sm"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-bold text-[#232F46] mb-1.5">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  disabled={verifying}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#ED8C32] text-sm"
                />
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                disabled={verifying}
                className="mt-0.5 w-4 h-4 accent-[#232F46] shrink-0 cursor-pointer"
              />
              <label htmlFor="consent" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                I hereby consent to the verification of my PAN details with the Income Tax Department of India through a third-party verification service (Sandbox). I confirm that the information I have provided is accurate and true.
              </label>
            </div>

            {/* Form error */}
            <AnimatePresence>
              {formError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 font-medium">{formError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence>
              {verifyResult && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-start gap-2 p-3 rounded-xl border ${
                    verifyResult.success
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  {verifyResult.success
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    : <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  }
                  <p className={`text-xs font-semibold ${verifyResult.success ? 'text-emerald-700' : 'text-red-600'}`}>
                    {verifyResult.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={verifying}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#232F46] text-white font-bold rounded-xl hover:bg-[#1a2333] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : kycState.panStatus === 'REJECTED' ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Retry Verification
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Verify PAN
                </>
              )}
            </button>
          </form>
        </Card>
      )}

      {/* Info card */}
      <Card className="bg-gray-50 border-gray-100">
        <h3 className="font-bold text-[#232F46] mb-3 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-[#ED8C32]" /> Why PAN Verification?
        </h3>
        <ul className="space-y-2 text-xs text-gray-500 list-disc pl-4">
          <li>Required by RBI guidelines for financial transactions above ₹50,000.</li>
          <li>Enables wallet withdrawal requests and income disbursals.</li>
          <li>Your PAN number is masked after verification — we never store the full number.</li>
          <li>Verification is instant and powered by Sandbox.co.in's secure API.</li>
        </ul>
      </Card>
    </motion.div>
  );
}
