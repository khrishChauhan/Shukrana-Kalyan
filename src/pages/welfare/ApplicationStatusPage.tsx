import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { CheckCircle2, Clock, FileText, ChevronRight } from 'lucide-react';

export default function ApplicationStatusPage() {
  const applications = [
    {
      id: 'APP-10492',
      date: 'Oct 20, 2023',
      category: 'Medical Emergency',
      amount: '₹50,000',
      status: 'In Review',
      steps: [
        { title: 'Application Submitted', date: 'Oct 20, 2023', status: 'completed' },
        { title: 'Document Verification', date: 'Oct 21, 2023', status: 'completed' },
        { title: 'Committee Review', date: 'Pending', status: 'current' },
        { title: 'Funds Disbursed', date: '-', status: 'upcoming' },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto pb-10"
    >
      <PageHeader
        title="Application Status"
        description="Track the progress of your welfare assistance requests."
        breadcrumbs={[{ label: 'Welfare Support' }, { label: 'Application Status' }]}
      />

      <div className="space-y-6">
        {applications.map((app) => (
          <Card key={app.id} className="p-0 overflow-hidden shadow-sm">
            <div className="p-6 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-gray-500 mb-1">ID: {app.id}</p>
                <h3 className="text-lg font-bold text-[#232F46]">{app.category}</h3>
                <p className="text-sm font-medium text-gray-600 mt-1">Requested: {app.amount}</p>
              </div>
              <StatusBadge status="Pending Review" />
            </div>

            <div className="p-6">
              <h4 className="text-sm font-bold text-[#232F46] mb-6 uppercase tracking-wide">Application Timeline</h4>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200">
                {app.steps.map((step, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-gray-100 text-gray-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10"
                      style={{
                        backgroundColor: step.status === 'completed' ? '#22c55e' : step.status === 'current' ? '#ED8C32' : '#f3f4f6',
                        color: step.status === 'upcoming' ? '#9ca3af' : '#fff'
                      }}
                    >
                      {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : step.status === 'current' ? <Clock className="w-5 h-5" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className={`font-bold ${step.status === 'upcoming' ? 'text-gray-400' : 'text-[#232F46]'}`}>{step.title}</h5>
                      </div>
                      <time className="text-xs text-gray-500 font-medium">{step.date}</time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
