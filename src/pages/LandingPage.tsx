/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ImpactPrograms from '../components/ImpactPrograms';
import HowWeWork from '../components/HowWeWork';
import LeadershipTeam from '../components/LeadershipTeam';
import VolunteerCTA from '../components/VolunteerCTA';
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

  // Gallery view configurations
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('all');
  const galleryItems = [
    { id: 1, title: 'Primary English Schooling', category: 'education', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600' },
    { id: 2, title: 'Critical Medicine Relief', category: 'healthcare', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600' },
    { id: 3, title: 'Sewing Machinery Guild', category: 'women', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' },
    { id: 4, title: 'Child Vaccination Camp', category: 'healthcare', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600' },
    { id: 5, title: 'Rural Community Library', category: 'education', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600' },
    { id: 6, title: 'Handloom Training Center', category: 'women', url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600' },
  ];

  // Contact Form state info
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactResultMsg, setContactResultMsg] = useState('');
  const [isSendingContact, setIsSendingContact] = useState(false);

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      setContactResultMsg("Please fill out all the fields.");
      return;
    }
    setIsSendingContact(true);
    setContactResultMsg("");

    setTimeout(() => {
      setIsSendingContact(false);
      setContactResultMsg("Thank you! Your message has been sent successfully. Our executive will reach back shortly.");
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 1200);
  };

  const filteredGallery = activeGalleryFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeGalleryFilter);

  return (
    <div className="bg-slate-50 relative min-h-screen">
      
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
      <section id="gallery" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">FIELD PHOTOGRAPHY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4 font-display">
              Transparency in Action
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A real-world view into our project sites, distribution lines, and development progress.
            </p>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {['all', 'education', 'healthcare', 'women'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveGalleryFilter(category)}
                  className={`px-4 py-2 font-semibold text-xs border rounded-xl capitalize tracking-wider transition-all cursor-pointer ${
                    activeGalleryFilter === category 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of photos */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  key={item.id}
                  className="group relative h-64 bg-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 text-left">
                    <div>
                      <span className="px-2 py-0.5 bg-brand-gold text-[10px] font-mono font-bold text-slate-950 uppercase tracking-widest rounded-full">
                        {item.category}
                      </span>
                      <h4 className="text-white font-bold font-display text-sm mt-2">{item.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 6. Board / Leadership section */}
      <LeadershipTeam />

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
      <section id="contact" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Info details left (4 columns) */}
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">WE WOULD LOVE TO HEAR FROM YOU</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-2 mb-6 font-display">
                Get In Touch With Our Registry
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Have inquiries about tax exemption certificates, private endowments, CSR alignments, or media reporting? Reach out directly using our official details below or leave an authenticated message.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-2xl">
                  <div className="p-3 bg-amber-50 text-brand-gold rounded-xl">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-display text-sm">Registries Location</h4>
                    <p className="text-slate-500 text-xs mt-1">Plot No 42, Kalyan Marg, Institutional Area, Sector 5, New Delhi 110001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-2xl">
                  <div className="p-3 bg-amber-50 text-brand-gold rounded-xl">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-display text-sm">Corporate Hotlines</h4>
                    <p className="text-slate-500 text-xs mt-1">+91 11 4567 8901 / +91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-2xl">
                  <div className="p-3 bg-amber-50 text-brand-gold rounded-xl">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-display text-sm">Primary Email Support</h4>
                    <p className="text-slate-500 text-xs mt-1">info@shukranafoundation.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Right (7 columns) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-left">
                <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Send A Secured Message</h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 font-mono tracking-wider mb-2 uppercase">Full Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 font-mono tracking-wider mb-2 uppercase">Email Address</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 font-mono tracking-wider mb-2 uppercase">Your Message</label>
                    <textarea
                      rows={5}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Specify your inquiry details, NGO coordinate partnerships, or receipt updates..."
                      className="w-full px-4 py-3 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    />
                  </div>

                  {contactResultMsg && (
                    <div className="p-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-xs font-medium leading-relaxed">
                      {contactResultMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSendingContact}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  >
                    <span>{isSendingContact ? "Sending..." : "Submit Message"}</span>
                    <Send className="h-4 w-4 text-slate-350" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

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
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            />
            {/* Card Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-100 max-h-[90vh] flex flex-col"
            >
              <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                <button
                  onClick={() => setDonateModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>

                {!donationSuccess ? (
                  <form onSubmit={handleDonateSubmit} className="text-left space-y-6">
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-950 font-display">Make A Donation Contribution</h3>
                      <p className="text-sm text-slate-500 mt-1">Sustaining progress across targeted clinical, environmental, and academic sectors.</p>
                    </div>

                    {/* Step 1: Select program */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-500 font-mono tracking-wider uppercase">Select Program Allocation</label>
                      <select
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 focus:bg-white border border-slate-205 rounded-xl text-slate-800 text-sm focus:outline-none"
                      >
                        <option value="Global General Fund">Global General Fund (Most Needed Allocation)</option>
                        <option value="Education Support Program">Education Support Program</option>
                        <option value="Healthcare Initiative">Healthcare Initiative</option>
                        <option value="Women Empowerment Guild">Women Empowerment Guild</option>
                      </select>
                    </div>

                    {/* Step 2: Choose Amount */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-500 font-mono tracking-wider uppercase">Donation Amount ($)</label>
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
                                ? 'bg-brand-gold text-slate-950 border-brand-gold shadow-sm' 
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
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
                              ? 'bg-amber-50 text-brand-gold border-amber-300' 
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-250/60'
                          }`}
                        >
                          Custom Contribution Amount
                        </button>
                        
                        {donateAmount === 'custom' && (
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">$</span>
                            <input
                              type="number"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              placeholder="Enter customized dollar contribution..."
                              className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 3: Donor Identifiers */}
                    <div className="space-y-4">
                      <label className="block text-xs font-bold text-slate-500 font-mono tracking-wider uppercase">Donor Particulars</label>
                      <div className="space-y-3">
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
                          <input
                            type="text"
                            required
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Your Full Name"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none"
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
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isDonating}
                        className="w-full py-4 bg-brand-gold hover:bg-brand-gold-hover disabled:bg-amber-300 text-slate-950 font-bold rounded-2xl shadow-xl shadow-amber-400/10 flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                      >
                        {isDonating ? (
                          <span>Processing Secure Payment Gateway...</span>
                        ) : (
                          <>
                            <Heart className="h-4.5 w-4.5 fill-slate-950 stroke-none" />
                            <span>Authorize Secure Donation of ${donateAmount === 'custom' ? customAmount : donateAmount}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 justify-center text-[10px] sm:text-xs text-slate-400 font-mono py-1.5 border-t border-slate-50">
                      <ShieldAlert className="h-3.5 w-3.5 text-brand-gold shrink-0" />
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
                      <p className="text-slate-500 text-base">
                        Your transaction of <strong className="text-slate-800 font-extrabold">${donateAmount === 'custom' ? customAmount : donateAmount}</strong> has cleared successfully.
                      </p>
                      <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
                        A certified 80G tax receipt which gives tax exemption compliance has been sent to <strong className="text-slate-700 font-semibold">{donorEmail}</strong> immediately.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left text-xs space-y-1 max-w-sm mx-auto">
                      <p className="text-slate-450"><span className="font-mono">Reference ID:</span> {`SHK-${Math.floor(100000 + Math.random() * 900000)}`}</p>
                      <p className="text-slate-450"><span className="font-mono">Allocation:</span> {selectedProgram}</p>
                      <p className="text-slate-450"><span className="font-mono">Timestamp:</span> {new Date().toLocaleString()}</p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setDonateModalOpen(false)}
                        className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
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
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-100"
            >
              <div className="p-6 sm:p-8">
                <button
                  onClick={() => setVolunteerModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>

                {!volunteerSuccess ? (
                  <form onSubmit={handleVolunteerSubmit} className="text-left space-y-5">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-950 font-display">Join As An Active Volunteer</h3>
                      <p className="text-xs text-slate-500 mt-1">Enroll your skills to drive targeted rural developmental fronts.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={volunteerName}
                        onChange={(e) => setVolunteerName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Your Active Email</label>
                      <input
                        type="email"
                        required
                        value={volunteerEmail}
                        onChange={(e) => setVolunteerEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 flex flex-col">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1 text-left">Primary Interest Sector</label>
                      <select
                        value={volunteerInterest}
                        onChange={(e) => setVolunteerInterest(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none cursor-pointer"
                      >
                        <option value="Education Support">Educational Labs & Tutoring</option>
                        <option value="Healthcare Initiative">Mobile Wellness & Dispensaries</option>
                        <option value="Women Empowerment">Female Artisan Guild Logistics</option>
                        <option value="Operations">Back-office Support & Strategic Growth</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Expressive Motivations (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Brief notes describing your prior work, skills, or available days..."
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isRegisteringVolunteer}
                      className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-bold rounded-xl text-sm transition-all focus:outline-none shadow-sm cursor-pointer"
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
                      <h4 className="text-xl font-bold font-display text-slate-900">Application Registered!</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                        Welcome to the guild, <strong className="text-slate-850">{volunteerName}</strong>! Our district operations desk will dispatch introductory files to <strong className="text-slate-750">{volunteerEmail}</strong> shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setVolunteerModalOpen(false)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl"
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
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-100 p-6 sm:p-8 text-left"
            >
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="px-3 py-1 bg-amber-50 text-brand-gold text-[10px] font-mono font-bold tracking-widest rounded-full border border-amber-200/50">
                    {activeDetailProgram.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-950 mt-3 font-display">{activeDetailProgram.title}</h3>
                </div>

                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={activeDetailProgram.image}
                    alt={activeDetailProgram.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 font-display text-sm">Strategic Operational Direction</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    The {activeDetailProgram.title} is designed to solve real multi-generational hurdles in our focus districts. Backed by corporate CSR alignment partnerships, we distribute school infrastructure nodes, clinical supplies, and local microloans through highly optimized material tracking processes.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div>
                    <span className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">RAISED</span>
                    <span className="text-sm font-extrabold text-slate-800">${activeDetailProgram.raised.toLocaleString()}</span>
                  </div>
                  <div className="border-l border-slate-250/50">
                    <span className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">GOAL</span>
                    <span className="text-sm font-extrabold text-slate-800">${activeDetailProgram.goal.toLocaleString()}</span>
                  </div>
                  <div className="border-l border-slate-250/50">
                    <span className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">AUDITED LIST</span>
                    <span className="text-sm font-extrabold text-slate-800">{activeDetailProgram.beneficiaries.toLocaleString()} verified</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    onClick={() => setDetailsModalOpen(false)}
                    className="px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold text-xs"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setDetailsModalOpen(false);
                      handleOpenDonateModal(activeDetailProgram.title);
                    }}
                    className="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 rounded-xl font-bold text-xs shadow-md"
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
