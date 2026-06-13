/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, ShieldCheck, Eye, EyeOff, Award, ArrowLeft, Terminal } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Guard: if already logged in, skip to dashboard
  useEffect(() => {
    const session = localStorage.getItem('shukrana_session');
    if (session) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please specify both valid credential parameters.');
      return;
    }

    setIsSubmitting(true);

    // Simulate safe server-side delay to reflect modern premium app validation
    setTimeout(() => {
      if (username.trim() === 'demo' && password === '123') {
        // Safe authenticated match
        localStorage.setItem('shukrana_session', JSON.stringify({
          authenticated: true,
          role: 'Administrator',
          username: 'demo',
          time: new Date().toISOString(),
        }));
        setIsSubmitting(false);
        navigate('/dashboard');
      } else {
        setIsSubmitting(false);
        setErrorMsg('Invalid username or password. Use demo / 123');
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-brand-gray overflow-hidden">
      
      {/* Visual background adornments */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-[#FFF8F2]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating security badge */}
      <div className="absolute top-8 left-8">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-brand-gray border border-slate-205 text-slate-705 text-xs font-semibold rounded-xl shadow-brand transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Exit to Website</span>
        </Link>
      </div>

      <div className="max-w-md w-full px-4 relative z-10 select-none">
        
        {/* Top Header Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="p-3 bg-brand-primary rounded-2xl text-white shadow-brand-lg shadow-brand mb-4 inline-flex items-center justify-center">
            <Award className="h-8 w-8 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-charcoal tracking-tight font-display uppercase leading-none">
            Shukrana Kalyan Sangh
          </h1>
          <p className="text-[10px] text-brand-charcoal/60 font-mono font-bold uppercase tracking-widest mt-1.5">
            Registry Administration Panel
          </p>
        </div>

        {/* Card Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 sm:p-10 rounded-3xl border border-brand-gray shadow-brand-lg shadow-brand-gray/80/50 text-left"
        >
          <h2 className="text-xl font-bold text-brand-charcoal mb-2 font-display">Welcome Back Desk</h2>
          <p className="text-xs text-brand-gray0 mb-6">Authorize below to monitor financial ledgers, volunteer applications, and village statistics.</p>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-widest">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-charcoal/60" />
                <input
                  type="text"
                  required
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  className="w-full pl-10 pr-4 py-3 bg-brand-gray focus:bg-white border border-slate-205 rounded-xl text-brand-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-widest">Password</label>
                <span className="text-[10px] text-brand-charcoal/60 font-medium">Use 123 to authorize</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-charcoal/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-brand-gray focus:bg-white border border-slate-205 rounded-xl text-brand-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-charcoal/60 hover:text-brand-charcoal/80 rounded-lg"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error alerts */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, textBaseline: 'middle', height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-red-50 text-red-700 border border-red-100 rounded-xl text-xs font-semibold leading-relaxed flex items-center gap-2 overflow-hidden"
                >
                  <span className="shrink-0">⚠️</span>
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Credentials helper card */}
            <div className="p-3.5 bg-brand-gray border border-brand-gray rounded-2xl text-left">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-widest mb-1.5">
                <Terminal className="h-3.5 w-3.5 text-brand-charcoal/60" />
                <span>Default Credentials</span>
              </span>
              <div className="text-xs text-brand-charcoal/80 space-y-0.5">
                <p>Username: <strong className="text-brand-charcoal font-semibold font-mono">demo</strong></p>
                <p>Password: <strong className="text-brand-charcoal font-semibold font-mono">123</strong></p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-primary hover:bg-brand-primary-hover text-brand-charcoal rounded-2xl font-bold shadow-brand-lg shadow-brand hover:shadow-brand active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <ShieldCheck className="h-4.5 w-4.5 text-brand-charcoal" />
              <span>{isSubmitting ? "Authorizing Secure Core..." : "Sign In to Dashboard"}</span>
            </button>

          </form>
        </motion.div>
        
        {/* Footer info */}
        <p className="text-center text-[11px] text-brand-charcoal/60 mt-8 font-mono">
          Authorized personnel only. Activities are audited under section compliance.
        </p>
      </div>

    </div>
  );
}
