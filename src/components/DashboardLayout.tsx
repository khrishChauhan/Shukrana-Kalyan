/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, PlusCircle, Check, Award, X, LogOut, ChevronLeft, ChevronRight, Info
} from 'lucide-react';
import { DonationRecord, ActivityLog } from '../types';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication configuration
  const [adminUser, setAdminUser] = useState<any>(null);

  // Layout presentation controls
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Global "Add Donation" ledger inputs
  const [addDonationOpen, setAddDonationOpen] = useState(false);
  const [newDonor, setNewDonor] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newProgram, setNewProgram] = useState('Education Support');

  // Verify security session on mount and route changes
  useEffect(() => {
    const sessionStr = localStorage.getItem('shukrana_session');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    setAdminUser(JSON.parse(sessionStr));
  }, [navigate]);

  // Handle auto-collapse sidebar on tablet viewports
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize(); // Call on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auth logout routine
  const handleSystemLogout = () => {
    localStorage.removeItem('shukrana_session');
    navigate('/login');
  };

  // Dispatch live donation additions globally inside current local storage sandbox
  const handleAddDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonor || !newAmount) return;

    const amt = Number(newAmount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please specify a valid transaction amount.");
      return;
    }

    // Load existing arrays
    const storedD = localStorage.getItem('shukrana_donations');
    const donations: DonationRecord[] = storedD ? JSON.parse(storedD) : [];

    const storedA = localStorage.getItem('shukrana_activities');
    const timeline: ActivityLog[] = storedA ? JSON.parse(storedA) : [];

    const storedT = localStorage.getItem('shukrana_total_donated');
    const totalDonatedAmount = storedT ? Number(storedT) : 111400;

    // Create record
    const newRecord: DonationRecord = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      donorName: newDonor,
      amount: amt,
      program: newProgram,
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };

    const newLogItem: ActivityLog = {
      id: `act-${Date.now()}`,
      type: 'donation',
      content: `Donation received from ${newDonor} for $${amt.toLocaleString()}`,
      amount: `$${amt}`,
      time: 'Just now',
      status: 'success'
    };

    // Commit to localStorage
    localStorage.setItem('shukrana_donations', JSON.stringify([newRecord, ...donations]));
    localStorage.setItem('shukrana_activities', JSON.stringify([newLogItem, ...timeline]));
    localStorage.setItem('shukrana_total_donated', String(totalDonatedAmount + amt));

    // Dispatch global event for the main DashboardPage of the dynamic updates
    window.dispatchEvent(new Event('shukrana-donation-updated'));

    // Reset fields
    setNewDonor('');
    setNewAmount('');
    setAddDonationOpen(false);
  };

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="h-2 w-20 bg-brand-primary/40 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 w-8 bg-[#FFF8F2]0 rounded-full animate-bounce" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-brand-charcoal/60 uppercase">
            Synchronizing Admin Session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray flex overflow-hidden font-sans select-none text-brand-charcoal">
      
      {/* A. DESKTOP SIDEBAR VIEW (Collapsible, Premium Dark Theme) */}
      <div className="hidden md:block h-screen sticky top-0">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
      </div>

      {/* B. MOBILE DRAWER SIDEBAR SHELL */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 bg-brand-charcoal/45 backdrop-blur-xs"
            />
            
            {/* Sliding Drawer core */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[280px] h-full flex flex-col z-10"
            >
              {/* Close Button Inside Drawer */}
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute top-4.5 right-4 p-1.5 text-brand-charcoal/60 hover:text-white hover:bg-brand-charcoal rounded-xl"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="h-full">
                <Sidebar 
                  isCollapsed={false} 
                  setIsCollapsed={() => {}} 
                  onCloseMobile={() => setIsMobileSidebarOpen(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* C. RIGHT AREA WRAPPER */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* TOP BAR GUEST HEADER */}
        <header className="sticky top-0 bg-white border-b border-brand-gray/80/80 p-4 shrink-0 flex items-center justify-between z-10 px-6">
          <div className="flex items-center gap-3">
            {/* Mobile Humburger trigger btn */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 text-brand-charcoal/80 hover:bg-brand-gray rounded-xl"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
            <div className="text-left">
              <p className="text-xs text-brand-charcoal/60 font-mono font-bold uppercase tracking-widest leading-none">
                Administrative Core
              </p>
              <h2 className="text-sm sm:text-base font-extrabold text-brand-charcoal mt-1 font-display">
                Welcome Back, Demo User
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Quick action: Record Contribution */}
            <button
              onClick={() => setAddDonationOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-charcoal hover:bg-slate-850 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <PlusCircle className="h-4 w-4 text-brand-primary" />
              <span className="hidden sm:inline">Add Donation</span>
            </button>

            {/* Profile User Identity widget */}
            <div className="flex items-center gap-2 border-l border-brand-gray/80 pl-4">
              <div className="w-8.5 h-8.5 rounded-xl bg-[#FFF8F2]0 text-brand-charcoal flex items-center justify-center font-bold text-xs shadow-brand">
                DU
              </div>
              <div className="hidden lg:block text-left">
                <span className="block text-xs font-bold text-brand-charcoal leading-none">demo</span>
                <span className="block text-[9px] text-brand-charcoal/60 font-mono mt-0.5 uppercase tracking-wider">
                  Registrar
                </span>
              </div>
            </div>
            
            {/* Exit Session link button */}
            <button 
              onClick={handleSystemLogout}
              className="p-1.5 px-2.5 bg-brand-gray hover:bg-brand-gray border border-brand-gray/80 text-brand-charcoal/80 rounded-lg text-xs font-mono font-bold transition-colors"
              title="Close System Session"
            >
              Exit
            </button>
          </div>
        </header>

        {/* CONTAINER OUTLET VIEW */}
        <main className="flex-grow p-5 sm:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* ================= GUEST DONATION ENTRY MODAL ================= */}
      <AnimatePresence>
        {addDonationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddDonationOpen(false)}
              className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl z-10 border border-brand-gray p-6 sm:p-8 text-left"
            >
              <button
                onClick={() => setAddDonationOpen(false)}
                className="absolute top-4 right-4 p-1 text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-gray rounded-lg"
              >
                ✕
              </button>

              <form onSubmit={handleAddDonationSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-brand-charcoal font-display">Record Sandbox Transaction</h3>
                  <p className="text-xs text-slate-550 mt-1">Record a physical sponsorship or digital grant collection directly into Sandbox files.</p>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-widest">Donor Identity</label>
                  <input
                    type="text"
                    required
                    value={newDonor}
                    onChange={(e) => setNewDonor(e.target.value)}
                    placeholder="Full Name (e.g. Priyanth Sen)"
                    className="w-full px-4 py-2.5 bg-brand-gray border border-brand-gray/80 rounded-xl text-brand-charcoal text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-widest">Dollar Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="Contribution amount ($)"
                    className="w-full px-4 py-2.5 bg-brand-gray border border-brand-gray/80 rounded-xl text-brand-charcoal text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div className="space-y-1 flex flex-col">
                  <label className="block text-[10px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-widest mb-1 text-left">Allotted Segment</label>
                  <select
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-gray border border-brand-gray/80 rounded-xl text-slate-850 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="Education Support">Education Support Program</option>
                    <option value="Healthcare Initiative">Healthcare Initiative</option>
                    <option value="Women Empowerment Guild">Women Empowerment Guild</option>
                    <option value="Global General Fund">Global General Fund</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-charcoal hover:bg-brand-charcoal text-white font-bold rounded-xl text-xs transition-all shadow-brand flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Check className="h-4 w-4" />
                    <span>Authorize & Log Transaction</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
