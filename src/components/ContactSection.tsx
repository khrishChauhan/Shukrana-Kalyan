import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, MessageSquare, Send, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactResultMsg, setContactResultMsg] = useState('');
  const [isSendingContact, setIsSendingContact] = useState(false);

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

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#FFF8F2] relative overflow-hidden">
      {/* Background Redesign */}
      {/* Base warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F2] via-[#FFF6EF] to-[#FFF8F2]" />
      
      {/* Premium grain texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />

      {/* World-map/network subtle background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.05] pointer-events-none overflow-hidden">
         {/* using a simple subtle dot matrix / map abstraction */}
         <div className="w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(27,39,63,0.4)_1.5px,transparent_1.5px)] bg-[length:24px_24px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_10%,transparent_100%)] transform -rotate-12 scale-110" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Editorial Layout */}
          <div className="lg:col-span-5 text-left pt-2 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#232F46]/5 border border-[#ED8C32]/40 rounded-full text-[11px] font-mono font-bold tracking-[0.2em] text-[#ED8C32] uppercase mb-8 shadow-sm">
                WE WOULD LOVE TO HEAR FROM YOU
              </span>
              
              <h2 className="text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#232F46] tracking-[-0.03em] mt-2 mb-6 font-display leading-[1.05]">
                Get In Touch With <br />
                <span className="text-[#232F46]">
                  Our Registry
                </span>
              </h2>
              
              <p className="text-[#232F46]/70 text-[16px] sm:text-[18px] leading-[1.7] mb-12 font-medium max-w-md">
                Have inquiries about tax exemption certificates, private endowments, CSR alignments, or media reporting? Reach out directly using our official details below or leave an authenticated message.
              </p>
            </motion.div>

            {/* Premium Contact Cards */}
            <div className="space-y-4">
              {[
                { 
                  icon: MapPin, 
                  title: "Registries Location", 
                  desc: "Plot No 42, Kalyan Marg, Institutional Area, Sector 5, New Delhi 110001",
                  delay: 0.2
                },
                { 
                  icon: Phone, 
                  title: "Corporate Hotlines", 
                  desc: "+91 11 4567 8901 / +91 98765 43210",
                  delay: 0.3
                },
                { 
                  icon: MessageSquare, 
                  title: "Primary Email Support", 
                  desc: "info@shukranafoundation.org",
                  delay: 0.4
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  className="group flex items-start gap-5 p-5 sm:p-6 bg-white hover:bg-[#FFF8F2] border border-[#ED8C32]/40 rounded-[24px] shadow-[0_4px_12px_rgba(27,39,63,0.02)] transition-all duration-400 cursor-default"
                >
                  <div className="relative shrink-0">
                     <div className="relative p-3.5 bg-[#FFF8F2] border border-[#ED8C32]/30 rounded-full text-[#ED8C32] group-hover:bg-[#ED8C32]/10 group-hover:scale-110 transition-all duration-400">
                        <item.icon className="h-5 w-5" />
                     </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-[#232F46] font-display text-[17px] tracking-wide mb-1.5">{item.title}</h4>
                    <p className="text-[#232F46]/70 text-[15px] leading-relaxed transition-colors duration-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Right Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative bg-white p-6 sm:p-10 lg:p-12 rounded-[32px] border border-[#ED8C32]/40 shadow-[0_16px_40px_rgba(27,39,63,0.06)] text-left">
              <h3 className="text-[24px] font-bold text-[#232F46] mb-8 font-display tracking-wide flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#232F46]" />
                Send A Secured Message
              </h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="block text-[12px] font-semibold text-[#232F46]/60 font-mono tracking-widest mb-3 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-5 py-4 bg-[#FFF8F2] hover:bg-[#FFF6EF] border border-[#232F46]/10 focus:bg-white focus:border-[#ED8C32] rounded-[20px] text-[#232F46] text-[16px] focus:outline-none transition-all placeholder:text-[#232F46]/30"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <label className="block text-[12px] font-semibold text-[#232F46]/60 font-mono tracking-widest mb-3 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-5 py-4 bg-[#FFF8F2] hover:bg-[#FFF6EF] border border-[#232F46]/10 focus:bg-white focus:border-[#ED8C32] rounded-[20px] text-[#232F46] text-[16px] focus:outline-none transition-all placeholder:text-[#232F46]/30"
                    />
                  </div>
                </div>

                {/* Textarea */}
                <div className="relative">
                  <label className="block text-[12px] font-semibold text-[#232F46]/60 font-mono tracking-widest mb-3 uppercase">Your Message</label>
                  <textarea
                    rows={6}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Specify your inquiry details, NGO coordinate partnerships, or receipt updates..."
                    className="w-full px-5 py-5 bg-[#FFF8F2] hover:bg-[#FFF6EF] border border-[#232F46]/10 focus:bg-white focus:border-[#ED8C32] rounded-[20px] text-[#232F46] text-[16px] focus:outline-none transition-all placeholder:text-[#232F46]/30 resize-none leading-relaxed"
                  />
                </div>

                <AnimatePresence>
                  {contactResultMsg && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 bg-[#ED8C32]/10 border border-[#ED8C32]/30 rounded-[20px] flex items-start gap-3 mt-4">
                        <CheckCircle2 className="h-5 w-5 text-[#ED8C32] shrink-0 mt-0.5" />
                        <p className="text-[15px] text-[#232F46]/90 font-medium leading-relaxed">
                          {contactResultMsg}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4 flex flex-col items-start gap-8">
                  <button
                    type="submit"
                    disabled={isSendingContact}
                    className="group relative w-full overflow-hidden px-8 py-5 bg-[#ED8C32] hover:bg-[#ED8C32] text-[#232F46] rounded-[20px] font-bold text-[16px] tracking-wide flex items-center justify-center gap-3 shadow-[0_4px_12px_rgba(35,47,70,0.15)] transform hover:-translate-y-1 transition-all duration-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                     <span className="relative z-10">{isSendingContact ? "Sending..." : "Submit Message"}</span>
                     {!isSendingContact && (
                        <Send className="relative z-10 h-5 w-5 text-[#232F46] transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-400" />
                     )}
                  </button>

                  {/* Trust Elements under form */}
                  <div className="flex flex-wrap items-center justify-center w-full gap-x-5 gap-y-3 pt-6 border-t border-[#232F46]/5">
                     <div className="flex items-center gap-2 text-[#232F46]/70 bg-[#232F46]/5 px-3 py-1.5 rounded-full">
                        <ShieldCheck className="h-4 w-4 text-[#ED8C32]" />
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#232F46]/70">Secure Communication</span>
                     </div>
                     <div className="flex items-center gap-2 text-[#232F46]/70 bg-[#232F46]/5 px-3 py-1.5 rounded-full">
                        <Clock className="h-4 w-4 text-[#ED8C32]" />
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#232F46]/70">24h Response</span>
                     </div>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Added Bottom Trust Badge */}
            <div className="absolute -bottom-6 right-6 lg:right-12 bg-white border border-[#ED8C32]/40 px-5 py-2.5 rounded-full shadow-[0_8px_24px_rgba(27,39,63,0.08)] flex items-center gap-2.5 transform translate-y-1/2 z-20">
                <CheckCircle2 className="w-4 h-4 text-[#232F46]" />
                <span className="text-[11px] font-mono font-bold text-[#232F46] uppercase tracking-widest">Verified NGO Registry</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
