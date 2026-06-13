/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ImpactPrograms from '../components/ImpactPrograms';
import HowWeWork from '../components/HowWeWork';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import VolunteerCTA from '../components/VolunteerCTA';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShieldAlert, CheckCircle2, User, Mail, MapPin, DollarSign, Image as ImageIcon, Send, MessageSquare, Phone } from 'lucide-react';
import { Program } from '../types';

export default function LandingPage() {
  // Modals configurations
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [donateAmount, setDonateAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isDonating, setIsDonating] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);

  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerInterest, setVolunteerInterest] = useState('Education Support');
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);
  const [isRegisteringVolunteer, setIsRegisteringVolunteer] = useState(false);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [activeDetailProgram, setActiveDetailProgram] = useState<Program | null>(null);

  const handleOpenDonateModal = (preselectedProgram?: string) => {
    setSelectedProgram(preselectedProgram || 'Global General Fund');
    setDonateModalOpen(true);
    setDonationSuccess(false);
    setIsDonating(false);
  };

  const handleOpenDetailsModal = (program: Program) => {
    setActiveDetailProgram(program);
    setDetailsModalOpen(true);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail) {
      alert("Please fill out your name and email.");
      return;
    }
    setIsDonating(true);

    const finalAmount = donateAmount === 'custom' ? Number(customAmount) : Number(donateAmount);
    if (!finalAmount || finalAmount <= 0) {
      alert("Please provide a valid donation amount.");
      setIsDonating(false);
      return;
    }

    // Simulate Server Ingress delay
    setTimeout(() => {
      setIsDonating(false);
      setDonationSuccess(true);
      
      // Store in LocalStorage donation records so the dashboard gets updated!
      const existingDonations = JSON.parse(localStorage.getItem('shukrana_donations') || '[]');
      const newDonation = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        donorName,
        amount: finalAmount,
        program: selectedProgram,
        date: new Date().toISOString().split('T')[0],
        status: 'completed'
      };
      
      localStorage.setItem('shukrana_donations', JSON.stringify([newDonation, ...existingDonations]));

      // Update state in standard tracking variables if any
      const totalLocalDonations = Number(localStorage.getItem('shukrana_total_donated') || '111400');
      localStorage.setItem('shukrana_total_donated', String(totalLocalDonations + finalAmount));
    }, 1800);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerEmail) {
       alert("Please fill your name and email.");
       return;
    }
    setIsRegisteringVolunteer(true);

    setTimeout(() => {
      setIsRegisteringVolunteer(false);
      setVolunteerSuccess(true);

      // Increment local volunteers count
      const currentVolunteers = Number(localStorage.getItem('shukrana_volunteer_count') || '418');
      localStorage.setItem('shukrana_volunteer_count', String(currentVolunteers + 1));
    }, 1500);
  };

  return (
    <div className="bg-brand-gray relative min-h-screen">
      
      {/* 1. Glass Sticky Navbar */}
      <Navbar onOpenDonateModal={() => handleOpenDonateModal()} />

      {/* 2. Hero Section */}
      <Hero onOpenDonateModal={() => handleOpenDonateModal()} />

      {/* 3. Operational blueprint "How we Work" */}
      <HowWeWork />

      {/* 4. Impact Initiative Cards */}
      <ImpactPrograms 
        onOpenDonateModal={(prog) => handleOpenDonateModal(prog)}
        onOpenDetailsModal={(prog) => handleOpenDetailsModal(prog)}
      />

      {/* 5. Photo Gallery Section */}
      <Gallery />

      {/* 6. Testimonials section */}
      <Testimonials />

      {/* 7. Become a Volunteer CTA */}
      <VolunteerCTA 
        onOpenVolunteerModal={() => {
          setVolunteerModalOpen(true);
          setVolunteerSuccess(false);
          setIsRegisteringVolunteer(false);
        }}
        onOpenContactModal={() => {
          const element = document.getElementById('contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 8. Contact Form section */}
      <ContactSection />

      {/* 9. Dark Slate Premium Footer */}
      <Footer onOpenDonateModal={() => handleOpenDonateModal()} />

      {/* ================= MODALS SECTION ================= */}

      {/* A. Donate Now Modal */}
      <AnimatePresence>
        {donateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDonateModalOpen(false)}
              className="absolute inset-0 bg-brand-charcoal/50 backdrop-blur-sm"
            />
            {/* Card Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-brand-gray max-h-[90vh] flex flex-col"
            >
              <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                <button
                  onClick={() => setDonateModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-brand-charcoal hover:bg-brand-gray rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>

                {!donationSuccess ? (
                  <form onSubmit={handleDonateSubmit} className="text-left space-y-6">
                    <div>
                      <h3 className="text-2xl font-extrabold text-brand-charcoal font-display">Make A Donation Contribution</h3>
                      <p className="text-sm text-brand-gray0 mt-1">Sustaining progress across targeted clinical, environmental, and academic sectors.</p>
                    </div>

                    {/* Step 1: Select program */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-brand-gray0 font-mono tracking-wider uppercase">Select Program Allocation</label>
                      <select
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-gray focus:bg-white border border-slate-205 rounded-xl text-brand-charcoal text-sm focus:outline-none"
                      >
                        <option value="Global General Fund">Global General Fund (Most Needed Allocation)</option>
                        <option value="Education Support Program">Education Support Program</option>
                        <option value="Healthcare Initiative">Healthcare Initiative</option>
                        <option value="Women Empowerment Guild">Women Empowerment Guild</option>
                      </select>
                    </div>

                    {/* Step 2: Choose Amount */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-brand-gray0 font-mono tracking-wider uppercase">Donation Amount ($)</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['25', '50', '100', '250'].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setDonateAmount(amt);
                              setCustomAmount('');
                            }}
                            className={`py-3 font-mono font-bold text-sm border rounded-xl transition-all cursor-pointer ${
                              donateAmount === amt 
                                ? 'bg-brand-primary text-brand-charcoal border-brand-primary shadow-brand' 
                                : 'bg-brand-gray hover:bg-brand-gray text-brand-charcoal/90 border-brand-gray/80'
                            }`}
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setDonateAmount('custom')}
                          className={`w-full py-3.5 font-sans font-semibold text-xs border rounded-xl transition-all cursor-pointer text-center mb-3 ${
                            donateAmount === 'custom' 
                              ? 'bg-[#FFF8F2] text-brand-primary border-brand-primary' 
                              : 'bg-brand-gray hover:bg-brand-gray text-brand-charcoal/80 border-slate-250/60'
                          }`}
                        >
                          Custom Contribution Amount
                        </button>
                        
                        {donateAmount === 'custom' && (
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-brand-charcoal/60">$</span>
                            <input
                              type="number"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              placeholder="Enter customized dollar contribution..."
                              className="w-full pl-8 pr-4 py-3 bg-brand-gray border border-brand-gray/80 rounded-xl text-brand-charcoal text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 3: Donor Identifiers */}
                    <div className="space-y-4">
                      <label className="block text-xs font-bold text-brand-gray0 font-mono tracking-wider uppercase">Donor Particulars</label>
                      <div className="space-y-3">
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
                          <input
                            type="text"
                            required
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Your Full Name"
                            className="w-full pl-10 pr-4 py-3 bg-brand-gray border border-brand-gray/80 rounded-xl text-brand-charcoal text-sm focus:outline-none"
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-455" />
                          <input
                            type="email"
                            required
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="Your Personal Email Address"
                            className="w-full pl-10 pr-4 py-3 bg-brand-gray border border-brand-gray/80 rounded-xl text-brand-charcoal text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isDonating}
                        className="w-full py-4 bg-brand-primary hover:bg-brand-primary-hover disabled:bg-brand-primary text-brand-charcoal font-bold rounded-2xl shadow-brand-lg shadow-brand flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                      >
                        {isDonating ? (
                          <span>Processing Secure Payment Gateway...</span>
                        ) : (
                          <>
                            <Heart className="h-4.5 w-4.5 fill-brand-charcoal stroke-none" />
                            <span>Authorize Secure Donation of ${donateAmount === 'custom' ? customAmount : donateAmount}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 justify-center text-[10px] sm:text-xs text-brand-charcoal/60 font-mono py-1.5 border-t border-brand-gray">
                      <ShieldAlert className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                      <span>Secured with SSL 256-bit bank integrity standards. Tax receipts dispatched automatically.</span>
                    </div>

                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border border-emerald-100 shadow-inner">
                      <CheckCircle2 className="h-10 w-10 stroke-[2.2]" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-extrabold text-slate-955 font-display">Heartfelt Appreciation!</h4>
                      <p className="text-brand-gray0 text-base">
                        Your transaction of <strong className="text-brand-charcoal font-extrabold">${donateAmount === 'custom' ? customAmount : donateAmount}</strong> has cleared successfully.
                      </p>
                      <p className="text-brand-gray0 text-sm mt-2 max-w-sm mx-auto">
                        A certified 80G tax receipt which gives tax exemption compliance has been sent to <strong className="text-brand-charcoal/90 font-semibold">{donorEmail}</strong> immediately.
                      </p>
                    </div>

                    <div className="bg-brand-gray p-4 rounded-2xl border border-brand-gray text-left text-xs space-y-1 max-w-sm mx-auto">
                      <p className="text-slate-450"><span className="font-mono">Reference ID:</span> {`SHK-${Math.floor(100000 + Math.random() * 900000)}`}</p>
                      <p className="text-slate-450"><span className="font-mono">Allocation:</span> {selectedProgram}</p>
                      <p className="text-slate-450"><span className="font-mono">Timestamp:</span> {new Date().toLocaleString()}</p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setDonateModalOpen(false)}
                        className="px-8 py-3 bg-brand-charcoal hover:bg-brand-charcoal text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
                      >
                        Close View
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* B. Become a Volunteer Modal */}
      <AnimatePresence>
        {volunteerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVolunteerModalOpen(false)}
              className="absolute inset-0 bg-brand-charcoal/50 backdrop-blur-sm"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10 border border-brand-gray"
            >
              <div className="p-6 sm:p-8">
                <button
                  onClick={() => setVolunteerModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-brand-charcoal hover:bg-brand-gray rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>

                {!volunteerSuccess ? (
                  <form onSubmit={handleVolunteerSubmit} className="text-left space-y-5">
                    <div>
                      <h3 className="text-xl font-extrabold text-brand-charcoal font-display">Join As An Active Volunteer</h3>
                      <p className="text-xs text-brand-gray0 mt-1">Enroll your skills to drive targeted rural developmental fronts.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-wider">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={volunteerName}
                        onChange={(e) => setVolunteerName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 bg-brand-gray border border-brand-gray/80 rounded-xl text-brand-charcoal text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-wider">Your Active Email</label>
                      <input
                        type="email"
                        required
                        value={volunteerEmail}
                        onChange={(e) => setVolunteerEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-brand-gray border border-brand-gray/80 rounded-xl text-brand-charcoal text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 flex flex-col">
                      <label className="block text-[10px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-wider mb-1 text-left">Primary Interest Sector</label>
                      <select
                        value={volunteerInterest}
                        onChange={(e) => setVolunteerInterest(e.target.value)}
                        className="w-full px-4 py-2.5 bg-brand-gray border border-brand-gray/80 rounded-xl text-brand-charcoal text-sm focus:outline-none cursor-pointer"
                      >
                        <option value="Education Support">Educational Labs & Tutoring</option>
                        <option value="Healthcare Initiative">Mobile Wellness & Dispensaries</option>
                        <option value="Women Empowerment">Female Artisan Guild Logistics</option>
                        <option value="Operations">Back-office Support & Strategic Growth</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-wider">Expressive Motivations (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Brief notes describing your prior work, skills, or available days..."
                        className="w-full px-4 py-2 bg-brand-gray border border-brand-gray/80 rounded-xl text-brand-charcoal text-xs focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isRegisteringVolunteer}
                      className="w-full py-3.5 bg-brand-charcoal hover:bg-brand-charcoal disabled:bg-brand-charcoal/90 text-white font-bold rounded-xl text-sm transition-all focus:outline-none shadow-brand cursor-pointer"
                    >
                      {isRegisteringVolunteer ? "Registering with core directory..." : "Submit Volunteer Application"}
                    </button>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-5">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold font-display text-brand-charcoal">Application Registered!</h4>
                      <p className="text-xs text-brand-gray0 max-w-xs mx-auto leading-relaxed">
                        Welcome to the guild, <strong className="text-slate-850">{volunteerName}</strong>! Our district operations desk will dispatch introductory files to <strong className="text-slate-750">{volunteerEmail}</strong> shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setVolunteerModalOpen(false)}
                      className="px-6 py-2.5 bg-brand-charcoal hover:bg-brand-charcoal text-white font-semibold text-xs rounded-xl"
                    >
                      Back to site
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* C. Program Details Modal */}
      <AnimatePresence>
        {detailsModalOpen && activeDetailProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailsModalOpen(false)}
              className="absolute inset-0 bg-brand-charcoal/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-brand-gray p-6 sm:p-8 text-left"
            >
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-brand-charcoal hover:bg-brand-gray rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="px-3 py-1 bg-[#FFF8F2] text-brand-primary text-[10px] font-mono font-bold tracking-widest rounded-full border border-brand-primary/40/50">
                    {activeDetailProgram.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-brand-charcoal mt-3 font-display">{activeDetailProgram.title}</h3>
                </div>

                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-brand-gray">
                  <img
                    src={activeDetailProgram.image}
                    alt={activeDetailProgram.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-brand-charcoal font-display text-sm">Strategic Operational Direction</h4>
                  <p className="text-brand-charcoal/80 text-sm leading-relaxed">
                    The {activeDetailProgram.title} is designed to solve real multi-generational hurdles in our focus districts. Backed by corporate CSR alignment partnerships, we distribute school infrastructure nodes, clinical supplies, and local microloans through highly optimized material tracking processes.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 bg-brand-gray rounded-2xl border border-brand-gray text-center">
                  <div>
                    <span className="block text-[9px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-widest">RAISED</span>
                    <span className="text-sm font-extrabold text-brand-charcoal">${activeDetailProgram.raised.toLocaleString()}</span>
                  </div>
                  <div className="border-l border-slate-250/50">
                    <span className="block text-[9px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-widest">GOAL</span>
                    <span className="text-sm font-extrabold text-brand-charcoal">${activeDetailProgram.goal.toLocaleString()}</span>
                  </div>
                  <div className="border-l border-slate-250/50">
                    <span className="block text-[9px] font-mono font-bold text-brand-charcoal/60 uppercase tracking-widest">AUDITED LIST</span>
                    <span className="text-sm font-extrabold text-brand-charcoal">{activeDetailProgram.beneficiaries.toLocaleString()} verified</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    onClick={() => setDetailsModalOpen(false)}
                    className="px-5 py-2.5 border border-brand-gray/80 text-brand-charcoal/90 hover:bg-brand-gray rounded-xl font-semibold text-xs"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setDetailsModalOpen(false);
                      handleOpenDonateModal(activeDetailProgram.title);
                    }}
                    className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-charcoal rounded-xl font-bold text-xs shadow-brand"
                  >
                    Coordinate Funding
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
