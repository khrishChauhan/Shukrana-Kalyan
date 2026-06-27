import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Banknote, CheckCircle, XCircle } from 'lucide-react';

const pendingPayouts = [
  { id: 'PAY-1002', member: 'John Doe', amount: 15000, date: '2023-10-26', status: 'Pending' },
  { id: 'PAY-1003', member: 'Jane Smith', amount: 8500, date: '2023-10-26', status: 'Pending' },
  { id: 'PAY-1004', member: 'Rahul Verma', amount: 22000, date: '2023-10-25', status: 'Pending' },
];

export default function AdminPayoutManagementPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Payout Management"
        description="Review, approve, and process member withdrawal requests."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Business Ops' }, { label: 'Payouts' }]}
      />

      <Card>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#232F46]/10 rounded-lg">
              <Banknote className="w-5 h-5 text-[#232F46]" />
            </div>
            <h3 className="font-bold text-[#232F46] text-lg">Pending Requests ({pendingPayouts.length})</h3>
          </div>
          <button className="px-4 py-2 bg-[#ED8C32] text-white rounded-lg font-bold text-sm hover:bg-[#ED8C32]/90 transition-colors">
            Process All Batch
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Member</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingPayouts.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-[#232F46]">{req.id}</p>
                    <p className="text-xs text-gray-500">{req.date}</p>
                  </td>
                  <td className="p-4 font-medium text-[#232F46]">{req.member}</td>
                  <td className="p-4 text-right font-bold text-[#ED8C32]">₹{req.amount.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <button className="p-1.5 bg-[#232F46]/10 text-[#232F46] rounded-lg hover:bg-[#232F46]/20 transition-colors" title="Approve">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors" title="Reject">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
