import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';

const Req = ({ met, label }: { met: boolean; label: string }) => (
  <div className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-200 ${met ? 'text-emerald-600' : 'text-gray-400'}`}>
    <span className="text-base leading-none select-none">{met ? '☑' : '☐'}</span>
    <span>{label}</span>
  </div>
);

export default function ChangePassword() {
  const [current, setCurrent] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirm, setConfirm] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [done, setDone] = useState(false);

  const reqs = useMemo(() => ({
    length: newPw.length >= 8,
    upper: /[A-Z]/.test(newPw),
    lower: /[a-z]/.test(newPw),
    number: /[0-9]/.test(newPw),
    special: /[^A-Za-z0-9]/.test(newPw),
  }), [newPw]);

  const score = Object.values(reqs).filter(Boolean).length;

  const { strengthLabel, strengthBar, strengthColorClass } = useMemo(() => {
    if (newPw.length === 0) {
      return { strengthLabel: 'None', strengthBar: '[--------]', strengthColorClass: 'text-gray-400' };
    }
    switch (score) {
      case 1:
        return { strengthLabel: 'Weak', strengthBar: '[==------]', strengthColorClass: 'text-red-500' };
      case 2:
        return { strengthLabel: 'Weak', strengthBar: '[====----]', strengthColorClass: 'text-red-500' };
      case 3:
        return { strengthLabel: 'Fair', strengthBar: '[====----]', strengthColorClass: 'text-[#ED8C32]' };
      case 4:
        return { strengthLabel: 'Good', strengthBar: '[======--]', strengthColorClass: 'text-[#ED8C32]' };
      case 5:
        return { strengthLabel: 'Strong', strengthBar: '[========]', strengthColorClass: 'text-emerald-600' };
      default:
        return { strengthLabel: 'Weak', strengthBar: '[--------]', strengthColorClass: 'text-red-500' };
    }
  }, [newPw, score]);

  const isMatching = newPw === confirm;
  const showMatchError = confirm.length > 0 && !isMatching;
  const canSubmit = score === 5 && isMatching && current.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    setDone(true);
    setTimeout(() => setDone(false), 3500);
    
    // Reset fields
    setCurrent('');
    setNewPw('');
    setConfirm('');
  };

  const handleCancel = () => {
    setCurrent('');
    setNewPw('');
    setConfirm('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto pb-10"
    >
      <PageHeader
        title="Security Settings"
        description="Update your password to keep your account secure."
        breadcrumbs={[{ label: 'My Account' }, { label: 'Change Password' }]}
      />

      {/* Success banner */}
      {done && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-center gap-2.5 mb-6 max-w-[600px] mx-auto">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">Password updated successfully.</span>
        </div>
      )}

      {/* Centered Wrapper - Max-width 600px */}
      <div className="max-w-[600px] mx-auto">
        <Card noPadding>
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-bold text-[#232F46]">Change Password</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
            {/* Current Password */}
            <Input
              label="Current Password"
              type={showCurrent ? 'text' : 'password'}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="font-mono"
              required
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="text-gray-400 hover:text-[#232F46] cursor-pointer p-1"
                  title={showCurrent ? 'Hide password' : 'Show password'}
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* New Password */}
            <Input
              label="New Password"
              type={showNew ? 'text' : 'password'}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="font-mono"
              required
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="text-gray-400 hover:text-[#232F46] cursor-pointer p-1"
                  title={showNew ? 'Hide password' : 'Show password'}
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* ValidationTracker - Strength Meter & Checklist */}
            {newPw.length > 0 && (
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col gap-3.5">
                
                {/* Strength Meter */}
                <div className="flex items-center gap-2 text-xs font-bold text-[#232F46]">
                  <span>Password Strength:</span>
                  <span className="font-mono tracking-wider">{strengthBar}</span>
                  <span className={`uppercase tracking-wide text-[11px] ${strengthColorClass}`}>{strengthLabel}</span>
                </div>

                {/* Requirements Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5 pt-2 border-t border-gray-200/60">
                  <Req met={reqs.length} label="At least 8 characters" />
                  <Req met={reqs.number} label="One number" />
                  <Req met={reqs.upper} label="One uppercase letter" />
                  <Req met={reqs.special} label="One special character" />
                  <Req met={reqs.lower} label="One lowercase letter" />
                </div>
              </div>
            )}

            {/* Confirm New Password */}
            <div>
              <Input
                label="Confirm New Password"
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="font-mono"
                required
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-gray-400 hover:text-[#232F46] cursor-pointer p-1"
                    title={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
              
              {/* Match Alert */}
              {showMatchError && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 mt-2">
                  <AlertTriangle size={13} />
                  <span>Passwords do not match</span>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end items-center gap-3 mt-2 border-t border-gray-100 pt-5">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit}
              >
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </motion.div>
  );
}
