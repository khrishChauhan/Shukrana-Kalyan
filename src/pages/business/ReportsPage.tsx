import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Download, Calendar, BarChart2, Briefcase, HandHeart, Banknote } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { title: 'Monthly Statement', desc: 'Detailed ledger of all transactions for the selected month.', icon: Calendar },
    { title: 'Annual Statement', desc: 'Complete financial overview for the fiscal year.', icon: Calendar },
    { title: 'Income Summary', desc: 'Breakdown of Binary, Sponsor, Level, and Royalty income.', icon: BarChart2 },
    { title: 'Donation Summary', desc: 'Report of all social welfare contributions deducted from payouts.', icon: HandHeart },
    { title: 'Withdrawal Summary', desc: 'Record of all withdrawal requests, TDS, and Admin charges.', icon: Banknote },
    { title: 'Business Report', desc: 'Overall network growth, new members, and BV accumulation.', icon: Briefcase },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Reports & Analytics"
        description="Generate and download customized financial and business reports."
        breadcrumbs={[{ label: 'Business' }, { label: 'Reports' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, i) => (
          <Card key={i} className="flex flex-col justify-between h-full hover:border-[#ED8C32] transition-colors group">
            <div>
              <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#ED8C32]/10 transition-colors">
                  <report.icon className="w-6 h-6 text-[#232F46] group-hover:text-[#ED8C32] transition-colors" />
                </div>
                <h3 className="font-bold text-[#232F46]">{report.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">{report.desc}</p>
            </div>
            
            <div className="space-y-3">
              <select className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ED8C32]">
                <option>Current Month</option>
                <option>Last Month</option>
                <option>Current Year</option>
                <option>Custom Date Range</option>
              </select>
              
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="w-full gap-1 text-[10px] sm:text-xs">
                  <FileText className="w-3 h-3" /> PDF
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-1 text-[10px] sm:text-xs">
                  <Download className="w-3 h-3" /> CSV
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-1 text-[10px] sm:text-xs">
                  <Download className="w-3 h-3" /> Excel
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
