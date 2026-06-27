import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockIncomeDashboard } from '../../data/mockBusinessData';
import { PieChart, Download } from 'lucide-react';

export default function IncomeBreakdownPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Income Breakdown"
        description="Detailed view of your gross income, deductions, and net payouts."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard' }, { label: 'Breakdown' }]}
      />

      <div className="space-y-6">
        {mockIncomeDashboard.breakdown.map((report, idx) => (
          <Card key={idx} className="overflow-hidden p-0 border border-gray-100">
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-gray-200">
                  <PieChart className="w-5 h-5 text-[#232F46]" />
                </div>
                <h3 className="font-bold text-[#232F46]">{report.period}</h3>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-sm font-bold text-gray-600">
                <Download className="w-4 h-4" /> Download Statement
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Earnings</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-[#232F46]">Gross Income</span>
                    <span className="font-bold text-[#232F46]">₹{report.gross.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Deductions</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">TDS (5%)</span>
                    <span className="font-medium text-[#232F46]">-₹{report.tds.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Admin Charges (5%)</span>
                    <span className="font-medium text-[#232F46]">-₹{report.admin.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Donation</span>
                    <span className="font-medium text-[#232F46]">-₹{report.donation.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#232F46] text-white flex justify-between items-center">
              <span className="font-bold uppercase tracking-wider text-sm text-white/80">Net Payable Amount</span>
              <span className="text-2xl font-black text-[#ED8C32]">₹{report.net.toLocaleString()}</span>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
