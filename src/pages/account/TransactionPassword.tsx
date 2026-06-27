import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldAlert, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const PasswordInput = ({ label, value, onChange, placeholder }: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-4">
      <Input
        label={label}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rightIcon={
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="text-gray-400 hover:text-[#232F46] transition-colors cursor-pointer p-1"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />
    </div>
  );
};

export default function TransactionPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const reqs = useMemo(() => ({
    length: newPassword.length >= 8 && newPassword.length <= 16,
    upper: /[A-Z]/.test(newPassword),
    lower: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword)
  }), [newPassword]);

  const score = Object.values(reqs).filter(Boolean).length;

  const strength = useMemo(() => {
    if (newPassword.length === 0) return { label: '', color: 'bg-gray-200', text: 'text-gray-400' };
    if (score < 3) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-600' };
    if (score < 5) return { label: 'Medium', color: 'bg-[#ED8C32]', text: 'text-[#ED8C32]' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  }, [score, newPassword]);

  const requirements = [
    { label: '8–16 characters', met: reqs.length },
    { label: 'At least 1 uppercase letter', met: reqs.upper },
    { label: 'At least 1 lowercase letter', met: reqs.lower },
    { label: 'At least 1 number', met: reqs.number },
    { label: 'At least 1 special character', met: reqs.special }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto pb-10"
    >
      <PageHeader
        title="Transaction Password"
        description="Manage your secure transaction PIN and authentication credentials."
        breadcrumbs={[{ label: 'My Account' }, { label: 'Transaction Password' }]}
      />

      <div className="max-w-[600px] mx-auto space-y-6">
        {/* Password Form Card */}
        <Card noPadding>
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <Lock size={14} className="text-gray-500" />
            <h3 className="text-sm font-bold text-[#232F46] uppercase tracking-wider">Change Transaction Password</h3>
          </div>
          <div className="p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <PasswordInput label="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter current password" />
              <PasswordInput label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
              <PasswordInput label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter new password" />

              {/* Strength Meter */}
              {newPassword.length > 0 && (
                <div className="mt-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Password Strength</span>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${strength.text}`}>{strength.label}</span>
                  </div>
                  <div className="flex gap-1 h-1.5 w-full">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div key={level} className={`flex-1 rounded-full transition-colors duration-300 ${level <= score ? strength.color : 'bg-gray-100'}`}></div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button type="button" className="text-[#ED8C32] text-xs font-bold hover:underline cursor-pointer">Forgot Password?</button>
                <div className="flex gap-3">
                  <Button type="button" variant="outline">Cancel</Button>
                  <Button
                    type="submit"
                    disabled={score < 5 || newPassword !== confirmPassword}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Card>

        {/* Requirements Card */}
        <Card className="bg-gray-50 border border-gray-200">
          <h4 className="text-xs font-bold text-[#232F46] uppercase tracking-widest mb-4">Password Requirements</h4>
          <div className="space-y-2.5">
            {requirements.map(({ label, met }) => (
              <div key={label} className={`flex items-center gap-2 text-xs font-medium ${met ? 'text-emerald-600' : 'text-gray-500'}`}>
                {met ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                {label}
              </div>
            ))}
          </div>
        </Card>

        {/* Security Tips */}
        <Card className="bg-blue-50/50 border border-blue-100">
          <div className="flex items-center gap-2 mb-3 text-blue-700">
            <ShieldAlert size={16} />
            <h4 className="text-xs font-bold uppercase tracking-widest">Security Tips</h4>
          </div>
          <ul className="space-y-2 text-xs text-blue-800/80 font-medium">
            <li className="flex items-start gap-2"><span>🔒</span> Never share your transaction password with anyone.</li>
            <li className="flex items-start gap-2"><span>🔒</span> Use a unique password not used on other platforms.</li>
            <li className="flex items-start gap-2"><span>🔒</span> Change your password regularly for better security.</li>
          </ul>
        </Card>
      </div>
    </motion.div>
  );
}
