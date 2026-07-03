import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';
import {
  MapPin, Shield, Star, Globe, Trophy,
  CheckCircle2, Clock, XCircle, Lock, AlertCircle,
  Loader2, Info
} from 'lucide-react';

// ── Position Config ────────────────────────────────────────────────────────
const POSITIONS = [
  {
    key: 'NAGAR',
    label: 'Nagar Sevak',
    sublabel: 'Town / City Level',
    icon: MapPin,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    royalty: '2%',
    requiredLevel: 3,
    description: 'Earn 2% royalty on all activations in your PIN code area.',
  },
  {
    key: 'ZILLA',
    label: 'Zilla Sevak',
    sublabel: 'District Level',
    icon: Shield,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-700',
    royalty: '4%',
    requiredLevel: 5,
    description: 'Earn 4% royalty on all activations in your PIN code area.',
  },
  {
    key: 'RAJYA',
    label: 'Rajya Sevak',
    sublabel: 'State Level',
    icon: Star,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-700',
    royalty: '3%',
    requiredLevel: 8,
    description: 'Earn 3% royalty on all activations in your PIN code area.',
  },
  {
    key: 'NATIONAL',
    label: 'National Sevak',
    sublabel: 'National Level',
    icon: Globe,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badgeColor: 'bg-orange-100 text-orange-700',
    royalty: '1%',
    requiredLevel: 10,
    description: 'Earn 1% royalty on all activations in your PIN code area.',
  },
];

// ── Apply Modal ─────────────────────────────────────────────────────────────
function ApplyModal({
  position,
  pinCode,
  onClose,
  onSuccess,
}: {
  position: typeof POSITIONS[0];
  pinCode: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const Icon = position.icon;

  const handleApply = async () => {
    setApplying(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated.');

      const { error: err } = await supabase.from('royalty_applications').insert({
        member_uuid: user.id,
        position_type: position.key,
        pin_code: pinCode,
        status: 'PENDING',
      });
      if (err) throw err;
      onSuccess();
    } catch (e: any) {
      setError(e.message || 'Failed to submit application.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        <div className={`w-14 h-14 ${position.bg} rounded-2xl flex items-center justify-center mb-4`}>
          <Icon className={`w-7 h-7 ${position.color}`} />
        </div>
        <h3 className="text-lg font-black text-[#232F46]">Apply for {position.label}</h3>
        <p className="text-sm text-gray-500 mt-1">{position.description}</p>

        <div className={`mt-4 p-3 ${position.bg} border ${position.border} rounded-xl`}>
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-0.5">Claiming Territory</p>
          <p className="text-base font-black text-[#232F46]">PIN Code: {pinCode}</p>
        </div>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">
            This application will be reviewed by an Admin. If the territory is already occupied, the Admin may override the current holder.
          </p>
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>
        )}

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            disabled={applying}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={applying}
            className={`flex-1 py-2.5 bg-[#232F46] text-white font-bold rounded-xl hover:bg-[#1a2333] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60`}
          >
            {applying ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</> : 'Submit Application'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function RoyaltyApplicationsPage() {
  const [loading, setLoading] = useState(true);
  const [eligibleLevel, setEligibleLevel] = useState(0);
  const [pinCode, setPinCode] = useState<string | null>(null);
  const [myApplications, setMyApplications] = useState<Record<string, any>>({});
  const [myPositions, setMyPositions] = useState<Record<string, any>>({});
  const [applyingFor, setApplyingFor] = useState<typeof POSITIONS[0] | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Run all queries in parallel
      const [levelResult, profileResult, appsResult, positionsResult] = await Promise.all([
        supabase.rpc('get_eligible_levels', { p_member_uuid: user.id }),
        supabase.from('member_profile').select('pin_code').eq('id', user.id).maybeSingle(),
        supabase.from('royalty_applications').select('position_type, status, pin_code').eq('member_uuid', user.id),
        supabase.from('territory_positions').select('position_type, pin_code, status').eq('member_uuid', user.id).eq('status', 'ACTIVE'),
      ]);

      setEligibleLevel(levelResult.data || 0);
      setPinCode(profileResult.data?.pin_code || null);

      // Index applications by position_type
      const appsMap: Record<string, any> = {};
      (appsResult.data || []).forEach((a: any) => { appsMap[a.position_type] = a; });
      setMyApplications(appsMap);

      // Index active positions
      const posMap: Record<string, any> = {};
      (positionsResult.data || []).forEach((p: any) => { posMap[p.position_type] = p; });
      setMyPositions(posMap);
    } catch (e) {
      console.error('Error loading royalty data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSuccess = () => {
    setApplyingFor(null);
    setSuccessMsg('Application submitted successfully! Awaiting Admin review.');
    fetchData();
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Royalty Applications"
        description="Apply for a Sevak position and earn royalty income from activations in your territory."
        breadcrumbs={[{ label: 'Business' }, { label: 'Royalty Applications' }]}
      />

      {/* Success banner */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-800">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PIN Code Warning */}
      {!loading && !pinCode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800">PIN Code Required</p>
            <p className="text-xs text-amber-700 mt-0.5">
              You must add your PIN Code in <a href="/account/profile-settings" className="underline font-semibold">Profile Settings</a> before applying for a Sevak position.
            </p>
          </div>
        </div>
      )}

      {/* Level Status Banner */}
      <div className="bg-[#232F46] text-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#ED8C32]/20 flex items-center justify-center shrink-0">
            <Trophy className="w-7 h-7 text-[#ED8C32]" />
          </div>
          <div>
            <p className="text-xs text-white/50 uppercase font-bold tracking-wider">Your Current Level</p>
            <p className="text-2xl font-black">Level {eligibleLevel}</p>
            <p className="text-xs text-white/60 mt-0.5">
              {eligibleLevel >= 10 ? 'All positions unlocked!' : `Reach Level ${eligibleLevel < 3 ? 3 : eligibleLevel < 5 ? 5 : eligibleLevel < 8 ? 8 : 10} to unlock the next position.`}
            </p>
          </div>
          {pinCode && (
            <div className="ml-auto text-right">
              <p className="text-xs text-white/50 uppercase font-bold tracking-wider">Your PIN Code</p>
              <p className="text-lg font-black font-mono text-[#ED8C32]">{pinCode}</p>
            </div>
          )}
        </div>
      </div>

      {/* Position Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-52 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POSITIONS.map((pos) => {
            const Icon = pos.icon;
            const isUnlocked = eligibleLevel >= pos.requiredLevel;
            const hasPendingApp = myApplications[pos.key]?.status === 'PENDING';
            const hasRejectedApp = myApplications[pos.key]?.status === 'REJECTED';
            const isActiveHolder = !!myPositions[pos.key];

            return (
              <Card key={pos.key} className={`flex flex-col gap-4 ${!isUnlocked ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 ${pos.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${pos.color}`} />
                    </div>
                    <div>
                      <h3 className="font-black text-[#232F46]">{pos.label}</h3>
                      <p className="text-xs text-gray-500">{pos.sublabel}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${pos.badgeColor}`}>
                    {pos.royalty} Royalty
                  </span>
                </div>

                <p className="text-xs text-gray-500">{pos.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
                  <span className="font-semibold">
                    Requires: <span className="text-[#232F46]">Level {pos.requiredLevel}+</span>
                  </span>
                  {isUnlocked
                    ? <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Eligible</span>
                    : <span className="text-gray-400 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Locked</span>
                  }
                </div>

                {/* Action area */}
                <div className="mt-auto">
                  {isActiveHolder ? (
                    <div className="flex items-center gap-2 py-2.5 px-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-700">Active Sevak — PIN {myPositions[pos.key].pin_code}</span>
                    </div>
                  ) : hasPendingApp ? (
                    <div className="flex items-center gap-2 py-2.5 px-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-bold text-amber-700">Application Pending Review</span>
                    </div>
                  ) : (
                    <button
                      disabled={!isUnlocked || !pinCode}
                      onClick={() => setApplyingFor(pos)}
                      className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
                        isUnlocked && pinCode
                          ? `${pos.bg} ${pos.color} border ${pos.border} hover:opacity-80`
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {!isUnlocked ? 'Locked' : !pinCode ? 'Set PIN Code First' : hasRejectedApp ? 'Reapply' : 'Apply Now'}
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Info card */}
      <Card className="bg-gray-50 border-gray-100">
        <h3 className="font-bold text-[#232F46] text-sm flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-[#ED8C32]" /> How Royalty Income Works
        </h3>
        <ul className="space-y-1.5 text-xs text-gray-500 list-disc pl-4">
          <li>When any member in your PIN Code area activates, royalty income is automatically distributed to all active Sevaks.</li>
          <li>Only one member can hold each Sevak position per PIN Code at a time.</li>
          <li>If Admin approves a new applicant for your territory, you will be notified and the position will be transferred.</li>
          <li>Royalty earnings appear in your Wallet and Income Ledger under "Royalty Income".</li>
        </ul>
      </Card>

      {/* Apply Modal */}
      <AnimatePresence>
        {applyingFor && pinCode && (
          <ApplyModal
            position={applyingFor}
            pinCode={pinCode}
            onClose={() => setApplyingFor(null)}
            onSuccess={handleSuccess}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
