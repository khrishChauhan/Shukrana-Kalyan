import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Megaphone, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';

export default function AdminCommunicationPage() {
  const [loading, setLoading] = useState(false);

  // Broadcast State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastPriority, setBroadcastPriority] = useState('INFO');
  const [expiresInDays, setExpiresInDays] = useState('7');

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-4xl mx-auto pb-10"
    >
      <PageHeader
        title="Communication Center"
        description="Broadcast announcements to all members globally."
        breadcrumbs={[{ label: 'Administration' }, { label: 'Communication' }]}
      />

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
    </motion.div>
  );
}
