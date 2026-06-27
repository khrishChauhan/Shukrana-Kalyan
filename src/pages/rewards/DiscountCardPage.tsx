import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { CreditCard, QrCode } from 'lucide-react';

export default function DiscountCardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto pb-10"
    >
      <PageHeader
        title="My Discount Card"
        description="Show this digital card at partner vendors to avail member discounts."
        breadcrumbs={[{ label: 'Rewards & Benefits' }, { label: 'Discount Card' }]}
      />

      <div className="flex justify-center mb-12">
        <div className="w-full max-w-md h-64 bg-[#232F46] rounded-2xl shadow-sm relative overflow-hidden p-6 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h2 className="font-display font-bold tracking-tight">SHUKRANA KALYAN</h2>
              <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase">Member Discount Card</p>
            </div>
            <CreditCard className="w-8 h-8 text-[#ED8C32]" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
            <div>
              <p className="text-xs text-white/60 mb-1">Member Name</p>
              <p className="font-bold text-lg">Demo User</p>
              <p className="font-mono text-sm mt-1 text-[#ED8C32]">SK0001</p>
            </div>
            <div className="bg-white p-1.5 rounded-lg">
              <QrCode className="w-12 h-12 text-[#232F46]" />
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-[#232F46] mb-4">Partner Vendors (Demo)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <div className="h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400 font-medium">Vendor Logo</span>
            </div>
            <h4 className="font-bold text-[#232F46]">Apollo Pharmacy</h4>
            <p className="text-sm text-gray-500 mt-1">15% discount on all medicines</p>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
