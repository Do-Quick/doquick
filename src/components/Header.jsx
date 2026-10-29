import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, ArrowRight, Sparkles, Menu, X, Wrench } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TOOLS_DATA } from '../data/toolsData';
import logoImg from '../assets/logo.png';
import GithubIcon from './icons/GithubIcon';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Search filter
  const searchResults = searchQuery.trim()
    ? TOOLS_DATA.filter((tool) => {
        const q = searchQuery.toLowerCase();
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.tagline.toLowerCase().includes(q) ||
          tool.category.toLowerCase().includes(q) ||
          tool.seoKeywords?.some((k) => k.toLowerCase().includes(q)) ||
          tool.technologies.some((t) => t.name.toLowerCase().includes(q))
        );
      }).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTool = (toolId) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
    navigate(`/tool/${toolId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSelectTool(searchResults[0].id);
    } else if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setMobileMenuOpen(false);
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/95 dark:bg-[#070b14]/95 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4 sm:gap-6">
        
        {/* Brand & Logo (Strict Rule: Using assets/logo.png directly, no redundant double text) */}
        <Link to="/" className="flex items-center shrink-0 group py-1">
          <img 
            src={logoImg} 
            alt="Do-Quick" 
            className="h-8 sm:h-9 w-auto max-w-[160px] object-contain transition-transform group-hover:scale-105" 
          />
        </Link>

        {/* Global Search Bar (Centered, generous width) */}
        <div ref={searchRef} className="relative flex-1 max-w-lg hidden md:block mx-2">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search tools (e.g. quickQr, barcode, qr with logo)..."
              className="w-full pl-10 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </form>

          {/* Search Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 overflow-hidden z-50 animate-in fade-in duration-100">
              <div className="px-3.5 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Published Tools
              </div>
              {searchResults.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleSelectTool(tool.id)}
                  className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center justify-between group transition cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {tool.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 font-semibold">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-sm mt-0.5">
                      {tool.tagline}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Navigation Items */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Tools Directory */}
          <Link
            to="/tools"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            <Wrench className="w-4 h-4 text-purple-500" />
            <span>Tools</span>
          </Link>

          {/* quickQr direct pill */}
          <Link
            to="/tool/quickqr"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 px-3 py-1.5 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/40 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>quickQr</span>
          </Link>

          {/* GitHub Link */}
          <a
            href="https://github.com/Do-Quick"
            target="_blank"
            rel="noreferrer"
            className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            title="Do-Quick GitHub Organization"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-purple-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl md:hidden text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3.5 space-y-3 animate-in fade-in duration-150">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            />
          </form>

          <div className="flex flex-col gap-1.5 text-xs font-semibold pt-1">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              Home
            </Link>
            <Link 
              to="/tools" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              All Tools Directory
            </Link>
            <Link 
              to="/tool/quickqr" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 font-bold"
            >
              quickQr (QR & Barcode Generator)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
