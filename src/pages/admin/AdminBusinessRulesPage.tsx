import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { ShieldCheck, Plus, Trash2, HelpCircle } from 'lucide-react';

const rules = [
  { id: 1, name: 'Binary Engine Logic', condition: 'Auto (2:1 or 1:2)', status: 'Active' },
  { id: 2, name: 'Default Equal Ratio', condition: '2:1', status: 'Active' },
  { id: 3, name: 'Max Daily Matches', condition: '10', status: 'Active' },
  { id: 4, name: 'Max Daily Income', condition: '₹2,000', status: 'Active' },
  { id: 5, name: 'Sponsor Bonus', condition: 'Fixed ₹500', status: 'Inactive' },
];

export default function AdminBusinessRulesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Business Rules Configuration"
        description="Manage the Binary Engine, compensation structures, and caps."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Business Ops' }, { label: 'Rules' }]}
      />

      <Card>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#232F46]/10 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-[#232F46]" />
            </div>
            <h3 className="font-bold text-[#232F46] text-lg">Active Compensation Rules</h3>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#ED8C32] text-white rounded-lg font-bold text-sm hover:bg-[#ED8C32]/90 transition-colors">
            <Plus className="w-4 h-4" /> Add Rule
          </button>
        </div>

        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-bold text-[#232F46]">{rule.name}</p>
                <p className="text-sm text-gray-500 mt-1">Condition: <span className="font-mono text-[#ED8C32] font-bold">{rule.condition}</span></p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs font-bold uppercase rounded-full ${
                  rule.status === 'Active' ? 'bg-[#232F46]/10 text-[#232F46]' : 'bg-gray-200 text-gray-500'
                }`}>
                  {rule.status}
                </span>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete Rule">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="p-2 bg-[#ED8C32]/10 rounded-lg">
            <HelpCircle className="w-5 h-5 text-[#ED8C32]" />
          </div>
          <h3 className="font-bold text-[#232F46] text-lg">Binary Matching Guide</h3>
        </div>

        <div className="space-y-6 text-sm text-gray-700">
          <div>
            <h4 className="font-bold text-[#232F46] mb-2 text-base">How the Binary Engine Decides</h4>
            <p className="mb-2">The system automatically evaluates available Left BV and Right BV to determine the optimal ratio.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Left BV &gt; Right BV:</strong> Use <strong>2:1</strong></li>
              <li><strong>Right BV &gt; Left BV:</strong> Use <strong>1:2</strong></li>
              <li><strong>Left BV == Right BV:</strong> Default to <strong>2:1</strong></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#232F46] mb-2 text-base">Carry Forward</h4>
            <p>Any remaining BV after a successful match becomes Carry Forward. Carry Forward never expires. It is consumed only when new, matching BV arrives on the weaker leg.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-mono text-xs overflow-x-auto">
            <p className="font-bold text-[#232F46] text-sm mb-3 font-sans uppercase tracking-wider">Simulation Example</p>
            <p>Start: Left = 8, Right = 5</p>
            <p className="text-gray-400">---</p>
            <p>Engine: Match 2:1</p>
            <p>Current: Left 6, Right 4</p>
            <p className="text-gray-400">---</p>
            <p>Engine: Match 2:1</p>
            <p>Current: Left 4, Right 3</p>
            <p className="text-gray-400">---</p>
            <p>Engine: Match 2:1</p>
            <p>Current: Left 2, Right 2</p>
            <p className="text-gray-400">---</p>
            <p>Engine: Left == Right. Default Match 2:1</p>
            <p>Current: Left 0, Right 1</p>
            <p className="text-gray-400">---</p>
            <p className="text-[#ED8C32] font-bold mt-2">Final: Carry Left = 0, Carry Right = 1</p>
            <p className="text-[#ED8C32] font-bold">Total Matches = 4. Income = ₹800</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
