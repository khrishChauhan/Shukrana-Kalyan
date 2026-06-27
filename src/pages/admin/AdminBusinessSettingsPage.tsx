import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Settings, Save } from 'lucide-react';

export default function AdminBusinessSettingsPage() {
  const [settings, setSettings] = useState({
    tdsRate: 5,
    adminCharge: 5,
    minWithdrawal: 500,
    maxWithdrawal: 100000,
    matchingCap: 25000,
    autoPayouts: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Global Business Settings"
        description="Configure system-wide constants, rates, and deduction rules."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Business Ops' }, { label: 'Settings' }]}
      />

      <Card>
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="p-2 bg-[#232F46]/10 rounded-lg">
            <Settings className="w-5 h-5 text-[#232F46]" />
          </div>
          <h3 className="font-bold text-[#232F46] text-lg">Platform Parameters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">TDS Rate (%)</label>
            <input 
              type="number" 
              value={settings.tdsRate}
              onChange={(e) => setSettings({ ...settings, tdsRate: Number(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Admin Charge (%)</label>
            <input 
              type="number" 
              value={settings.adminCharge}
              onChange={(e) => setSettings({ ...settings, adminCharge: Number(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Withdrawal (₹)</label>
            <input 
              type="number" 
              value={settings.minWithdrawal}
              onChange={(e) => setSettings({ ...settings, minWithdrawal: Number(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Matching Cap (Daily ₹)</label>
            <input 
              type="number" 
              value={settings.matchingCap}
              onChange={(e) => setSettings({ ...settings, matchingCap: Number(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]"
            />
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div>
            <p className="font-bold text-[#232F46]">Automated Payout Processing</p>
            <p className="text-sm text-gray-500">Automatically disburse funds to eligible users.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.autoPayouts}
              onChange={() => setSettings({ ...settings, autoPayouts: !settings.autoPayouts })}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ED8C32]"></div>
          </label>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#232F46] text-white rounded-lg font-bold hover:bg-[#232F46]/90 transition-colors">
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
