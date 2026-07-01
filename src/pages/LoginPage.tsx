/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Award, ArrowLeft, HeartHandshake, Users, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Guard: if already logged in, skip to dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both Member ID and Password.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Member ID login: pseudo-email is [member_id]@sks.org (uppercase)
      const pseudoEmail = `${username.trim().toUpperCase()}@sks.org`;
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: pseudoEmail,
        password: password
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user returned");

      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('status, member_id, member_profile(full_name)')
        .eq('id', authData.user.id)
        .single();

      if (memberError) throw memberError;

      if (memberData.status === 'PENDING') {
        navigate('/payment-submission');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      // Supabase auth errors can have message on .message, .error_description, or as JSON string
      const msg = error?.message || error?.error_description || error?.msg
        || (typeof error === 'string' ? error : null)
        || 'Login failed. Please check your Member ID and password.';
      setErrorMsg(msg);
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] selection:bg-[#ED8C32] selection:text-white font-sans">
      
      {/* LEFT COLUMN - BRAND & MISSION (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#232F46] text-white p-12 lg:p-16 relative overflow-hidden">
        {/* Simple geometric accent */}
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
            Shukrana <br />Kalyan Sangh
          </h1>
          <p className="text-lg text-white/80 max-w-md mt-4">
            Welcome to the official member portal. Access your welfare dashboard, manage your profile, and connect with our community.
          </p>
        </div>

        <div className="relative z-10 mt-16 space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/10 rounded-lg shrink-0 mt-1">
              <HeartHandshake className="h-6 w-6 text-[#ED8C32]" />
            </div>
            <div>
              <h3 className="font-bold text-white">Welfare Programs</h3>
              <p className="text-sm text-white/70 mt-1">Access financial assistance and support.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/10 rounded-lg shrink-0 mt-1">
              <Users className="h-6 w-6 text-[#ED8C32]" />
            </div>
            <div>
              <h3 className="font-bold text-white">Community Network</h3>
              <p className="text-sm text-white/70 mt-1">Join a network of dedicated members.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/10 rounded-lg shrink-0 mt-1">
              <ShieldCheck className="h-6 w-6 text-[#ED8C32]" />
            </div>
            <div>
              <h3 className="font-bold text-white">Secure Platform</h3>
              <p className="text-sm text-white/70 mt-1">Your data is protected with NGO transparency.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-white/50 mt-12">
          &copy; {new Date().getFullYear()} Shukrana Kalyan Sangh Foundation.
        </div>
      </div>

      {/* RIGHT COLUMN - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          
          {/* Mobile Back Button & Logo (Visible only on mobile) */}
          <div className="lg:hidden mb-8 flex flex-col items-center">
            <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#232F46] text-xs font-semibold rounded-lg shadow-sm border border-slate-200 mb-6 self-start">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <div className="p-3 bg-[#ED8C32] rounded-xl text-white inline-flex items-center justify-center mb-4 shadow-sm">
              <Award className="h-8 w-8 stroke-[2]" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#232F46] tracking-tight uppercase text-center">
              Member Portal
            </h1>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#232F46] mb-2">Member Login</h2>
              <p className="text-sm text-slate-500">Please enter your credentials to continue.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Member ID</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. SK000001"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 focus:bg-white border border-slate-200 rounded-lg text-[#232F46] text-sm focus:outline-none focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] transition-colors uppercase"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-10 py-3 bg-slate-50 focus:bg-white border border-slate-200 rounded-lg text-[#232F46] text-sm focus:outline-none focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 border border-slate-300 rounded bg-white checked:bg-[#ED8C32] checked:border-[#ED8C32] cursor-pointer transition-colors" />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                    </svg>
                  </div>
                  <span className="text-slate-600 group-hover:text-[#232F46] transition-colors">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-[#ED8C32] hover:text-[#D97A24] font-semibold transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* Error alerts */}
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm flex items-center gap-2">
                  <span className="shrink-0">⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#ED8C32] hover:bg-[#D97A24] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                >
                  {isSubmitting ? "Authenticating..." : "Login to Dashboard"}
                </button>
                
                <Link 
                  to="/register"
                  className="w-full py-3.5 bg-slate-50 hover:bg-slate-100 text-[#232F46] border border-slate-200 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm text-center"
                >
                  Register New Account
                </Link>
              </div>
            </form>
          </div>

          {/* Help Link */}
          <div className="mt-8 text-center">
            <a href="#" className="text-sm text-slate-500 hover:text-[#232F46] transition-colors">
              Need Help? Contact Support
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
