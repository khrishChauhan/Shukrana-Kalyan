/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Award, ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Bell, Eye, EyeOff, User, MapPin, Mail, Phone, Lock, FileText, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Input } from '../components/ui/Input';

import { Button } from '../components/ui/Button';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorMemberId, setSponsorMemberId] = useState('');
  const [sponsorPreview, setSponsorPreview] = useState<{ leftCount: number; rightCount: number } | null>(null);
  const [sponsorLookupStatus, setSponsorLookupStatus] = useState<'idle' | 'loading' | 'found' | 'not_found'>('idle');
  const [generatedMemberId, setGeneratedMemberId] = useState('');
  const [isGenesisMode, setIsGenesisMode] = useState(false);

  // Check if system is empty (Genesis Mode) on mount
  React.useEffect(() => {
    async function checkGenesis() {
      const { count, error } = await supabase.from('members').select('*', { count: 'exact', head: true });
      if (!error && count === 0) {
        setIsGenesisMode(true);
        setFormData(prev => ({ ...prev, sponsorId: 'GENESIS' }));
      }
    }
    checkGenesis();
  }, []);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    state: '',
    city: '',
    sponsorId: '',
    placement: 'left',
    password: '',
    confirmPassword: '',
    agreeTnc: false,
    agreePrivacy: false,
  });

  const navigate = useNavigate();

  // Real-time sponsor ID lookup with team preview
  const lookupSponsor = useCallback(async (sponsorId: string) => {
    if (!sponsorId.trim()) {
      setSponsorName('');
      setSponsorMemberId('');
      setSponsorPreview(null);
      setSponsorLookupStatus('idle');
      return;
    }
    setSponsorLookupStatus('loading');
    setSponsorPreview(null);

    const { data, error } = await supabase
      .from('members')
      .select('id, member_id, member_profile(full_name)')
      .eq('member_id', sponsorId.trim().toUpperCase())
      .single();

    if (error || !data) {
      setSponsorLookupStatus('not_found');
      setSponsorName('');
      setSponsorMemberId('');
    } else {
      const profile = Array.isArray(data.member_profile) ? data.member_profile[0] : data.member_profile;
      setSponsorLookupStatus('found');
      setSponsorName(profile?.full_name || 'Verified Member');
      setSponsorMemberId(data.member_id);

      // Count left and right team members under this sponsor (BFS-visible count)
      const { count: leftCount } = await supabase
        .from('member_business')
        .select('*', { count: 'exact', head: true })
        .eq('sponsor_member_uuid', data.id)  // direct children count as proxy
        .eq('requested_placement_side', 'left');

      const { count: rightCount } = await supabase
        .from('member_business')
        .select('*', { count: 'exact', head: true })
        .eq('sponsor_member_uuid', data.id)
        .eq('requested_placement_side', 'right');

      setSponsorPreview({
        leftCount: leftCount ?? 0,
        rightCount: rightCount ?? 0,
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Trigger real-time sponsor lookup
    if (name === 'sponsorId') {
      lookupSponsor(value);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      if (step === 2) {
        // Bypass for Genesis Node creation
        if (formData.sponsorId.trim().toUpperCase() === 'GENESIS') {
          nextStep();
          return;
        }

        // Validate sponsor ID is provided and verified
        if (!formData.sponsorId.trim()) {
          alert('Sponsor ID is mandatory. Please enter your Sponsor Member ID.');
          return;
        }
        if (sponsorLookupStatus === 'not_found') {
          alert('Invalid Sponsor ID. Please check and try again.');
          return;
        }
        if (sponsorLookupStatus === 'loading') {
          alert('Please wait while we verify the Sponsor ID.');
          return;
        }
      }
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

    try {
      // Pseudo-email uses mobile number for now; will be updated to member_id after insert
      const pseudoEmail = `${formData.mobileNumber}@sks.org`;
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: pseudoEmail,
        password: formData.password,
      });

      if (authError) throw authError;
      
      if (authData.user) {
        const userId = authData.user.id;

        // 1. Insert Member (Trigger will generate member_id)
        const { error: memberError } = await supabase.from('members').insert({
          id: userId,
          status: 'PENDING'
        });
        if (memberError) throw memberError;

        // 2. Fetch the generated member_id
        const { data: newMember } = await supabase.from('members').select('member_id').eq('id', userId).single();
        const memberId = newMember?.member_id || 'UNKNOWN';

        // 2b. Update the auth user email from mobile@sks.org → memberId@sks.org
        // This ensures the user can log in with their Member ID going forward.
        await supabase.rpc('update_auth_email_to_member_id', {
          p_user_id: userId,
          p_member_id: memberId
        });

        // 3. Insert Profile
        const { error: profileError } = await supabase.from('member_profile').insert({
          id: userId,
          full_name: formData.fullName,
          phone_number: formData.mobileNumber,
          email: formData.email || null,
          city: formData.city,
          state: formData.state
        });
        if (profileError) throw profileError;

        // 4. Fetch Sponsor UUID if provided (skip for GENESIS bypass)
        let sponsorUuid: string | null = null;
        if (formData.sponsorId.trim() !== '' && formData.sponsorId.trim().toUpperCase() !== 'GENESIS') {
          const { data: sponsorData } = await supabase
            .from('members')
            .select('id')
            .eq('member_id', formData.sponsorId.trim().toUpperCase())
            .single();
          sponsorUuid = sponsorData?.id ?? null;
        }

        // 5. Insert Business record
        // NOTE (Phase 3.2): We no longer write placement_parent_uuid or placement_side here.
        // The activate_member() RPC will resolve the final placement via BFS when an admin approves.
        // We only store sponsor_member_uuid and requested_placement_side as the user's preference.
        const { error: bizError } = await supabase.from('member_business').insert({
          id: userId,
          sponsor_member_uuid:       sponsorUuid,
          placement_parent_uuid:     null,                                    // resolved by activate_member()
          placement_side:            null,                                    // resolved by activate_member()
          requested_placement_side:  sponsorUuid ? formData.placement : null  // user's preference
        });
        if (bizError) throw bizError;

        // 6. Insert KYC (Empty placeholder)
        await supabase.from('member_kyc').insert({ id: userId });

        // 7. Auto-Submit Dummy Payment (Bypass for quick testing)
        // Fetches joining_amount from system_settings, defaults to 2100
        const { data: configData } = await supabase.from('system_settings').select('value').eq('key', 'joining_amount').single();
        const joiningAmount = configData?.value ? Number(configData.value) : 2100;
        
        await supabase.from('payments').insert({
          member_id: userId,
          amount: joiningAmount,
          utr_number: 'TEST-BYPASS',
          screenshot_url: 'none'
          // status defaults to 'PENDING' based on DB schema
        });

        setGeneratedMemberId(memberId);
        setIsSuccess(true);
      }
    } catch (error: any) {
      alert(error.message || "An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <p className="text-3xl font-mono font-bold text-[#232F46]">{generatedMemberId}</p>
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
                      <Input
                        label="Full Name"
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        leftIcon={<User className="h-5 w-5" />}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Mobile Number"
                          type="tel"
                          required
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          placeholder="10-digit number"
                          leftIcon={<Phone className="h-5 w-5" />}
                        />
                        <Input
                          label="Email (Optional)"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email address"
                          leftIcon={<Mail className="h-5 w-5" />}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="State"
                          required
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="e.g. Maharashtra"
                          leftIcon={<MapPin className="h-5 w-5" />}
                        />
                        <Input
                          label="City"
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Mumbai"
                          leftIcon={<MapPin className="h-5 w-5" />}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Sponsor Info */}
                  {step === 2 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      {isGenesisMode ? (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3">
                          <CheckCircle2 className="text-green-600 shrink-0 h-5 w-5" />
                          <div>
                            <p className="text-sm font-semibold text-green-900">Genesis Node Creation</p>
                            <p className="text-xs text-green-700 mt-1">You are registering the root member of the platform. No sponsor is required.</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Sponsor ID Input */}
                          <div>
                            <Input
                              label="Sponsor ID *"
                              name="sponsorId"
                              required
                              value={formData.sponsorId}
                              onChange={handleInputChange}
                              placeholder="e.g. SK000001"
                              className="uppercase"
                              leftIcon={<User className="h-5 w-5" />}
                            />
                            {sponsorLookupStatus === 'loading' && (
                              <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1.5"><span className="inline-block w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" /> Looking up sponsor...</p>
                            )}
                            {sponsorLookupStatus === 'not_found' && formData.sponsorId && (
                              <p className="mt-1.5 text-xs text-red-600 font-semibold">❌ Sponsor ID not found. Please check and try again.</p>
                            )}
                          </div>

                          {/* Sponsor Preview Card */}
                          {sponsorLookupStatus === 'found' && (
                            <p className="mt-1.5 text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</span> 
                              Sponsor Verified: {sponsorName}
                            </p>
                          )}

                          {/* Team Selection — only shown after sponsor is found */}
                          {sponsorLookupStatus === 'found' && (
                            <div>
                              <p className="text-sm font-bold text-[#232F46] mb-3">Select Your Team *</p>
                              <div className="grid grid-cols-2 gap-3">
                                {(['left', 'right'] as const).map(side => (
                                  <label
                                    key={side}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                      formData.placement === side
                                        ? side === 'left'
                                          ? 'border-[#232F46] bg-[#232F46]/5'
                                          : 'border-[#ED8C32] bg-[#ED8C32]/5'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="placement"
                                      value={side}
                                      checked={formData.placement === side}
                                      onChange={handleInputChange}
                                      className="sr-only"
                                    />
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs ${
                                      side === 'left' ? 'bg-[#232F46]' : 'bg-[#ED8C32]'
                                    }`}>
                                      {side === 'left' ? 'L' : 'R'}
                                    </div>
                                    <span className="text-sm font-bold text-[#232F46]">
                                      {side === 'left' ? 'Left Team' : 'Right Team'}
                                    </span>
                                    <span className="text-[10px] text-slate-500 text-center leading-tight">
                                      BFS auto-assigns you to the first available slot
                                    </span>
                                    {formData.placement === side && (
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                                        side === 'left' ? 'bg-[#232F46]' : 'bg-[#ED8C32]'
                                      }`}>Selected</span>
                                    )}
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* STEP 3: Security */}
                  {step === 3 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <Input
                        label="Set Password"
                        type={showPassword ? "text" : "password"}
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Minimum 6 characters"
                        leftIcon={<Lock className="h-5 w-5" />}
                        rightIcon={
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-1 text-slate-400 hover:text-slate-600 focus:outline-none">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        }
                      />

                      <Input
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        required
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Repeat password"
                        leftIcon={<Lock className="h-5 w-5" />}
                        error={formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword ? "Passwords do not match" : undefined}
                      />
                    </div>
                  )}

                  {/* STEP 4: Agreement & Review */}
                  {step === 4 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                      
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                        <h3 className="font-bold text-[#232F46] text-sm border-b border-slate-200 pb-2 mb-3">Review Your Information</h3>
                        <div className="grid grid-cols-2 gap-y-2 text-xs">
                          <span className="text-slate-500 font-medium">Full Name:</span>
                          <span className="font-bold text-[#232F46]">{formData.fullName}</span>
                          
                          <span className="text-slate-500 font-medium">Mobile Number:</span>
                          <span className="font-bold text-[#232F46]">{formData.mobileNumber}</span>
                          
                          <span className="text-slate-500 font-medium">City, State:</span>
                          <span className="font-bold text-[#232F46]">{formData.city}, {formData.state}</span>
                          
                          <span className="text-slate-500 font-medium">Sponsor ID:</span>
                          <span className="font-bold text-[#232F46]">{formData.sponsorId || 'None'}</span>
                          
                          <span className="text-slate-500 font-medium">Team:</span>
                          <span className="font-bold text-[#232F46]">{formData.sponsorId && formData.sponsorId !== 'GENESIS' ? (formData.placement === 'left' ? 'Left Team' : 'Right Team') : 'N/A (Genesis)'}</span>
                        </div>
                      </div>

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
                      <Button type="button" variant="outline" size="lg" onClick={prevStep}>
                        Back
                      </Button>
                    )}
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      fullWidth 
                      isLoading={isSubmitting} 
                      disabled={isSubmitting || (step === 4 && (!formData.agreeTnc || !formData.agreePrivacy))}
                    >
                      {step === 4 ? "Complete Registration" : "Next Step"}
                    </Button>
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
