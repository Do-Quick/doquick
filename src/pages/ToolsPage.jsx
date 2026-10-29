import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  ExternalLink, 
  Code2, 
  Star, 
  Wrench 
} from 'lucide-react';
import { TOOLS_DATA, CATEGORIES } from '../data/toolsData';
import AdSenseUnit from '../components/AdSenseUnit';

export default function ToolsPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter tools
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchCat = selectedCategory === 'All' || tool.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.shortDesc.toLowerCase().includes(q) ||
        tool.seoKeywords?.some((k) => k.toLowerCase().includes(q)) ||
        tool.technologies.some((t) => t.name.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full pb-14">
      
      {/* Page Header */}
      <section className="w-full max-w-[1440px] mx-auto pt-8 sm:pt-12 pb-8 px-4 sm:px-8 lg:px-12 text-center border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold mb-3">
          <Wrench className="w-3.5 h-3.5" />
          <span>Tools Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
          Published Open-Source Tools
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Launch free production-ready web tools built by <strong>Do-Quick</strong>. 
          Use online with zero login, or inspect the code and self-host.
        </p>
      </section>

      {/* Directory Filter & Search */}
      <section className="w-full max-w-[1440px] mx-auto py-8 px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search published tools..."
              className="w-full pl-10 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Tools Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-200"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {tool.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md font-bold">
                      ● {tool.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{tool.stars}</span>
                    </span>
                    <span>•</span>
                    <span className="text-slate-500 dark:text-slate-400">{tool.version}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <Link to={`/tool/${tool.id}`} className="group block mb-2.5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center justify-between">
                    <span>{tool.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-all" />
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 mt-0.5">
                    {tool.tagline}
                  </p>
                </Link>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  {tool.shortDesc}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tool.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-3">
                <Link
                  to={`/tool/${tool.id}`}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition"
                >
                  <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>View Details</span>
                </Link>

                <a
                  href={tool.liveUrl}
                  target={tool.liveUrl.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 transition"
                >
                  <span>Launch Tool</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* AdSense Unit */}
      <AdSenseUnit />

    </div>
  );
}
