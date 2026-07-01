import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Settings, Save, AlertCircle, RefreshCw, Power, Server } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';

interface SystemSetting {
  key: string;
  value: any;
  description: string;
}

export default function AdminBusinessSettingsPage() {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Record<string, any>>({});

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('key');
      if (error) throw error;
      
      setSettings(data || []);
      
      // Initialize form state
      const initial: Record<string, any> = {};
      data?.forEach(s => {
        initial[s.key] = s.key === 'REGISTRATION_ENABLED' || s.key === 'MAINTENANCE_MODE' 
          ? s.value.enabled 
          : s.value.percentage ?? s.value.amount;
      });
      setFormData(initial);

    } catch (e: any) {
      console.error('Failed to fetch settings:', e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async (key: string) => {
    const val = formData[key];
    if (val === undefined) return;

    if (!window.confirm(`Are you sure you want to update ${key}? This will be logged in the audit trail.`)) return;

    setSavingKey(key);
    try {
      let payload;
      if (key === 'REGISTRATION_ENABLED' || key === 'MAINTENANCE_MODE') {
        payload = { enabled: Boolean(val) };
      } else if (key.includes('PERCENTAGE')) {
        payload = { percentage: Number(val) };
      } else {
        payload = { amount: Number(val) };
      }

      const { error } = await supabase.rpc('admin_update_setting', {
        p_key: key,
        p_value: payload
      });

      if (error) throw error;
      alert(`${key} updated successfully!`);
      fetchSettings();
    } catch (e: any) {
      alert(`Error updating setting: ${e.message}`);
    } finally {
      setSavingKey(null);
    }
  };

  const getSettingTitle = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const isToggle = (key: string) => key === 'REGISTRATION_ENABLED' || key === 'MAINTENANCE_MODE';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-5xl mx-auto pb-10"
    >
      <PageHeader
        title="System Administration"
        description="Dynamically configure operational rules and platform toggles."
        breadcrumbs={[{ label: 'Administration' }, { label: 'Settings' }]}
        action={
          <Button leftIcon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />} variant="outline" onClick={fetchSettings}>
            Reload Config
          </Button>
        }
      />

      <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex gap-3 text-red-800 text-sm mb-6">
        <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
        <p>
          <strong>Security Notice:</strong> Core MLM structural logic (like Business Volume and Matching Ratios) are strictly protected by the backend. 
          Only dynamic financial levers and operational toggles are exposed here. All changes are immutably logged to the Audit & Security module.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="w-full h-8 mb-4" />
              <Skeleton className="w-full h-12 mb-4" />
              <Skeleton className="w-24 h-10 ml-auto" />
            </Card>
          ))
        ) : (
          settings.map(setting => (
            <Card key={setting.key} className="flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-gray-100 p-2 rounded-lg shrink-0">
                  {isToggle(setting.key) ? <Power className="w-5 h-5 text-gray-500" /> : <Settings className="w-5 h-5 text-gray-500" />}
                </div>
                <div>
                  <h3 className="font-bold text-[#232F46]">{getSettingTitle(setting.key)}</h3>
                  <p className="text-xs text-gray-500">{setting.description}</p>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                {isToggle(setting.key) ? (
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30"
                    value={formData[setting.key]?.toString() || 'false'}
                    onChange={e => setFormData(prev => ({ ...prev, [setting.key]: e.target.value === 'true' }))}
                  >
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                  </select>
                ) : (
                  <div className="relative">
                    <Input
                      type="number"
                      value={formData[setting.key] || ''}
                      onChange={e => setFormData(prev => ({ ...prev, [setting.key]: e.target.value }))}
                      leftIcon={
                        <span className="text-gray-400 text-sm">
                          {setting.key.includes('PERCENTAGE') ? '%' : '₹'}
                        </span>
                      }
                    />
                  </div>
                )}
                
                <div className="flex justify-end pt-2">
                  <Button 
                    size="sm"
                    variant="primary" 
                    leftIcon={<Save className="w-4 h-4" />}
                    onClick={() => handleSave(setting.key)}
                    disabled={savingKey === setting.key}
                  >
                    {savingKey === setting.key ? 'Saving...' : 'Update Setting'}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Card className="mt-8 bg-gray-900 border-gray-800 text-white">
        <div className="flex items-start gap-4">
          <div className="bg-red-500/20 p-3 rounded-xl">
            <Server className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Developer Utilities</h3>
            <p className="text-sm text-gray-400 mb-4">
              These functions directly interface with the Postgres schema cache. They are strictly disabled in production environments.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white" onClick={() => alert('Disabled in this environment.')}>
                Reload Schema Cache
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
