import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Download, FileText, File, Archive, CreditCard, Award } from 'lucide-react';

export default function DownloadsPage() {
  const documents = [
    { category: 'Financial Statements', items: [
      { id: '1', title: 'Income Statement', date: 'Oct 2023', format: 'PDF', icon: FileText },
      { id: '2', title: 'Wallet Statement', date: 'Oct 2023', format: 'PDF', icon: FileText },
      { id: '3', title: 'Detailed Ledger', date: 'YTD 2023', format: 'CSV', icon: File },
      { id: '4', title: 'Withdrawal Report', date: 'Oct 2023', format: 'PDF', icon: FileText },
    ]},
    { category: 'Certificates & Documents', items: [
      { id: '5', title: 'Donation Certificate', date: 'FY 2023-24', format: 'PDF', icon: Award },
      { id: '6', title: 'Membership Certificate', date: 'Lifetime', format: 'PDF', icon: Award },
      { id: '7', title: 'Welcome Letter', date: 'Account Opening', format: 'PDF', icon: FileText },
      { id: '8', title: 'Consent Letter', date: 'Signed', format: 'PDF', icon: FileText },
    ]},
    { category: 'Assets', items: [
      { id: '9', title: 'Digital Membership Card', date: 'Active', format: 'PNG', icon: CreditCard },
      { id: '10', title: 'Business Presentation', date: 'v2.1', format: 'PDF', icon: FileText },
      { id: '11', title: 'Marketing Kit', date: '2023', format: 'ZIP', icon: Archive },
    ]}
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Business Downloads"
        description="Access and download your financial statements, certificates, and marketing assets."
        breadcrumbs={[{ label: 'Business' }, { label: 'Downloads' }]}
      />

      <div className="space-y-6">
        {documents.map((section, index) => (
          <Card key={index} className="p-0 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-bold text-[#232F46]">{section.category}</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-100">
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">File Name</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Generated Date</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Format</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {section.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                            <item.icon className="w-5 h-5 text-[#ED8C32]" />
                          </div>
                          <span className="font-bold text-[#232F46]">{item.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-500">{item.date}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">
                          {item.format}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="outline" size="sm" className="gap-2 text-[#232F46]">
                          <Download className="w-4 h-4" /> Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
