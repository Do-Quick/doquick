import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Download, 
  Star, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  FolderTree, 
  Users, 
  AlertCircle
} from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import AdSenseUnit from '../components/AdSenseUnit';
import GithubIcon from '../components/icons/GithubIcon';

export default function ToolDetailPage() {
  const { toolId } = useParams();
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedStepIndex, setCopiedStepIndex] = useState(null);

  const tool = TOOLS_DATA.find(
    (t) => t.id.toLowerCase() === (toolId || '').toLowerCase()
  );

  if (!tool) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
          Tool Not Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          The requested tool "{toolId}" is not in our published directory.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const handleCopyClone = () => {
    navigator.clipboard.writeText(tool.cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleCopyStep = (cmd, index) => {
    navigator.clipboard.writeText(cmd);
    setCopiedStepIndex(index);
    setTimeout(() => setCopiedStepIndex(null), 2000);
  };

  return (
    <div className="w-full pb-16">
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <Link to="/tools" className="hover:text-purple-600 dark:hover:text-purple-400 font-medium flex items-center gap-1 shrink-0">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tools</span>
            </Link>
            <span>/</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{tool.name}</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs shrink-0">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{tool.stars}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>{tool.downloads}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner for this dedicated tool */}
      <section className="w-full max-w-[1440px] mx-auto py-8 sm:py-10 px-4 sm:px-8 lg:px-12">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-sm">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  {tool.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  ● {tool.status}
                </span>
                <span className="px-2 py-0.5 rounded-md text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">
                  {tool.version}
                </span>
                <span className="px-2 py-0.5 rounded-md text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">
                  {tool.license}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  {tool.name}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-purple-600 dark:text-purple-400 mt-1">
                  {tool.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {tool.longDesc}
              </p>

              {/* Clone Command Bar */}
              <div 
                onClick={handleCopyClone}
                className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-slate-700 dark:text-purple-200 cursor-pointer hover:border-purple-400 transition"
                title="Click to copy clone command"
              >
                <div className="flex items-center gap-2 overflow-hidden truncate">
                  <Terminal className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="truncate">{tool.cloneCommand}</span>
                </div>
                <button type="button" className="text-xs text-slate-500 dark:text-slate-400 shrink-0 ml-3">
                  {copiedClone ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 hover:text-purple-600">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </span>
                  )}
                </button>
              </div>

            </div>

            {/* Launch & Action CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-60">
              <a
                href={tool.liveUrl}
                target={tool.liveUrl.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                className="w-full px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition hover:scale-105 active:scale-95 text-center"
              >
                <span>Launch {tool.name} Live</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={tool.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition text-center shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>

              {tool.releaseArchiveUrl && (
                <a
                  href={tool.releaseArchiveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full px-5 py-2.5 rounded-2xl bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition text-center"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ZIP</span>
                </a>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Main Details Sections */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* 1. What We Implemented */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                What We Implemented
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Production features engineered for {tool.name}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {tool.whatWeImplemented.map((feature, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-3"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. How It Works */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                How It Works & Technical Architecture
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Core client-side algorithms and rendering pipelines
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {tool.howItWorks.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2"
              >
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>{item.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Technologies */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Technologies & Dependencies
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Core libraries and toolchains
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {tool.technologies.map((tech) => (
              <div 
                key={tech.name}
                className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    {tech.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold shrink-0">
                    {tech.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* AdSense Unit */}
        <AdSenseUnit />

        {/* 4. How to Download & Run Using GitHub */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                How to Download & Run Using GitHub
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Setup guide for local development
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {tool.downloadGuide.steps.map((step, idx) => (
              <div 
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 font-mono text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3 overflow-hidden truncate">
                  <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <div className="overflow-hidden truncate">
                    <span className="text-slate-800 dark:text-slate-200 font-bold block sm:inline mr-2">
                      {step.command}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-sans text-xs">
                      — {step.description}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyStep(step.command, idx)}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-sans text-xs font-semibold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  {copiedStepIndex === idx ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Codebase Structure */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Project Codebase Structure
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Folder hierarchy and component organization
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-200 dark:bg-slate-950 dark:text-slate-300 font-mono text-xs overflow-x-auto max-w-full border border-slate-800">
            <pre className="whitespace-pre">{tool.fileStructure.join('\n')}</pre>
          </div>
        </section>

        {/* 6. Contributors & License */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Maintainers & Open-Source License
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                MIT Permissive License
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {tool.contributors.map((c, i) => (
              <a
                key={i}
                href={c.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-purple-400 flex items-center justify-between group transition"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {c.name}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {c.role}
                  </span>
                </div>
                <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Free under {tool.license} License.</span>
            </div>
            <a
              href={tool.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
            >
              Report issues on GitHub →
            </a>
          </div>
        </section>

      </div>

    </div>
  );
}
