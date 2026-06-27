import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockPayoutHistory } from '../../data/mockBusinessData';
import { Banknote, Download, ArrowUpRight, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function PayoutHistoryPage() {
  const totalPaid = mockPayoutHistory.filter(p => p.status === 'Paid').reduce((acc, curr) => acc + curr.net, 0);
  const totalPending = mockPayoutHistory.filter(p => p.status === 'Pending').reduce((acc, curr) => acc + curr.net, 0);
  const totalProcessing = mockPayoutHistory.filter(p => p.status === 'Processing').reduce((acc, curr) => acc + curr.net, 0);
  const lastPayout = mockPayoutHistory.find(p => p.status === 'Paid');

  // Enriched history to match the required columns
  const enrichedHistory = mockPayoutHistory.map(p => {
    const tds = p.gross * 0.05;
    const admin = p.gross * 0.05;
    const donation = p.gross * 0.02;
    return {
      ...p,
      period: 'Oct 2023',
      tds,
      admin,
      donation,
      paymentDate: p.status === 'Paid' ? '2023-10-26' : '-'
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Payout History"
          description="View all disbursed payments and their processing status."
          breadcrumbs={[{ label: 'Business' }, { label: 'Payout History' }]}
        />
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-green-50 border border-green-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Total Paid</p>
          <p className="text-2xl font-black text-[#232F46]">₹{totalPaid.toLocaleString()}</p>
        </Card>
        <Card className="p-4 bg-orange-50 border border-orange-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-[#ED8C32] uppercase tracking-wider mb-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Pending</p>
          <p className="text-2xl font-black text-[#232F46]">₹{totalPending.toLocaleString()}</p>
        </Card>
        <Card className="p-4 bg-blue-50 border border-blue-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Processing</p>
          <p className="text-2xl font-black text-[#232F46]">₹{totalProcessing.toLocaleString()}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> Last Payout</p>
          <p className="text-2xl font-black text-[#232F46]">₹{lastPayout?.net.toLocaleString() || 0}</p>
          <p className="text-[10px] text-gray-500 mt-1">{lastPayout?.date}</p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <Banknote className="w-5 h-5 text-gray-400" />
          <h3 className="font-bold text-[#232F46]">Payout Statements</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Period</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Gross</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Donation</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">TDS</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Admin</th>
                <th className="p-3 text-[10px] font-bold text-[#232F46] uppercase tracking-wider text-right">Net</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">UTR</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enrichedHistory.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-3 text-xs font-bold text-[#232F46]">{payout.period}</td>
                  <td className="p-3 text-xs text-right font-bold text-gray-600">₹{payout.gross.toLocaleString()}</td>
                  <td className="p-3 text-xs text-right text-blue-500">-₹{payout.donation.toLocaleString()}</td>
                  <td className="p-3 text-xs text-right text-red-500">-₹{payout.tds.toLocaleString()}</td>
                  <td className="p-3 text-xs text-right text-red-500">-₹{payout.admin.toLocaleString()}</td>
                  <td className="p-3 text-xs text-right font-black text-[#232F46] bg-gray-50">₹{payout.net.toLocaleString()}</td>
                  <td className="p-3">
                    {payout.utr ? (
                      <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{payout.utr}</span>
                    ) : (
                      <span className="text-xs text-gray-400 italic">N/A</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <StatusBadge status={payout.status} />
                  </td>
                  <td className="p-3 text-xs text-gray-500">{payout.paymentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}

// Add a quick Button stub if not importing from UI properly
const Button = ({ children, variant, className, ...props }: any) => {
  const base = "inline-flex items-center justify-center font-bold rounded-lg transition-colors";
  const variants = {
    outline: "border border-gray-200 hover:bg-gray-50 text-[#232F46] px-4 py-2 text-sm",
  };
  return <button className={`${base} ${variants.outline} ${className}`} {...props}>{children}</button>;
}
