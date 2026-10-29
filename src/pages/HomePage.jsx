import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Code2, 
  Zap, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  Check, 
  Wrench,
  Globe
} from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import AdSenseUnit from '../components/AdSenseUnit';

export default function HomePage() {
  const featuredTool = TOOLS_DATA.find((t) => t.featured) || TOOLS_DATA[0];

  return (
    <div className="w-full">
      
      {/* Hero & Motto Section (Full-width responsive container) */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 pb-12 sm:pb-16 text-center">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600 dark:bg-purple-400"></span>
          </span>
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Featured Release: <strong>quickQr</strong> is Live & Open-Source</span>
          <Link 
            to="/tool/quickqr" 
            className="ml-1 text-purple-600 dark:text-purple-400 font-bold hover:underline inline-flex items-center gap-0.5"
          >
            <span>Docs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Main Motto Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900 dark:text-white max-w-5xl mx-auto">
          <span>The Open-Source Forge for </span>
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
            Free Web Utilities.
          </span>
        </h1>

        {/* Platform Motto / Mission Statement */}
        <p className="max-w-3xl mx-auto text-sm sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10">
          <strong>Do-Quick (doquick.in)</strong> publishes high-performance, privacy-first web utilities and developer software. 
          Use every tool online for free with <strong>zero login</strong>, or inspect, clone, and self-host the complete <strong>open-source code</strong>.
        </p>

        {/* Action Buttons - Naturally aligned side-by-side on tablet/desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-12 sm:mb-14 max-w-md sm:max-w-none mx-auto">
          <a
            href={featuredTool.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition hover:scale-105 active:scale-95"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Launch quickQr Generator</span>
          </a>

          <Link
            to="/tools"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2"
          >
            <Wrench className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Explore All Tools</span>
          </Link>
        </div>

        {/* Value Pillars - Full-width 4-column desktop layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 w-full mb-12 sm:mb-16 text-left">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-800 transition">
            <div className="flex items-center gap-2 font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>100% FREE</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Zero paywalls, subscriptions, or accounts</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-800 transition">
            <div className="flex items-center gap-2 font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>MIT LICENSE</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Full source code published on GitHub</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-800 transition">
            <div className="flex items-center gap-2 font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>CLIENT-SIDE</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">In-browser processing, data never leaves</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-800 transition">
            <div className="flex items-center gap-2 font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              <Globe className="w-4 h-4 text-amber-500 shrink-0" />
              <span>DOQUICK.IN</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Official platform by Do-Quick</p>
          </div>
        </div>

        {/* Featured Flagship Project Showcase - Wide screen card */}
        {featuredTool && (
          <div className="w-full rounded-3xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-500/30 p-6 sm:p-8 lg:p-10 text-left shadow-lg">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              
              <div className="space-y-3.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs tracking-wider uppercase">
                    ⭐ Flagship Published Tool
                  </span>
                  <span className="text-xs font-mono text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-2.5 py-0.5 rounded-md font-bold">
                    {featuredTool.version}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {featuredTool.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {featuredTool.name} — {featuredTool.tagline}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {featuredTool.shortDesc}
                </p>

                {/* Key feature list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Free Custom Logo & Color Embedding</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Bulk Barcodes (Code 128, EAN, UPC)</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Printable PDF Grid Sheets & ZIP Export</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>100% Client-Side In-Browser Security</span>
                  </div>
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {featuredTool.technologies.slice(0, 7).map((tech) => (
                    <span 
                      key={tech.name}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-medium text-slate-700 dark:text-slate-300"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-64 shrink-0">
                <a
                  href={featuredTool.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 transition hover:scale-105 active:scale-95 text-center"
                >
                  <span>Launch quickQr Live</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <Link
                  to={`/tool/${featuredTool.id}`}
                  className="w-full px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition text-center shadow-xs"
                >
                  <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>View Details & Source</span>
                </Link>
              </div>

            </div>
          </div>
        )}

      </section>

      {/* AdSense Unit */}
      <AdSenseUnit />

      {/* Platform Architecture & Mission */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2.5">
            How Do-Quick Publishes Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every application published on doquick.in adheres to strict open-source engineering standards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
              1. In-Browser Execution
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Users complete tasks without paywalls or registration. All computations run directly on the user's device with zero remote storage.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
              2. Open-Source Repositories
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Full source code is maintained on GitHub (Do-Quick) with simple setup commands for local developer execution.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
              3. Continuous Publishing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              New utilities built by Do-Quick are published with dedicated documentation and instant web apps right here on doquick.in.
            </p>
          </div>
        </div>
      </section>

      {/* AdSense Unit */}
      <AdSenseUnit />

    </div>
  );
}
