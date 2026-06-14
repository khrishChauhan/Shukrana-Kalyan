/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Award, ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Bell, Eye, EyeOff, User, MapPin, Mail, Phone, Lock, FileText, Check } from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    state: '',
    district: '',
    sponsorId: '',
    placement: 'left',
    password: '',
    confirmPassword: '',
    agreeTnc: false,
    agreePrivacy: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
      return;
    }

    if (!formData.agreeTnc || !formData.agreePrivacy) {
      alert("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    // Simulate backend processing
    setTimeout(() => {
      // Mock successful registration
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Store pending member state
      localStorage.setItem('shukrana_member_id', 'SK000123');
      localStorage.setItem('shukrana_payment_status', 'Pending');
    }, 1500);
  };

  // Mock auto-fill for sponsor name based on ID
  const sponsorName = formData.sponsorId.length >= 3 ? "SKS Sponsor Desk" : "";

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] selection:bg-[#ED8C32] selection:text-white font-sans">
      
      {/* LEFT COLUMN - BRAND & MISSION */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#232F46] text-white p-12 lg:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ED8C32] rounded-bl-full opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ED8C32] rounded-tr-full opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-start gap-4">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Website</span>
          </Link>
          
          <div className="mt-12 p-3 bg-[#ED8C32] rounded-xl text-white inline-flex items-center justify-center">
            <Award className="h-10 w-10 stroke-[2]" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mt-4">
            Become a <br />Member
          </h1>
          <p className="text-lg text-white/80 max-w-md mt-4">
            Join the Shukrana Kalyan Sangh Foundation and become part of a nationwide welfare network.
          </p>
        </div>

        <div className="relative z-10 mt-16 space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/10 rounded-lg shrink-0 mt-1">
              <ShieldCheck className="h-6 w-6 text-[#ED8C32]" />
            </div>
            <div>
              <h3 className="font-bold text-white">Access Welfare Programs</h3>
              <p className="text-sm text-white/70 mt-1">Apply for financial and social assistance exclusively for members.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/10 rounded-lg shrink-0 mt-1">
              <CreditCard className="h-6 w-6 text-[#ED8C32]" />
            </div>
            <div>
              <h3 className="font-bold text-white">Official Identity Card</h3>
              <p className="text-sm text-white/70 mt-1">Receive a physical and digital membership card for identification.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/10 rounded-lg shrink-0 mt-1">
              <Bell className="h-6 w-6 text-[#ED8C32]" />
            </div>
            <div>
              <h3 className="font-bold text-white">Foundation Updates</h3>
              <p className="text-sm text-white/70 mt-1">Get priority notifications on new programs and organizational news.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-white/50 mt-12 flex justify-between items-center w-full">
          <span>&copy; {new Date().getFullYear()} SKS Foundation</span>
          <Link to="/login" className="text-white hover:text-[#ED8C32] font-semibold transition-colors underline-offset-4 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>

      {/* RIGHT COLUMN - REGISTRATION FORM */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-lg">
          
          {/* Mobile Header (Visible only on mobile) */}
          <div className="lg:hidden mb-8 flex flex-col items-center">
            <div className="flex w-full justify-between items-center mb-6">
              <Link to="/" className="inline-flex items-center gap-2 px-3 py-2 bg-white text-[#232F46] text-xs font-semibold rounded-lg shadow-sm border border-slate-200">
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Link>
              <Link to="/login" className="text-sm font-semibold text-[#ED8C32]">
                Login Instead
              </Link>
            </div>
            <div className="p-3 bg-[#ED8C32] rounded-xl text-white inline-flex items-center justify-center mb-4 shadow-sm">
              <Award className="h-8 w-8 stroke-[2]" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#232F46] tracking-tight uppercase text-center">
              Member Registration
            </h1>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200">
            
            {isSuccess ? (
              // SUCCESS VIEW
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-[#232F46] mb-2">Registration Successful</h2>
                <p className="text-slate-600 mb-6">Your member account has been created successfully. Complete your payment to activate.</p>
                
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 inline-block w-full">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Your Member ID</p>
                  <p className="text-3xl font-mono font-bold text-[#232F46]">SK000123</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    Pending Payment
                  </div>
                </div>

                <button
                  onClick={() => navigate('/payment-submission')}
                  className="w-full py-4 bg-[#ED8C32] hover:bg-[#D97A24] text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Proceed to Payment
                </button>
              </div>
            ) : (
              // REGISTRATION FORM
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#232F46] mb-2">Create Account</h2>
                  
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between mt-6 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full -z-10" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#ED8C32] rounded-full -z-10 transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }} />
                    
                    {[1, 2, 3, 4].map((num) => (
                      <div 
                        key={num}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                          step >= num 
                            ? 'bg-[#ED8C32] border-[#ED8C32] text-white' 
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}
                      >
                        {step > num ? <Check className="w-4 h-4" /> : num}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-2">
                    <span className={step >= 1 ? "text-[#ED8C32]" : ""}>Personal</span>
                    <span className={step >= 2 ? "text-[#ED8C32]" : ""}>Sponsor</span>
                    <span className={step >= 3 ? "text-[#ED8C32]" : ""}>Security</span>
                    <span className={step >= 4 ? "text-[#ED8C32]" : ""}>Confirm</span>
                  </div>
                </div>

                <form onSubmit={handleRegisterSubmit}>
                  
                  {/* STEP 1: Personal Info */}
                  {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input type="text" required name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Mobile Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input type="tel" required name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="10-digit number" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Email (Optional)</label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email address" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">State</label>
                          <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input type="text" required name="state" value={formData.state} onChange={handleInputChange} placeholder="e.g. Maharashtra" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">District</label>
                          <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input type="text" required name="district" value={formData.district} onChange={handleInputChange} placeholder="e.g. Mumbai" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Sponsor Info */}
                  {step === 2 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl mb-2 flex gap-3">
                        <User className="text-blue-500 shrink-0 h-5 w-5" />
                        <div>
                          <p className="text-sm font-semibold text-blue-900">Sponsor Details Required</p>
                          <p className="text-xs text-blue-700 mt-1">Please enter the Member ID of your sponsor to join their network.</p>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Sponsor ID</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input type="text" required name="sponsorId" value={formData.sponsorId} onChange={handleInputChange} placeholder="e.g. SK000001" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46] uppercase" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Sponsor Name</label>
                        <input type="text" readOnly value={sponsorName} placeholder="Auto-filled sponsor name" className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg outline-none text-sm text-slate-500 font-medium cursor-not-allowed" />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Placement Direction</label>
                        <select name="placement" value={formData.placement} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]">
                          <option value="left">Left Organization</option>
                          <option value="right">Right Organization</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Security */}
                  {step === 3 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Set Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input type={showPassword ? "text" : "password"} required name="password" value={formData.password} onChange={handleInputChange} placeholder="Minimum 6 characters" className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 focus:outline-none">
                            {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input type={showPassword ? "text" : "password"} required name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Repeat password" className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none text-sm text-[#232F46]" />
                        </div>
                        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                          <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Agreement */}
                  {step === 4 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-0.5">
                            <input type="checkbox" name="agreeTnc" checked={formData.agreeTnc} onChange={handleInputChange} className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded bg-white checked:bg-[#ED8C32] checked:border-[#ED8C32] cursor-pointer transition-colors" />
                            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none">
                              <path d="M3 8L6 11L11 3.5" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                            </svg>
                          </div>
                          <span className="text-sm text-slate-600 group-hover:text-[#232F46] transition-colors leading-relaxed">
                            I agree to the <a href="#" className="text-[#ED8C32] font-semibold hover:underline">Terms & Conditions</a> of Shukrana Kalyan Sangh Foundation.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-0.5">
                            <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleInputChange} className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded bg-white checked:bg-[#ED8C32] checked:border-[#ED8C32] cursor-pointer transition-colors" />
                            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none">
                              <path d="M3 8L6 11L11 3.5" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                            </svg>
                          </div>
                          <span className="text-sm text-slate-600 group-hover:text-[#232F46] transition-colors leading-relaxed">
                            I agree to the <a href="#" className="text-[#ED8C32] font-semibold hover:underline">Privacy Policy</a> and consent to data processing for membership.
                          </span>
                        </label>
                      </div>

                      <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-3 text-orange-800">
                        <FileText className="shrink-0 h-5 w-5 text-orange-500" />
                        <div className="text-xs leading-relaxed">
                          By clicking "Complete Registration", you declare that the information provided is correct to the best of your knowledge.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Navigation Actions */}
                  <div className="flex gap-3 mt-8">
                    {step > 1 && (
                      <button type="button" onClick={prevStep} className="px-6 py-3.5 bg-white border border-slate-200 text-[#232F46] font-bold rounded-lg hover:bg-slate-50 transition-colors text-sm">
                        Back
                      </button>
                    )}
                    <button type="submit" disabled={isSubmitting || (step === 4 && (!formData.agreeTnc || !formData.agreePrivacy))} className="flex-1 py-3.5 bg-[#ED8C32] hover:bg-[#D97A24] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? "Processing..." : step === 4 ? "Complete Registration" : "Next Step"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
