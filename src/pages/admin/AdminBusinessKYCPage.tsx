import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { FileCheck, Search, Eye, CheckCircle, XCircle } from 'lucide-react';

const kycRequests = [
  { id: 'KYC-201', name: 'John Doe', document: 'PAN Card', date: '2023-10-26', status: 'Pending Review' },
  { id: 'KYC-202', name: 'Jane Smith', document: 'Aadhaar (Bank Link)', date: '2023-10-25', status: 'Pending Review' },
];

export default function AdminBusinessKYCPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Business KYC Approvals"
        description="Verify and approve KYC documents required for business payouts."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Business Ops' }, { label: 'KYC' }]}
      />

      <Card>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#232F46]/10 rounded-lg">
              <FileCheck className="w-5 h-5 text-[#232F46]" />
            </div>
            <h3 className="font-bold text-[#232F46] text-lg">Verification Queue</h3>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Member ID..." 
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ED8C32] text-sm w-full sm:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Member Name</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Document Type</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date Submitted</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {kycRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-[#232F46]">{req.id}</p>
                  </td>
                  <td className="p-4 font-medium text-[#232F46]">{req.name}</td>
                  <td className="p-4 text-gray-600">{req.document}</td>
                  <td className="p-4 text-gray-500 text-sm">{req.date}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button className="p-1.5 bg-[#232F46]/10 text-[#232F46] rounded-lg hover:bg-[#232F46]/20 transition-colors" title="View Document">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 bg-[#ED8C32]/10 text-[#ED8C32] rounded-lg hover:bg-[#ED8C32]/20 transition-colors" title="Approve">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors" title="Reject">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {kycRequests.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No pending KYC requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
