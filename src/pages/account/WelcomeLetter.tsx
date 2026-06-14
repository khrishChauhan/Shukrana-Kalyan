/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, Printer, Award, CheckCircle2 } from 'lucide-react';

const MEMBER = {
  name: 'Demo User',
  id: 'SKS-447036',
  joined: '01 June 2026',
  address: '123, Green Colony, Mumbai, Maharashtra - 400001',
};

const BENEFITS = [
  'Access to all foundation programs and community events.',
  'Participation in educational workshops and skill development sessions.',
  'Eligibility for emergency welfare assistance programs.',
  'Monthly newsletter and foundation updates.',
  'Voting rights in annual general meetings.',
  'Access to the member portal and digital resources.',
];

export default function WelcomeLetter() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '24px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <Link to="/dashboard" style={{ color: '#9ca3af', textDecoration: 'none' }}>Dashboard</Link>
        <ChevronRight size={12} />
        <span>My Account</span>
        <ChevronRight size={12} />
        <span style={{ color: '#ED8C32' }}>Welcome Letter</span>
      </nav>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#232F46', margin: 0, letterSpacing: '-0.02em', fontFamily: 'Poppins, sans-serif' }}>Welcome Letter</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>Your official membership welcome letter from Shukrana Kalyan Sangh Foundation.</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* A4 Letter */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(35,47,70,0.1)', overflow: 'hidden', marginBottom: '24px' }}>

          {/* Letter header band */}
          <div style={{ background: '#232F46', padding: '28px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ED8C32', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={24} color="#fff" strokeWidth={2.2} />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em', lineHeight: 1 }}>SHUKRANA KALYAN SANGH</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '3px' }}>Foundation — Member Services</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px' }}>Membership Ref</p>
              <p style={{ fontSize: '13px', fontWeight: 800, color: '#ED8C32', fontFamily: 'monospace', margin: 0 }}>{MEMBER.id}</p>
            </div>
          </div>

          {/* Orange accent line */}
          <div style={{ height: '4px', background: '#ED8C32' }} />

          {/* Letter body */}
          <div style={{ padding: '40px 40px 48px' }}>
            {/* Date */}
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px', textAlign: 'right' }}>Date: {MEMBER.joined}</p>

            {/* To */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#232F46', margin: '0 0 2px' }}>{MEMBER.name}</p>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 2px' }}>{MEMBER.address}</p>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, fontFamily: 'monospace', fontWeight: 600 }}>Member ID: {MEMBER.id}</p>
            </div>

            {/* Subject */}
            <div style={{ background: 'rgba(237,140,50,0.08)', border: '1px solid rgba(237,140,50,0.18)', borderRadius: '10px', padding: '12px 16px', marginBottom: '28px', display: 'inline-block' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#232F46', margin: 0 }}>Subject: <span style={{ color: '#ED8C32' }}>Welcome to Shukrana Kalyan Sangh Foundation – Membership Confirmation</span></p>
            </div>

            {/* Salutation */}
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#232F46', marginBottom: '16px' }}>Dear {MEMBER.name},</p>

            {/* Body paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
              <p style={{ margin: 0 }}>We are delighted to welcome you as an official member of <strong style={{ color: '#232F46' }}>Shukrana Kalyan Sangh Foundation</strong>. Your membership has been activated successfully, and we are thrilled to have you join our community of dedicated individuals working towards welfare, empowerment, and social progress.</p>

              <p style={{ margin: 0 }}>The foundation is committed to uplifting communities through education, healthcare, and livelihood programs. As a member, you are now part of a growing family that believes in the power of collective action and compassionate service.</p>

              <p style={{ margin: 0 }}>Your membership details are as follows:</p>
            </div>

            {/* Membership info box */}
            <div style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '18px 20px', margin: '20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[['Member Name', MEMBER.name], ['Member ID', MEMBER.id], ['Date of Joining', MEMBER.joined], ['Membership Status', 'Active']].map(([label, value]) => (
                <div key={label}>
                  <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 3px', fontFamily: 'monospace' }}>{label}</p>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#232F46', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#232F46', margin: '20px 0 12px' }}>As a member, you are entitled to:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {BENEFITS.map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="#ED8C32" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.55 }}>{b}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#374151', lineHeight: '1.75', marginBottom: '32px' }}>
              <p style={{ margin: 0 }}>We encourage you to explore the member portal, participate actively in our programs, and connect with fellow members. Your contribution — be it time, effort, or resources — makes a meaningful difference in the lives of those we serve.</p>
              <p style={{ margin: 0 }}>Should you have any questions or require assistance, please do not hesitate to reach out to our Member Services team. We are here to support you every step of the way.</p>
            </div>

            {/* Closing */}
            <div style={{ marginTop: '8px' }}>
              <p style={{ fontSize: '14px', color: '#374151', margin: '0 0 20px' }}>Warm regards,</p>
              <p style={{ fontSize: '15px', fontWeight: 700, color: '#232F46', margin: '0 0 3px', fontFamily: 'Poppins, sans-serif' }}>The Secretary</p>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 2px' }}>Shukrana Kalyan Sangh Foundation</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Member Services Division</p>

              {/* Seal */}
              <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid #232F46', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={26} color="#232F46" />
                </div>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, #e5e7eb, transparent)' }} />
              </div>
            </div>
          </div>

          {/* Footer strip */}
          <div style={{ background: '#f9fafb', borderTop: '1px solid #f3f4f6', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0, fontFamily: 'monospace' }}>Shukrana Kalyan Sangh Foundation | Member Portal</p>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0, fontFamily: 'monospace' }}>Ref: {MEMBER.id} | {MEMBER.joined}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#232F46', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(35,47,70,0.2)' }}>
            <Download size={16} /> Download PDF
          </button>
          <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: '1.5px solid #e5e7eb', background: '#fff', color: '#374151', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
            <Printer size={16} /> Print Letter
          </button>
        </div>
      </div>
    </motion.div>
  );
}
