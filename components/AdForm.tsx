
import React from 'react';
import { AdCampaign, Platform } from '../types';

interface AdFormProps {
  onGenerate: (campaign: AdCampaign) => void;
  isLoading: boolean;
}

const AdForm: React.FC<AdFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = React.useState<AdCampaign>({
    id: '',
    brandName: '',
    productDescription: '',
    targetAudience: '',
    goal: 'Conversion',
    platform: 'instagram',
    tone: 'Exciting'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ ...formData, id: Date.now().toString() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Brand Name</label>
        <input
          required
          type="text"
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          placeholder="e.g. Lumina Tech"
          value={formData.brandName}
          onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Product/Service Description</label>
        <textarea
          required
          rows={3}
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          placeholder="What are you selling? What's the value proposition?"
          value={formData.productDescription}
          onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Target Audience</label>
          <input
            required
            type="text"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. Young professionals 25-35"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Campaign Goal</label>
          <select
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          >
            <option>Conversion</option>
            <option>Brand Awareness</option>
            <option>App Installs</option>
            <option>Lead Generation</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Platform</label>
          <select
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
          >
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Brand Tone</label>
          <select
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
          >
            <option>Exciting</option>
            <option>Professional</option>
            <option>Witty</option>
            <option>Empathetic</option>
            <option>Minimalist</option>
          </select>
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
          isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Assets...
          </span>
        ) : (
          'Generate Social Ad'
        )}
      </button>
    </form>
  );
};

export default AdForm;
