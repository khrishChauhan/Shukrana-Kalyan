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
    <section id="contact" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Faint dot treatment, single-color */}
      <div className="absolute inset-0 z-0 bg-dot-pattern opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_50%,#000_10%,transparent_85%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Side: Editorial Layout */}
          <div className="lg:col-span-5 text-left pt-2 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF8F2] border border-[#ED8C32]/25 rounded-full eyebrow text-[#ED8C32] mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
                We Would Love To Hear From You
              </span>

              <h2 className="text-[36px] sm:text-[44px] lg:text-[52px] font-bold text-[#232F46] tracking-[-0.035em] mt-2 mb-6 font-display leading-[1.04]">
                Get In Touch With <br />
                Our Registry
              </h2>

              <p className="text-[#232F46]/60 text-[16px] sm:text-[18px] leading-[1.75] mb-12 font-normal max-w-md">
                Have inquiries about tax exemption certificates, private endowments, CSR alignments, or media reporting? Reach out directly using our official details below or leave an authenticated message.
              </p>
            </motion.div>

            {/* Premium Contact Cards */}
            <div className="space-y-3.5">
              {[
                {
                  icon: MapPin,
                  title: "Registries Location",
                  desc: "Plot No 42, Kalyan Marg, Institutional Area, Sector 5, New Delhi 110001",
                  delay: 0.15
                },
                {
                  icon: Phone,
                  title: "Corporate Hotlines",
                  desc: "+91 11 4567 8901 / +91 98765 43210",
                  delay: 0.25
                },
                {
                  icon: MessageSquare,
                  title: "Primary Email Support",
                  desc: "info@shukranafoundation.org",
                  delay: 0.35
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-start gap-4 p-5 bg-white hover:bg-[#FFF8F2] border border-[#232F46]/[0.08] hover:border-[#ED8C32]/35 rounded-2xl shadow-[0_1px_2px_rgba(35,47,70,0.03)] hover:shadow-[0_8px_24px_rgba(35,47,70,0.06)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default"
                >
                  <div className="relative shrink-0">
                     <div className="relative p-3 bg-[#FFF8F2] border border-[#ED8C32]/25 rounded-xl text-[#ED8C32] group-hover:bg-[#ED8C32] group-hover:text-[#232F46] transition-all duration-400">
                        <item.icon className="h-5 w-5" />
                     </div>
                  </div>
                  <div className="pt-0.5">
                    <h4 className="font-semibold text-[#232F46] font-display text-[16px] tracking-[-0.01em] mb-1.5">{item.title}</h4>
                    <p className="text-[#232F46]/60 text-[14.5px] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative bg-white p-6 sm:p-10 lg:p-12 rounded-[28px] border border-[#232F46]/[0.08] shadow-[0_2px_4px_rgba(35,47,70,0.04),0_18px_48px_rgba(35,47,70,0.07)] text-left">
              <h3 className="text-[23px] font-semibold text-[#232F46] mb-8 font-display tracking-[-0.01em] flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ED8C32]" />
                Send A Secured Message
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="block text-[11px] font-semibold text-[#232F46]/50 tracking-[0.14em] mb-2.5 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-5 py-3.5 bg-[#FFF8F2] border border-[#232F46]/10 focus:bg-white focus:border-[#ED8C32] rounded-2xl text-[#232F46] text-[15px] focus:outline-none focus:ring-4 focus:ring-[#ED8C32]/10 transition-all duration-300 placeholder:text-[#232F46]/30"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <label className="block text-[11px] font-semibold text-[#232F46]/50 tracking-[0.14em] mb-2.5 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-5 py-3.5 bg-[#FFF8F2] border border-[#232F46]/10 focus:bg-white focus:border-[#ED8C32] rounded-2xl text-[#232F46] text-[15px] focus:outline-none focus:ring-4 focus:ring-[#ED8C32]/10 transition-all duration-300 placeholder:text-[#232F46]/30"
                    />
                  </div>
                </div>

                {/* Textarea */}
                <div className="relative">
                  <label className="block text-[11px] font-semibold text-[#232F46]/50 tracking-[0.14em] mb-2.5 uppercase">Your Message</label>
                  <textarea
                    rows={6}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Specify your inquiry details, NGO coordinate partnerships, or receipt updates..."
                    className="w-full px-5 py-4 bg-[#FFF8F2] border border-[#232F46]/10 focus:bg-white focus:border-[#ED8C32] rounded-2xl text-[#232F46] text-[15px] focus:outline-none focus:ring-4 focus:ring-[#ED8C32]/10 transition-all duration-300 placeholder:text-[#232F46]/30 resize-none leading-relaxed"
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
                      <div className="p-4 sm:p-5 bg-[#ED8C32]/10 border border-[#ED8C32]/30 rounded-2xl flex items-start gap-3 mt-2">
                        <CheckCircle2 className="h-5 w-5 text-[#ED8C32] shrink-0 mt-0.5" />
                        <p className="text-[14.5px] text-[#232F46]/85 font-medium leading-relaxed">
                          {contactResultMsg}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2 flex flex-col items-start gap-7">
                  <button
                    type="submit"
                    disabled={isSendingContact}
                    className="group relative w-full overflow-hidden px-8 py-4.5 bg-[#ED8C32] text-[#232F46] rounded-2xl font-semibold text-[16px] tracking-[-0.01em] flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(237,140,50,0.3)] hover:shadow-[0_14px_34px_rgba(237,140,50,0.42)] transform hover:-translate-y-1 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                     <span>{isSendingContact ? "Sending..." : "Submit Message"}</span>
                     {!isSendingContact && (
                        <Send className="h-5 w-5 text-[#232F46] transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-400" />
                     )}
                  </button>

                  {/* Trust Elements under form */}
                  <div className="flex flex-wrap items-center justify-center w-full gap-x-4 gap-y-3 pt-6 border-t border-[#232F46]/[0.07]">
                     <div className="flex items-center gap-2 bg-[#FFF8F2] px-3.5 py-2 rounded-full border border-[#232F46]/[0.06]">
                        <ShieldCheck className="h-4 w-4 text-[#ED8C32]" />
                        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#232F46]/65">Secure Communication</span>
                     </div>
                     <div className="flex items-center gap-2 bg-[#FFF8F2] px-3.5 py-2 rounded-full border border-[#232F46]/[0.06]">
                        <Clock className="h-4 w-4 text-[#ED8C32]" />
                        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#232F46]/65">24h Response</span>
                     </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Added Bottom Trust Badge */}
            <div className="absolute -bottom-6 right-6 lg:right-12 bg-white border border-[#ED8C32]/30 px-5 py-2.5 rounded-full shadow-[0_12px_32px_rgba(35,47,70,0.1)] flex items-center gap-2.5 transform translate-y-1/2 z-20">
                <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
                <span className="text-[11px] font-semibold text-[#232F46] uppercase tracking-[0.14em]">Verified NGO Registry</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
