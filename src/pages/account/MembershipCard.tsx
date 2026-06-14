/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, Printer, BadgeCheck, Calendar, Hash, User, Shield } from 'lucide-react';

const MEMBER = {
  name: 'Demo User',
  id: 'SKS-447036',
  joined: '01 June 2026',
  status: 'Active Member',
  type: 'General Membership',
};

export default function MembershipCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '24px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <Link to="/dashboard" style={{ color: '#9ca3af', textDecoration: 'none' }}>Dashboard</Link>
        <ChevronRight size={12} />
        <span>My Account</span>
        <ChevronRight size={12} />
        <span style={{ color: '#ED8C32' }}>Membership Card</span>
      </nav>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#232F46', margin: 0, letterSpacing: '-0.02em', fontFamily: 'Poppins, sans-serif' }}>Membership Card</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>Your official Shukrana Kalyan Sangh digital membership card.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>

        {/* THE CARD */}
        <div style={{ width: '100%', maxWidth: '480px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(35,47,70,0.25)', position: 'relative' }}>

          {/* Card top band - dark blue */}
          <div style={{ background: '#232F46', padding: '28px 28px 20px', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(237,140,50,0.12)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-20px', left: '40%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(237,140,50,0.08)', pointerEvents: 'none' }} />

            {/* Logo row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ED8C32', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={20} color="#fff" strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>SHUKRANA KALYAN</div>
                  <div style={{ fontSize: '8px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '2px' }}>SANGH FOUNDATION</div>
                </div>
              </div>
              <div style={{ background: 'rgba(237,140,50,0.15)', border: '1px solid rgba(237,140,50,0.3)', borderRadius: '20px', padding: '4px 12px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#ED8C32', textTransform: 'uppercase', letterSpacing: '0.07em' }}>MEMBER</span>
              </div>
            </div>

            {/* Member name + ID */}
            <div>
              <p style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px', fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}>{MEMBER.name}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: 0, fontFamily: 'monospace', letterSpacing: '0.1em' }}>ID: {MEMBER.id}</p>
            </div>
          </div>

          {/* Divider strip with photo */}
          <div style={{ background: '#ED8C32', padding: '0', height: '4px' }} />

          {/* Card bottom - white */}
          <div style={{ background: '#fff', padding: '20px 28px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              {/* Photo */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"
                  alt="Member"
                  style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #f3f4f6' }}
                />
              </div>

              {/* Details */}
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <p style={{ fontSize: '9px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 3px', fontFamily: 'monospace' }}>Joining Date</p>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#232F46', margin: 0 }}>{MEMBER.joined}</p>
                </div>
                <div>
                  <p style={{ fontSize: '9px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 3px', fontFamily: 'monospace' }}>Membership</p>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#232F46', margin: 0 }}>{MEMBER.type}</p>
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BadgeCheck size={15} color="#10b981" />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>{MEMBER.status}</span>
                </div>
              </div>
            </div>

            {/* QR + barcode */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed #f3f4f6' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[0.7, 1, 0.5, 0.9, 0.6, 1, 0.8, 0.4, 1, 0.7].map((h, i) => (
                  <div key={i} style={{ height: `${h * 18}px`, width: '3px', background: '#232F46', borderRadius: '1px' }} />
                ))}
              </div>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#9ca3af', textAlign: 'center', letterSpacing: '0.05em', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                <div>Shukrana Kalyan Sangh</div>
                <div style={{ color: '#ED8C32', fontSize: '10px', marginTop: '2px' }}>{MEMBER.id}</div>
              </div>
              <div style={{ width: '44px', height: '44px', background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  <path fill="#232F46" d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M40,0 h20 v10 h-20 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,40 h10 v20 h-10 z M20,40 h20 v10 h-20 z M50,40 h10 v20 h-10 z M70,40 h30 v10 h-30 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,70 h20 v10 h-20 z M70,60 h10 v20 h-10 z M90,60 h10 v20 h-10 z M70,90 h30 v10 h-30 z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#232F46', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(35,47,70,0.2)' }}>
            <Download size={16} /> Download Card
          </button>
          <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: '1.5px solid #e5e7eb', background: '#fff', color: '#374151', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
            <Printer size={16} /> Print Card
          </button>
        </div>

        {/* Info note */}
        <div style={{ background: 'rgba(237,140,50,0.07)', border: '1px solid rgba(237,140,50,0.2)', borderRadius: '12px', padding: '14px 18px', display: 'flex', gap: '10px', alignItems: 'flex-start', maxWidth: '480px', width: '100%' }}>
          <BadgeCheck size={16} color="#ED8C32" style={{ flexShrink: 0, marginTop: '1px' }} />
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>This is your official digital membership card for Shukrana Kalyan Sangh Foundation. Please keep your Member ID safe for all communications.</p>
        </div>
      </div>
    </motion.div>
  );
}
