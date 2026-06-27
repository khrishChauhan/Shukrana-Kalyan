import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Calculator, ArrowRight } from 'lucide-react';

export default function BusinessCalculatorPage() {
  const [leftBV, setLeftBV] = useState<number>(0);
  const [rightBV, setRightBV] = useState<number>(0);

  let tempLeft = leftBV || 0;
  let tempRight = rightBV || 0;
  let matches = 0;

  while (tempLeft > 0 && tempRight > 0) {
    if (tempLeft > tempRight) {
      const gap = tempLeft - tempRight;
      const maxByBV = Math.min(Math.floor(tempLeft / 2), tempRight);
      let batch = Math.min(gap, maxByBV);
      if (batch === 0) batch = 1;
      
      if (tempLeft >= 2 * batch && tempRight >= batch) {
        tempLeft -= 2 * batch;
        tempRight -= batch;
        matches += batch;
      } else if (tempLeft >= 2 && tempRight >= 1) {
        tempLeft -= 2;
        tempRight -= 1;
        matches++;
      } else {
        break;
      }
    } else if (tempRight > tempLeft) {
      const gap = tempRight - tempLeft;
      const maxByBV = Math.min(tempLeft, Math.floor(tempRight / 2));
      let batch = Math.min(gap, maxByBV);
      if (batch === 0) batch = 1;

      if (tempRight >= 2 * batch && tempLeft >= batch) {
        tempRight -= 2 * batch;
        tempLeft -= batch;
        matches += batch;
      } else if (tempRight >= 2 && tempLeft >= 1) {
        tempRight -= 2;
        tempLeft -= 1;
        matches++;
      } else {
        break;
      }
    } else {
      // Equal, default to 2:1
      if (tempLeft >= 2 && tempRight >= 1) {
        tempLeft -= 2;
        tempRight -= 1;
        matches++;
      } else {
        break;
      }
    }
  }

  const carryForwardLeft = tempLeft;
  const carryForwardRight = tempRight;
  const matchedBV = matches * 3; // Total BV consumed (2 from one side, 1 from another)
  
  const estimatedIncome = matches * 200;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Business Calculator"
        description="Project your potential earnings based on BV matching."
        breadcrumbs={[{ label: 'Business' }, { label: 'Calculator' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Calculator className="w-5 h-5 text-[#232F46]" />
            </div>
            <h3 className="font-bold text-[#232F46]">Input Projections</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Projected Left BV</label>
              <input 
                type="number" 
                value={leftBV || ''}
                onChange={(e) => setLeftBV(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32] transition-colors"
                placeholder="Enter Left BV"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Projected Right BV</label>
              <input 
                type="number" 
                value={rightBV || ''}
                onChange={(e) => setRightBV(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32] transition-colors"
                placeholder="Enter Right BV"
              />
            </div>
          </div>
        </Card>

        <Card className="bg-[#232F46] text-white space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white mb-6 border-b border-white/10 pb-4">Estimated Results</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Matched BV</span>
                <span className="font-bold">{matchedBV.toLocaleString()} BV</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Carry Forward (Left)</span>
                <span className="font-bold">{carryForwardLeft.toLocaleString()} BV</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Carry Forward (Right)</span>
                <span className="font-bold">{carryForwardRight.toLocaleString()} BV</span>
              </div>
            </div>
          </div>

          <Card className="p-6 bg-[#232F46] text-white flex flex-col justify-center items-center text-center">
            <p className="text-sm text-white/70 mb-1">Estimated Binary Income</p>
            <p className="text-4xl font-black text-[#ED8C32]">₹{estimatedIncome.toLocaleString()}</p>
            <p className="text-xs text-white/50 mt-2">*Calculation based on binary match engine (₹200 per match). Excludes TDS and other deductions.</p>
          </Card>
        </Card>
      </div>
    </motion.div>
  );
}
