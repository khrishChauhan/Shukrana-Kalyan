import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { UploadCloud, FileText } from 'lucide-react';

export default function RequestAssistancePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Request Assistance"
        description="Apply for financial aid or welfare support from the foundation."
        breadcrumbs={[{ label: 'Welfare Support' }, { label: 'Request Assistance' }]}
      />

      <Card>
        <form className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select 
              label="Assistance Category"
              options={[
                { value: 'medical', label: 'Medical Emergency' },
                { value: 'education', label: 'Education Support' },
                { value: 'marriage', label: 'Marriage Assistance' },
                { value: 'other', label: 'Other' },
              ]}
            />
            <Input label="Required Amount (₹)" type="number" placeholder="0.00" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide">Detailed Description</label>
            <textarea 
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#232F46] p-4 outline-none focus:bg-white focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] transition-colors"
              placeholder="Please explain why you need this assistance..."
            ></textarea>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <label className="block text-sm font-bold text-[#232F46]">Supporting Documents (Optional)</label>
            <div className="relative">
              <input type="file" accept="image/*,.pdf" id="support-doc" className="hidden" />
              <label 
                htmlFor="support-doc" 
                className="flex flex-col items-center justify-center w-full py-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-[#232F46]">Upload Medical Bills / Estimates</span>
                <span className="text-xs text-gray-500 mt-1">JPEG, PNG, PDF up to 5MB</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="button" size="lg" leftIcon={<FileText className="w-4 h-4" />}>
              Submit Application
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
