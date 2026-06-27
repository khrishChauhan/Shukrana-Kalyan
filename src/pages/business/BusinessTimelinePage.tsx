import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockBusinessHealth } from '../../data/mockBusinessData';
import { Clock } from 'lucide-react';

export default function BusinessTimelinePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Business Timeline"
        description="Chronological log of your key network and income events."
        breadcrumbs={[{ label: 'Business' }, { label: 'Timeline' }]}
      />

      <Card>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-[#232F46]/10 rounded-lg">
            <Clock className="w-5 h-5 text-[#232F46]" />
          </div>
          <h3 className="font-bold text-[#232F46] text-lg">Activity Log</h3>
        </div>

        <div className="relative border-l-2 border-gray-100 ml-4 pl-8 space-y-8">
          {mockBusinessHealth.recentActivity.map((activity, i) => (
            <div key={activity.id} className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-4 border-[#ED8C32]" />
              <div>
                <p className="text-xs font-bold text-gray-400 mb-1">{activity.date}</p>
                <h4 className="font-bold text-[#232F46]">{activity.event}</h4>
                <p className="text-sm text-gray-500 mt-1">{activity.details}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
