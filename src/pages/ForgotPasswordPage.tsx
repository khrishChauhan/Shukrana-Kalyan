/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Award, ArrowLeft, Phone, KeyRound, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      alert("Please enter the 4-digit OTP.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Success step
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] selection:bg-[#ED8C32] selection:text-white font-sans p-4">
      
      <div className="w-full max-w-[500px]">
        {/* Header Logo & Back Button */}
        <div className="mb-8 flex flex-col items-center">
          <Link to="/login" className="inline-flex items-center gap-2 px-3 py-2 bg-white text-[#232F46] text-xs font-semibold rounded-lg shadow-sm border border-slate-200 mb-6 self-start">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Login</span>
          </Link>
          <div className="p-3 bg-[#ED8C32] rounded-xl text-white inline-flex items-center justify-center mb-4 shadow-sm">
            <Award className="h-8 w-8 stroke-[2]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#232F46] tracking-tight uppercase text-center">
            Recover Account
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200">
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-xl font-bold text-[#232F46] mb-2 text-center">Forgot Password?</h2>
              <p className="text-sm text-slate-500 text-center mb-8">Enter your registered mobile number to receive a 4-digit OTP.</p>
              
              <form onSubmit={handleMobileSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit number"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#ED8C32] hover:bg-[#D97A24] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                >
                  {isSubmitting ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-orange-50 rounded-full">
                  <KeyRound className="h-6 w-6 text-[#ED8C32]" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-[#232F46] mb-2 text-center">Verify OTP</h2>
              <p className="text-sm text-slate-500 text-center mb-8">We've sent a 4-digit code to <strong className="text-[#232F46]">{mobile}</strong></p>
              
              <form onSubmit={handleOtpSubmit} className="space-y-8">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-14 h-14 text-center text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-[#232F46]"
                    />
                  ))}
                </div>
                
                <div className="text-center">
                  <button type="button" className="text-sm text-[#ED8C32] font-semibold hover:underline">
                    Resend Code
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#ED8C32] hover:bg-[#D97A24] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                >
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-xl font-bold text-[#232F46] mb-2 text-center">Set New Password</h2>
              <p className="text-sm text-slate-500 text-center mb-8">Create a strong password for your account.</p>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 focus:outline-none">
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#ED8C32] hover:bg-[#D97A24] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm mt-4 disabled:opacity-70"
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in zoom-in-95 duration-300 text-center py-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-[#232F46] mb-2">Password Updated</h2>
              <p className="text-sm text-slate-500 mb-8">Your password has been successfully reset. You can now login with your new credentials.</p>
              
              <Link
                to="/login"
                className="w-full py-3.5 bg-[#ED8C32] hover:bg-[#D97A24] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm inline-flex"
              >
                Go to Login
              </Link>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
