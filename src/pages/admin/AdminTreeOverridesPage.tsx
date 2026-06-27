import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Settings2, AlertTriangle, Save } from 'lucide-react';

export default function AdminTreeOverridesPage() {
  const [memberId, setMemberId] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Tree Search & Overrides"
        description="Administrative tools to forcefully correct placement and sponsor linkages."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Business Ops' }, { label: 'Tree Overrides' }]}
      />

      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-red-800 text-sm">Danger Zone</h4>
          <p className="text-xs text-red-600 mt-1">
            Modifying sponsor or placement linkages forcefully can break BV calculations and payout histories. 
            Only use these overrides to correct critical system errors.
          </p>
        </div>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="p-2 bg-[#232F46]/10 rounded-lg">
            <Settings2 className="w-5 h-5 text-[#232F46]" />
          </div>
          <h3 className="font-bold text-[#232F46] text-lg">Target Node Configuration</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Member ID to Override</label>
            <input 
              type="text" 
              placeholder="e.g. SKS1002"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-xl">
              <h4 className="font-bold text-[#232F46] mb-4">New Sponsor Assignment</h4>
              <label className="block text-sm font-medium text-gray-600 mb-2">New Sponsor ID</label>
              <input 
                type="text" 
                placeholder="Leave blank to keep current"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]"
              />
            </div>
            
            <div className="p-4 border border-gray-200 rounded-xl">
              <h4 className="font-bold text-[#232F46] mb-4">New Placement Assignment</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">New Parent ID</label>
                  <input 
                    type="text" 
                    placeholder="Leave blank to keep current"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Leg Side</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32] bg-white">
                    <option value="">Keep Current</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors">
            <Save className="w-4 h-4" /> Force Execute Override
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
