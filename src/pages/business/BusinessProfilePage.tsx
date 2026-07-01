import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { supabase } from '../../lib/supabase';

export default function BusinessProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch core member data
        const { data: member } = await supabase
          .from('members')
          .select('member_id, status, created_at, updated_at')
          .eq('id', user.id)
          .single();

        // Fetch business data
        const { data: business } = await supabase
          .from('member_business')
          .select('sponsor_member_uuid, placement_parent_uuid, total_left_bv, total_right_bv')
          .eq('id', user.id)
          .single();

        let sponsorId = 'N/A';
        let placementId = 'N/A';
        let placementParentName = 'N/A';

        if (business) {
          if (business.sponsor_member_uuid) {
            const { data: sponsor } = await supabase.from('members').select('member_id').eq('id', business.sponsor_member_uuid).single();
            if (sponsor) sponsorId = sponsor.member_id;
          }
          if (business.placement_parent_uuid) {
            const { data: pMem } = await supabase.from('members').select('member_id').eq('id', business.placement_parent_uuid).single();
            const { data: pProf } = await supabase.from('member_profile').select('full_name').eq('id', business.placement_parent_uuid).single();
            if (pMem) placementId = pMem.member_id;
            if (pProf) placementParentName = pProf.full_name;
          }
        }

        // Network metrics
        let totalDirects = 0;
        let totalTeam = 0;

        const { data: directsData } = await supabase.from('members').select('id').eq('sponsor_id', user.id);
        if (directsData) totalDirects = directsData.length;

        const { data: teamData } = await supabase.rpc('get_my_downline', {
          p_root_uuid: user.id,
          p_filter: 'ALL'
        });
        if (teamData) totalTeam = teamData.length;

        setProfile({
          memberId: member?.member_id || '',
          status: member?.status || 'PENDING',
          joinDate: new Date(member?.created_at).toLocaleDateString(),
          activationDate: member?.status === 'ACTIVE' ? new Date(member?.updated_at).toLocaleDateString() : 'Pending',
          rank: 'Member',
          sponsorId,
          placementId,
          placementParentName,
          totalDirectMembers: totalDirects,
          totalTeamMembers: totalTeam,
          leftBv: business?.total_left_bv || 0,
          rightBv: business?.total_right_bv || 0
        });

      } catch (err) {
        console.error('Error fetching business profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto pb-10 space-y-6 animate-pulse">
        <div className="h-24 bg-gray-200 rounded-2xl"></div>
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="My Business Profile"
        description="Your core business identity, placement details, and network metrics."
        breadcrumbs={[{ label: 'Business' }, { label: 'Profile' }]}
      />

      <Card className="border-t-4" style={{ borderTopColor: '#232F46' }}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#232F46]">Business Identity</h2>
            <p className="text-sm text-gray-500">Core registration details</p>
          </div>
          <StatusBadge status={profile.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Member ID</p>
            <p className="text-lg font-mono font-bold text-[#232F46]">{profile.memberId}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Rank</p>
            <p className="text-lg font-bold text-[#ED8C32]">{profile.rank}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Join Date</p>
            <p className="text-base font-medium text-[#232F46]">{profile.joinDate}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Activation Date</p>
            <p className="text-base font-medium text-[#232F46]">{profile.activationDate}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-[#232F46] mb-6">Placement & Sponsorship</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-100 rounded-lg p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sponsor ID</p>
            <p className="text-base font-mono font-bold text-[#232F46]">{profile.sponsorId}</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Placement ID</p>
            <p className="text-base font-mono font-bold text-[#232F46]">{profile.placementId}</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-4 md:col-span-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Placement Parent</p>
            <p className="text-base font-medium text-[#232F46]">{profile.placementParentName}</p>
          </div>
        </div>
      </Card>

    </motion.div>
  );
}
