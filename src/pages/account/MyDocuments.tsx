import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { FileText, Download, FileCheck, Image as ImageIcon } from 'lucide-react';

export default function MyDocuments() {
  const documents = [
    {
      id: 1,
      name: 'Membership ID Card',
      description: 'Official digital identity card with QR code',
      type: 'PDF',
      date: 'Oct 16, 2023',
      icon: <ImageIcon className="w-6 h-6 text-blue-500" />,
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      name: 'Welcome Letter',
      description: 'Official foundation welcome and benefits guide',
      type: 'PDF',
      date: 'Oct 16, 2023',
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      bgColor: 'bg-orange-50',
    },
    {
      id: 3,
      name: '80G Tax Exemption Receipt',
      description: 'For membership activation donation (₹500)',
      type: 'PDF',
      date: 'Oct 15, 2023',
      icon: <FileCheck className="w-6 h-6 text-green-500" />,
      bgColor: 'bg-green-50',
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="My Documents"
        description="Access and download your official foundation documents and receipts."
        breadcrumbs={[
          { label: 'My Account' },
          { label: 'My Documents' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="flex flex-col h-full hover:border-[#ED8C32] transition-colors cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${doc.bgColor}`}>
                {doc.icon}
              </div>
              <div className="p-2 text-gray-400 group-hover:text-[#ED8C32] transition-colors bg-gray-50 rounded-lg group-hover:bg-orange-50">
                <Download className="w-5 h-5" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#232F46] mb-1">{doc.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{doc.description}</p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs font-mono font-bold text-gray-400">{doc.type}</span>
              <span className="text-xs text-gray-500">{doc.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
