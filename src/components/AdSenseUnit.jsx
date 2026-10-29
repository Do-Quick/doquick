import React, { useEffect } from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

export default function AdSenseUnit({ 
  adClient = "ca-pub-3172721162962009", 
  adSlot = "3413249860",
  className = "" 
}) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window.adsbygoogle = window.adsbygoogle || [])).push({});
      }
    } catch {
      // AdSense script initializing or adblock active
    }
  }, []);

  return (
    <div className={`w-full max-w-[1440px] mx-auto my-6 px-4 sm:px-8 lg:px-12 ${className}`}>
      <div className="relative rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 text-center overflow-hidden transition-colors">
        
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">
          <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Sponsor</span>
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">Supports Free Open-Source Development</span>
        </div>

        {/* Live Google AdSense container */}
        <div className="min-h-[90px] flex items-center justify-center relative z-10 overflow-hidden">
          <ins 
            className="adsbygoogle"
            style={{ display: 'block', minHeight: '90px', width: '100%' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {/* Fallback Banner */}
        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>All tools on doquick are 100% free and open-source under MIT license.</span>
          </div>
          <a
            href="https://github.com/Do-Quick"
            target="_blank"
            rel="noreferrer"
            className="text-purple-600 dark:text-purple-400 hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>Do-Quick on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
