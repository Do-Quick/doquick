import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Code2 } from 'lucide-react';
import GithubIcon from './icons/GithubIcon';
import logoImg from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070b14] text-slate-600 dark:text-slate-400 text-xs py-10 sm:py-12 transition-colors">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        
        {/* Brand & Motto */}
        <div className="space-y-3 sm:col-span-1">
          <Link to="/" className="flex items-center gap-2 group py-0.5">
            <img src={logoImg} alt="Do-Quick" className="h-7 w-auto object-contain" />
          </Link>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            The open-source platform by Do-Quick for free, high-speed web utilities. 
            Zero subscriptions. Zero login. 100% Client-side privacy on doquick.in.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Open Source (MIT License)</span>
          </div>
        </div>

        {/* Published Tools */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
            Published Tools
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link 
                to="/tool/quickqr" 
                className="hover:text-purple-600 dark:hover:text-purple-400 transition flex items-center gap-1.5 font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>quickQr (QR & Barcode)</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/tools" 
                className="hover:text-purple-600 dark:hover:text-purple-400 transition font-medium"
              >
                All Published Tools →
              </Link>
            </li>
          </ul>
        </div>

        {/* Developers & Source */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
            Developers & Source
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a 
                href="https://github.com/Do-Quick" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-purple-600 dark:hover:text-purple-400 transition flex items-center gap-1.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub (Do-Quick)</span>
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/Do-Quick/quickQr" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-purple-600 dark:hover:text-purple-400 transition flex items-center gap-1.5"
              >
                <Code2 className="w-4 h-4 text-purple-500" />
                <span>quickQr Repository</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Privacy & Trust */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
            Privacy & Trust
          </h4>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 mb-3">
            All generators run in your browser memory on doquick.in. We never store or log your inputs on any server.
          </p>
          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Zero-Storage Client Security</span>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar with Indian Flag & India attribution */}
      <div className="w-full max-w-[1440px] mx-auto pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs px-4 sm:px-8 lg:px-12">
        <div>
          © {new Date().getFullYear()} Do-Quick (doquick.in). Free and open-source software for everyone.
        </div>

        {/* Built with pride in India Attribution with Flag */}
        <div className="flex items-center gap-2">
          <span>Built with pride in</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200">
            {/* Indian Tricolor Flag */}
            <svg 
              className="w-4 h-3 rounded-[2px]" 
              viewBox="0 0 640 480"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path fill="#FF9933" d="M0 0h640v160H0z"/>
              <path fill="#FFFFFF" d="M0 160h640v160H0z"/>
              <path fill="#128807" d="M0 320h640v160H0z"/>
              <circle cx="320" cy="240" r="40" fill="#000088"/>
              <circle cx="320" cy="240" r="34" fill="#FFFFFF"/>
              <circle cx="320" cy="240" r="8" fill="#000088"/>
              <g stroke="#000088" strokeWidth="2">
                <line x1="320" y1="206" x2="320" y2="274"/>
                <line x1="286" y1="240" x2="354" y2="240"/>
                <line x1="296" y1="216" x2="344" y2="264"/>
                <line x1="296" y1="264" x2="344" y2="216"/>
              </g>
            </svg>
            <span>India 🇮🇳</span>
          </span>
          <span>for the world</span>
        </div>
      </div>
    </footer>
  );
}
