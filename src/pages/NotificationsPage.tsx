import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Bell, AlertCircle, CheckCircle, Info, Megaphone
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .eq('status', 'PUBLISHED')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAnnouncements(data || []);
      } catch (err: any) {
        toast.error('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' };
      case 'WARNING':
        return { icon: Bell, color: 'text-[#ED8C32]', bg: 'bg-orange-50' };
      case 'INFO':
      default:
        return { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Announcements"
        description="Stay updated with the latest system broadcasts from Administration."
        breadcrumbs={[{ label: 'Account' }, { label: 'Notifications' }]}
      />

      <div className="flex justify-between items-center bg-gray-50 p-4 border border-gray-100 rounded-xl mb-6">
        <p className="text-sm font-bold text-[#232F46] flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-[#ED8C32]" />
          Global Broadcasts
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-gray-500 animate-pulse">Loading announcements...</div>
        ) : announcements.length === 0 ? (
          <div className="p-8 text-center text-gray-400 border border-dashed border-gray-200 rounded-xl">
            No active announcements from Admin at this time.
          </div>
        ) : (
          announcements.map((ann) => {
            const config = getPriorityConfig(ann.priority);
            const Icon = config.icon;
            
            return (
              <Card key={ann.id} className="p-4 flex items-start gap-4 hover:border-[#ED8C32]/30 transition-colors cursor-pointer group border border-gray-100">
                <div className={`p-3 rounded-full shrink-0 ${config.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-[#232F46]">{ann.title}</h4>
                    <span className="text-xs font-medium text-gray-400">
                      {new Date(ann.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{ann.content}</p>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
