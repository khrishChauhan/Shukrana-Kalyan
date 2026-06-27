import React from 'react';
import { motion } from 'motion/react';
import { Download, Printer } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { PageHeader } from '../../components/ui/PageHeader';

const MEMBER = {
  name: 'John Doe',
  initials: 'JD',
  id: 'SK00001',
  joined: '01 June 2026',
  status: 'Active',
};

export default function MembershipCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-2xl mx-auto pb-10"
    >
      <div className="print:hidden">
        <PageHeader
          title="Membership Card"
          description="Your official Shukrana Kalyan Sangh digital membership pass."
          breadcrumbs={[{ label: 'My Account' }, { label: 'Membership Card' }]}
        />
      </div>

      {/* Card */}
      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden print:shadow-none print:border-gray-300">
        
        {/* Top Band */}
        <div className="bg-[#232F46] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ED8C32] flex items-center justify-center font-bold text-white text-sm shrink-0">
              S
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-widest uppercase">Shukrana Kalyan Sangh</p>
              <p className="text-[10px] text-gray-400 tracking-wider uppercase">Foundation</p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest bg-[#ED8C32] text-white px-2.5 py-1 rounded-full">
            Member
          </span>
        </div>

        {/* Orange Rule */}
        <div className="h-1 bg-[#ED8C32]" />

        {/* Card Body */}
        <div className="px-6 py-6 flex items-start gap-6">
          {/* Circular Avatar */}
          <Avatar
            initials={MEMBER.initials}
            size="xl"
            className="border-2 border-[#232F46]/20 shrink-0"
          />

          {/* Member Details */}
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xl font-bold text-[#232F46] uppercase tracking-wide">{MEMBER.name}</p>
              <p className="text-xs font-mono text-[#ED8C32] font-bold mt-0.5">ID: {MEMBER.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm pt-3 border-t border-gray-100">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Join Date</p>
                <p className="font-bold text-[#232F46] mt-0.5">{MEMBER.joined}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="font-bold text-green-600">{MEMBER.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
            Digital Membership Pass
          </p>
          <p className="text-[10px] font-mono text-gray-400">{MEMBER.id}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 print:hidden">
        <Button
          type="button"
          onClick={() => window.print()}
          variant="outline"
          leftIcon={<Printer className="w-4 h-4" />}
        >
          Print Card
        </Button>
        <Button
          type="button"
          leftIcon={<Download className="w-4 h-4" />}
        >
          Download PDF
        </Button>
      </div>
    </motion.div>
  );
}
