/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Award, ArrowLeft, QrCode, UploadCloud, Copy, CheckCircle2, Clock, FileText, ChevronRight, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PaymentSubmissionPage() {
  const navigate = useNavigate();
  
  // Use status: 'Required' | 'Pending' | 'Approved' | 'Rejected'
  const [paymentStatus, setPaymentStatus] = useState<'Required' | 'Pending' | 'Approved' | 'Rejected'>('Required');
  
  const [utrNumber, setUtrNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [joiningAmount, setJoiningAmount] = useState('2100');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Demo Mode logic
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showDemoControls, setShowDemoControls] = useState(false);

  useEffect(() => {
    // Check Demo Mode
    const urlParams = new URLSearchParams(window.location.search);
    const hasDemoParam = urlParams.get('demo') === 'true';
    const hasEnvDemo = import.meta.env.VITE_DEMO_MODE === 'true';
    
    if (hasDemoParam || hasEnvDemo) {
      setIsDemoMode(true);
    }

    // Load joining amount
    const fetchConfig = async () => {
      const { data, error } = await supabase.from('system_settings').select('value').eq('key', 'joining_amount').single();
      if (data && !error) {
        setJoiningAmount(data.value);
      }
    };
    fetchConfig();

    // Check actual status from Supabase
    const checkStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Check member status
        const { data: member } = await supabase.from('members').select('status').eq('id', user.id).single();
        if (member?.status === 'ACTIVE') {
           setPaymentStatus('Approved');
           return;
        }

        // Check payment status
        const { data: payments } = await supabase.from('payments').select('status').eq('member_id', user.id).order('created_at', { ascending: false }).limit(1);
        if (payments && payments.length > 0) {
           const pStatus = payments[0].status;
           if (pStatus === 'PENDING') setPaymentStatus('Pending');
           else if (pStatus === 'REJECTED') setPaymentStatus('Rejected');
           else if (pStatus === 'VERIFIED') setPaymentStatus('Approved');
        } else {
           setPaymentStatus('Required');
        }
      } catch (err) {
        console.error("Error fetching status", err);
      }
    };
    
    checkStatus();
  }, []);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('shukranakalyan@sbi');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.length < 12) {
      alert("Please enter a valid 12-digit UTR/Transaction ID");
      return;
    }
    if (!file) {
      alert("Please upload a payment screenshot");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // 1. Get current member id
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // 2. Upload file to storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(filePath);

      // 3. Insert payment record
      const { error: dbError } = await supabase.from('payments').insert({
        member_id: user.id,
        amount: Number(joiningAmount),
        utr_number: utrNumber,
        screenshot_url: publicUrlData.publicUrl
      });

      if (dbError) throw dbError;

      setPaymentStatus('Pending');
    } catch (error: any) {
      alert(error.message || "Failed to submit payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo Actions
  const demoApprove = () => {
    setPaymentStatus('Approved');
    localStorage.setItem('shukrana_payment_status', 'Approved');
    localStorage.setItem('shukrana_session', JSON.stringify({
      authenticated: true,
      role: 'Member',
      username: 'demo',
      time: new Date().toISOString(),
    }));
  };

  const demoReject = () => {
    setPaymentStatus('Rejected');
    localStorage.setItem('shukrana_payment_status', 'Rejected');
    setUtrNumber('');
    setFileName('');
  };
  
  const demoReset = () => {
    setPaymentStatus('Required');
    localStorage.setItem('shukrana_payment_status', 'Required');
    setUtrNumber('');
    setFileName('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] selection:bg-[#ED8C32] selection:text-white font-sans p-4 py-12 relative pb-24">
      
      <div className="w-full max-w-[600px]">
        {/* Header Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="p-3 bg-[#ED8C32] rounded-xl text-white inline-flex items-center justify-center mb-4 shadow-sm">
            <Award className="h-8 w-8 stroke-[2]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#232F46] tracking-tight uppercase text-center">
            Membership Activation
          </h1>
        </div>

        {/* Dynamic Card Content Based on Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {paymentStatus === 'Required' || paymentStatus === 'Rejected' ? (
            <div>
              {/* Payment Details Section */}
              <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
                
                {paymentStatus === 'Rejected' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-800">
                    <CheckCircle2 className="shrink-0 h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-bold">Verification Failed</p>
                      <p className="text-xs mt-1">Your previous payment submission was rejected. Please verify the details and submit again.</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  {/* QR Code Placeholder */}
                  <div className="shrink-0 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="w-32 h-32 bg-slate-100 rounded flex items-center justify-center border-2 border-dashed border-slate-300">
                      <QrCode className="w-12 h-12 text-slate-400" />
                    </div>
                    <p className="text-[10px] text-center font-bold text-slate-400 uppercase mt-3 tracking-widest">Scan to Pay</p>
                  </div>

                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Activation Fee</p>
                      <p className="text-3xl font-bold text-[#232F46]">₹{joiningAmount}<span className="text-sm text-slate-500 font-normal ml-1">/ lifetime</span></p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-200">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">UPI ID</p>
                        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-2 px-3">
                          <span className="text-sm font-semibold text-[#232F46]">shukranakalyan@sbi</span>
                          <button onClick={handleCopyUpi} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
                            {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Bank</p>
                          <p className="text-sm font-semibold text-[#232F46]">State Bank of India</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">IFSC</p>
                          <p className="text-sm font-semibold text-[#232F46]">SBIN0001234</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submission Form Section */}
              <div className="p-6 sm:p-8">
                <h3 className="font-bold text-[#232F46] mb-4">Submit Payment Details</h3>
                <form onSubmit={handleSubmitPayment} className="space-y-5">
                  
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">UTR / Reference Number</label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="12-digit transaction number"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Payment Screenshot</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        id="screenshot" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                      <label 
                        htmlFor="screenshot" 
                        className="flex flex-col items-center justify-center w-full py-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                        <span className="text-sm font-medium text-[#232F46]">
                          {fileName ? fileName : "Upload screenshot"}
                        </span>
                        <span className="text-xs text-slate-500 mt-1">JPEG, PNG up to 2MB</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !utrNumber}
                    className="w-full py-3.5 bg-[#ED8C32] hover:bg-[#D97A24] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit For Verification"}
                  </button>

                </form>
              </div>
            </div>
          ) : paymentStatus === 'Pending' ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#232F46] mb-2">Verification Pending</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">Your payment details have been submitted and are currently under review by our team. This usually takes 2-4 hours.</p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 inline-block mb-8">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Submitted UTR</p>
                <p className="text-lg font-mono font-bold text-[#232F46]">{utrNumber || '123456789012'}</p>
              </div>

              <Link to="/" className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-[#232F46] rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm">
                Return to Homepage
              </Link>
            </div>
          ) : paymentStatus === 'Approved' ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#232F46] mb-2">Account Activated</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">Your payment has been successfully verified. Your member account is now active and ready to use.</p>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 bg-[#ED8C32] hover:bg-[#D97A24] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Go to Dashboard <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : null}

        </div>
      </div>

      {/* Floating Demo Controls (Bottom Right) */}
      {isDemoMode && (
        <div className="fixed bottom-6 right-6 z-50">
          {!showDemoControls ? (
            <button 
              onClick={() => setShowDemoControls(true)}
              className="w-12 h-12 bg-slate-800 hover:bg-slate-900 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
              title="Demo Controls"
            >
              <Settings className="w-5 h-5 animate-[spin_4s_linear_infinite]" />
            </button>
          ) : (
            <div className="bg-slate-800 text-white rounded-xl shadow-2xl p-4 w-64 border border-slate-700 animate-in slide-in-from-bottom-5 duration-200">
              <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-orange-400" />
                  <h4 className="font-bold text-sm">Demo Controls</h4>
                </div>
                <button 
                  onClick={() => setShowDemoControls(false)}
                  className="text-slate-400 hover:text-white"
                >
                  &times;
                </button>
              </div>
              <p className="text-xs text-slate-400 mb-3 leading-tight">
                Simulate backend payment verification status changes.
              </p>
              <div className="space-y-2">
                <button 
                  onClick={demoApprove}
                  className="w-full py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-bold rounded border border-green-500/30 transition-colors"
                >
                  Simulate Approve
                </button>
                <button 
                  onClick={demoReject}
                  className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold rounded border border-red-500/30 transition-colors"
                >
                  Simulate Reject
                </button>
                <button 
                  onClick={demoReset}
                  className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-bold rounded transition-colors mt-2"
                >
                  Reset State
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
