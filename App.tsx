
import React, { useState, useCallback } from 'react';
import { AdCampaign, GeneratedAd } from './types';
import { geminiService } from './services/geminiService';
import AdForm from './components/AdForm';
import AdPreview from './components/AdPreview';
import PerformanceChart from './components/PerformanceChart';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAd, setCurrentAd] = useState<GeneratedAd | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (campaign: AdCampaign) => {
    setIsLoading(true);
    setError(null);
    try {
      // Run both in parallel for efficiency
      const [copy, imageUrl] = await Promise.all([
        geminiService.generateAdCopy(campaign),
        geminiService.generateAdImage(campaign)
      ]);

      if (copy.length === 0) throw new Error("Could not generate ad copy.");
      
      setCurrentAd({
        id: campaign.id,
        campaign,
        copy,
        imageUrl: imageUrl || 'https://picsum.photos/800/800', // Fallback
        createdAt: Date.now()
      });
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate ad. Please check your API key and network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-morphism sticky top-0 z-50 px-6 py-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl">A</div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">AdGenius <span className="text-indigo-600">AI</span></h1>
          </div>
          <nav className="hidden md:flex gap-8 items-center text-sm font-semibold text-slate-600">
            <a href="#" className="text-indigo-600">Dashboard</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Campaigns</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Assets</a>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md">
              Upgrade
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Section */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Create Your Campaign</h2>
              <p className="text-slate-500">Fill in your brand details and let Gemini AI craft the perfect social ad.</p>
            </div>
            <AdForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            {!currentAd && !isLoading ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 rounded-[2rem] bg-white/50">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Your Ad Preview will appear here</h3>
                <p className="text-slate-500 max-w-sm">Complete the form on the left to generate high-performing ad copy and visuals using state-of-the-art AI.</p>
              </div>
            ) : isLoading ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                   <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 animate-pulse">AI</div>
                   </div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800">Thinking creatively...</p>
                  <p className="text-slate-500">Generating copy variations and visual assets.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                <div className="space-y-8">
                  <AdPreview ad={currentAd!} />
                </div>
                <div className="space-y-8">
                  <PerformanceChart />
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Export Assets</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <button className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                        <span className="text-sm font-semibold text-slate-700">Download High-Res Visual</span>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </button>
                      <button className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                        <span className="text-sm font-semibold text-slate-700">Copy Ad Copy JSON</span>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                      </button>
                      <button className="w-full py-4 mt-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg active:scale-[0.98]">
                        Push to {currentAd?.campaign.platform}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white font-black text-lg">A</div>
            <p className="font-bold text-slate-900">AdGenius AI Studio</p>
          </div>
          <div className="flex gap-12">
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-800">Platform</p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                <li><a href="#" className="hover:text-indigo-600">API</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-800">Company</p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li><a href="#" className="hover:text-indigo-600">About</a></li>
                <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
