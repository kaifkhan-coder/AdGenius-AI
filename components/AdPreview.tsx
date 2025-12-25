
import React from 'react';
import { GeneratedAd, Platform } from '../types';

interface AdPreviewProps {
  ad: GeneratedAd;
}

const AdPreview: React.FC<AdPreviewProps> = ({ ad }) => {
  const [activeCopyIndex, setActiveCopyIndex] = React.useState(0);
  const currentCopy = ad.copy[activeCopyIndex];

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'instagram': return <span className="text-pink-600">Instagram</span>;
      case 'tiktok': return <span className="text-black">TikTok</span>;
      case 'linkedin': return <span className="text-blue-700">LinkedIn</span>;
      default: return <span className="text-blue-600">Facebook</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Preview: {getPlatformIcon(ad.campaign.platform)}</h3>
        <div className="flex gap-2">
          {ad.copy.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveCopyIndex(i)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeCopyIndex === i ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              V{i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[320px] aspect-[9/19] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>

        {/* Content Area */}
        <div className="h-full bg-white relative overflow-y-auto hide-scrollbar">
          {/* Mock App Header */}
          <div className="p-4 flex items-center gap-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
              {ad.campaign.brandName.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{ad.campaign.brandName}</p>
              <p className="text-[10px] text-slate-500">Sponsored</p>
            </div>
          </div>

          {/* Ad Image */}
          <div className="w-full aspect-square bg-slate-100 flex items-center justify-center relative group">
            {ad.imageUrl ? (
              <img src={ad.imageUrl} alt="Ad Visual" className="w-full h-full object-cover" />
            ) : (
              <div className="text-slate-400 text-xs">Generating Visual...</div>
            )}
            <div className="absolute bottom-4 left-4 right-4 py-3 px-4 bg-indigo-600 text-white rounded text-center text-xs font-bold shadow-lg uppercase tracking-wider">
              {currentCopy.cta}
            </div>
          </div>

          {/* Ad Text Content */}
          <div className="p-4 space-y-2">
            <p className="text-sm font-bold text-slate-900">{currentCopy.headline}</p>
            <p className="text-xs text-slate-700 leading-relaxed">{currentCopy.body}</p>
            <div className="flex flex-wrap gap-1">
              {currentCopy.hashtags.map(tag => (
                <span key={tag} className="text-indigo-600 text-[10px] font-medium">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
        <h4 className="text-sm font-bold text-indigo-900 mb-2">Campaign Tip:</h4>
        <p className="text-xs text-indigo-700 italic">
          Based on the "{ad.campaign.tone}" tone, this variation is predicted to perform well for {ad.campaign.targetAudience}. 
          Try scheduling during peak platform engagement hours for maximum reach.
        </p>
      </div>
    </div>
  );
};

export default AdPreview;
