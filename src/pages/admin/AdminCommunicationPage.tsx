import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Megaphone, Bell, Users, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';

export default function AdminCommunicationPage() {
  const [activeTab, setActiveTab] = useState<'broadcast' | 'targeted'>('broadcast');
  const [loading, setLoading] = useState(false);

  // Broadcast State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastPriority, setBroadcastPriority] = useState('INFO');
  const [expiresInDays, setExpiresInDays] = useState('7');

  // Targeted State
  const [targetTitle, setTargetTitle] = useState('');
  const [targetMessage, setTargetMessage] = useState('');
  const [targetStatus, setTargetStatus] = useState('');
  const [targetRank, setTargetRank] = useState('');

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastContent) return alert('Title and Content are required.');
    
    if (!window.confirm('Are you sure you want to broadcast this announcement to all members?')) return;

    setLoading(true);
    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + parseInt(expiresInDays));

      const { error } = await supabase.rpc('admin_broadcast_announcement', {
        p_title: broadcastTitle,
        p_content: broadcastContent,
        p_priority: broadcastPriority,
        p_expires_at: expiresAt.toISOString()
      });

      if (error) throw error;
      alert('Announcement broadcasted successfully!');
      setBroadcastTitle('');
      setBroadcastContent('');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTargeted = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetTitle || !targetMessage) return alert('Title and Message are required.');
    
    if (!window.confirm('Send this targeted notification?')) return;

    setLoading(true);
    try {
      const filters: any = {};
      if (targetStatus) filters.status = targetStatus;
      if (targetRank) filters.rank_name = targetRank;

      const { data, error } = await supabase.rpc('admin_send_targeted_notification', {
        p_target_filters: filters,
        p_title: targetTitle,
        p_message: targetMessage,
        p_type: 'SYSTEM'
      });

      if (error) throw error;
      alert(`Notification successfully sent to ${data || 0} members!`);
      setTargetTitle('');
      setTargetMessage('');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-4xl mx-auto pb-10"
    >
      <PageHeader
        title="Communication Center"
        description="Broadcast announcements and send targeted notifications to members."
        breadcrumbs={[{ label: 'Administration' }, { label: 'Communication' }]}
      />

      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('broadcast')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'broadcast' 
              ? 'border-[#ED8C32] text-[#ED8C32]' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4" /> Global Broadcast
          </div>
        </button>
        <button
          onClick={() => setActiveTab('targeted')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'targeted' 
              ? 'border-[#ED8C32] text-[#ED8C32]' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" /> Targeted Notification
          </div>
        </button>
      </div>

      {activeTab === 'broadcast' ? (
        <Card>
          <form onSubmit={handleBroadcast} className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-800 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-blue-500" />
              <p>Broadcast announcements appear globally on every member's dashboard until they expire.</p>
            </div>

            <div className="space-y-4">
              <Input
                label="Announcement Title"
                placeholder="e.g., System Maintenance Scheduled"
                value={broadcastTitle}
                onChange={e => setBroadcastTitle(e.target.value)}
                required
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#232F46]">Content</label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30 focus:border-[#ED8C32]/50 transition-all min-h-[120px]"
                  placeholder="Type the announcement details here..."
                  value={broadcastContent}
                  onChange={e => setBroadcastContent(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-[#232F46]">Priority</label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30"
                    value={broadcastPriority}
                    onChange={e => setBroadcastPriority(e.target.value)}
                  >
                    <option value="INFO">Info</option>
                    <option value="WARNING">Warning</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-[#232F46]">Expires In (Days)</label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30"
                    value={expiresInDays}
                    onChange={e => setExpiresInDays(e.target.value)}
                  >
                    <option value="1">1 Day</option>
                    <option value="3">3 Days</option>
                    <option value="7">7 Days</option>
                    <option value="30">30 Days</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <Button type="submit" variant="primary" leftIcon={<Megaphone className="w-4 h-4" />} disabled={loading}>
                {loading ? 'Publishing...' : 'Publish Announcement'}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card>
          <form onSubmit={handleTargeted} className="space-y-6">
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex gap-3 text-purple-800 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-purple-500" />
              <p>Targeted notifications appear in the specific member's notification bell. Use filters to target subsets, or leave filters blank to message everyone.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#232F46]">Target Status (Optional)</label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30"
                  value={targetStatus}
                  onChange={e => setTargetStatus(e.target.value)}
                >
                  <option value="">Any Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="PENDING">Pending</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#232F46]">Target Rank (Optional)</label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30"
                  value={targetRank}
                  onChange={e => setTargetRank(e.target.value)}
                >
                  <option value="">Any Rank</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <Input
                label="Notification Title"
                placeholder="e.g., Action Required: Update your KYC"
                value={targetTitle}
                onChange={e => setTargetTitle(e.target.value)}
                required
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#232F46]">Message</label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30 focus:border-[#ED8C32]/50 transition-all min-h-[100px]"
                  placeholder="Type the personal notification here..."
                  value={targetMessage}
                  onChange={e => setTargetMessage(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <Button type="submit" variant="primary" leftIcon={<Send className="w-4 h-4" />} disabled={loading}>
                {loading ? 'Sending...' : 'Send Notification'}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </motion.div>
  );
}
