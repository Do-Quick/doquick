import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Flame, 
  Zap, 
  Crown, 
  ChefHat, 
  Share2, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Trophy,
  Activity,
  HeartHandshake
} from 'lucide-react';

const AURA_RANKS = [
  { threshold: 0, title: '🌱 Dormant Aura', color: 'from-slate-400 to-slate-200', border: 'border-slate-500/30', glow: 'rgba(148, 163, 184, 0.2)' },
  { threshold: 500, title: '⚡ High Voltage Aura', color: 'from-amber-400 to-yellow-200', border: 'border-amber-500/40', glow: 'rgba(245, 158, 11, 0.3)' },
  { threshold: 2000, title: '🔥 Sigma Overdrive Aura', color: 'from-rose-500 to-orange-400', border: 'border-rose-500/40', glow: 'rgba(244, 63, 94, 0.35)' },
  { threshold: 5000, title: '💎 Divine Quantum Aura', color: 'from-cyan-400 to-blue-500', border: 'border-cyan-500/40', glow: 'rgba(6, 182, 212, 0.4)' },
  { threshold: 10000, title: '👑 Infinite Cosmic God Aura', color: 'from-purple-400 via-pink-400 to-amber-300', border: 'border-purple-500/50', glow: 'rgba(168, 85, 247, 0.45)' }
];

export default function App() {
  const [aura, setAura] = useState(() => {
    const saved = localStorage.getItem('doquick_aura');
    return saved ? parseInt(saved, 10) : 100;
  });
  const [clicks, setClicks] = useState(0);
  const [floatingParticles, setFloatingParticles] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [autoCooking, setAutoCooking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const audioCtxRef = useRef(null);

  // Sync aura to local storage
  useEffect(() => {
    localStorage.setItem('doquick_aura', aura.toString());
  }, [aura]);

  // Passive auto-cooking aura
  useEffect(() => {
    if (!autoCooking) return;
    const interval = setInterval(() => {
      setAura(prev => prev + (5 * multiplier));
    }, 1000);
    return () => clearInterval(interval);
  }, [autoCooking, multiplier]);

  // Clean up floating particles
  useEffect(() => {
    if (floatingParticles.length === 0) return;
    const timer = setTimeout(() => {
      setFloatingParticles(prev => prev.slice(1));
    }, 900);
    return () => clearTimeout(timer);
  }, [floatingParticles]);

  // Sound generator using Web Audio API
  const playSound = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'milestone') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.25); // G5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        // Crisp aura synth tone
        osc.type = 'sine';
        const baseFreq = 400 + Math.min(clicks * 4, 800);
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
    } catch {
      // Audio fallback silent
    }
  };

  // Determine current rank
  const currentRankIndex = AURA_RANKS.reduce((acc, rank, idx) => {
    return aura >= rank.threshold ? idx : acc;
  }, 0);
  const currentRank = AURA_RANKS[currentRankIndex];
  const nextRank = AURA_RANKS[currentRankIndex + 1];

  // Calculate progress to next rank
  const progressPercent = nextRank 
    ? Math.min(100, Math.max(0, ((aura - currentRank.threshold) / (nextRank.threshold - currentRank.threshold)) * 100))
    : 100;

  // Farm Aura Action
  const handleFarmAura = (e) => {
    const gained = 100 * multiplier;
    const newAura = aura + gained;
    setAura(newAura);
    setClicks(prev => prev + 1);

    // Click audio
    playSound('click');

    // Button push animation
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 120);

    // Particle coordinates
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : 150;
    const y = rect ? e.clientY - rect.top : 75;

    const newParticle = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 20 - 10),
      text: `+${gained} AURA`
    };
    setFloatingParticles(prev => [...prev.slice(-8), newParticle]);

    // Check milestone confetti
    if ((clicks + 1) % 15 === 0 || (nextRank && newAura >= nextRank.threshold && aura < nextRank.threshold)) {
      playSound('milestone');
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#a855f7', '#ec4899', '#38bdf8', '#fbbf24', '#ffffff']
      });
    }
  };

  // Copy Aura stats to clipboard
  const handleCopyAura = () => {
    const text = `⚡ I just farmed ${aura.toLocaleString()} AURA on doquick!\nRank: ${currentRank.title}\nCooking something crazy at doquick. Farm your aura now!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShareTwitter = () => {
    const tweet = `I just farmed ${aura.toLocaleString()} AURA on doquick! 🍳 They are cooking something crazy to increase the aura. Farm yours now!`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between overflow-x-hidden select-none">
      
      {/* Dynamic Background Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[550px] rounded-full blur-[130px] opacity-40 animate-aura-pulse"
          style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(99, 102, 241, 0.3) 50%, transparent 80%)' }}
        />
        <div 
          className="absolute top-[45%] -left-[15%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-30 animate-aura-spin"
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(139, 92, 246, 0.2) 60%, transparent 80%)' }}
        />
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[550px] h-[550px] rounded-full blur-[150px] opacity-35"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.2) 60%, transparent 80%)' }}
        />
        {/* Subtle dot matrix overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      {/* Top Navbar / Aura Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-lg shadow-purple-500/25 border border-purple-400/40">
            <Zap className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent">
              doquick
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-purple-300/80 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Aura Core Online</span>
            </div>
          </div>
        </div>

        {/* Audio & Settings bar */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
            title={soundEnabled ? "Mute Aura Sound" : "Enable Aura Sound"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-purple-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden sm:inline">{soundEnabled ? "Sound On" : "Muted"}</span>
          </button>
          
          <button
            onClick={handleCopyAura}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-950/80 to-slate-900 border border-purple-500/30 text-purple-200 hover:border-purple-400/60 transition shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
            <span>{copied ? "Copied!" : "Copy Aura"}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto w-full text-center">
        
        {/* Cooking Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 shadow-lg shadow-purple-950/50 backdrop-blur-md mb-6 animate-float-glow">
          <ChefHat className="w-4 h-4 text-pink-400 animate-bounce" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
            We are cooking something crazy
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
        </div>

        {/* Primary Hero Header */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-5">
          <span className="block text-slate-100">Welcome to</span>
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm">
            doquick
          </span>
        </h1>

        {/* Exact Core Message Display Banner */}
        <div className="relative max-w-2xl mx-auto mb-8 p-6 rounded-2xl bg-slate-900/70 border border-purple-500/20 backdrop-blur-xl shadow-2xl shadow-purple-950/40">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-950 border border-purple-500/40 text-[11px] font-semibold tracking-wider text-purple-300 uppercase">
            Official Broadcast
          </div>
          
          <p className="text-lg sm:text-2xl font-medium text-slate-200 leading-relaxed tracking-wide">
            "wel come to <span className="text-purple-400 font-semibold">doquick</span> we are cooking some thing crazy to increase the aura please wait and farm you aura thak you"
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>High-Energy Aura Cultivation in Progress</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>

        {/* Live Aura Reactor & Interactive Farming Stage */}
        <div className="w-full max-w-xl mx-auto flex flex-col items-center">
          
          {/* Aura Score & Rank Card */}
          <div className="w-full bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 mb-6 backdrop-blur-md shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
              <div className="text-left">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                  Current Farmed Aura
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
                    {aura.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-purple-400">AURA</span>
                </div>
              </div>

              {/* Rank Badge */}
              <div className={`px-3.5 py-1.5 rounded-xl border ${currentRank.border} bg-slate-950/70 shadow-sm flex items-center gap-2`}>
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className={`text-xs sm:text-sm font-bold bg-gradient-to-r ${currentRank.color} bg-clip-text text-transparent`}>
                  {currentRank.title}
                </span>
              </div>
            </div>

            {/* Rank Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>Progress to {nextRank ? nextRank.title : 'Supreme Divinity'}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800/80">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Aura Farmer Core Button */}
          <div className="relative flex flex-col items-center justify-center my-2">
            
            {/* Pulsing ambient halo around button */}
            <div 
              className="absolute w-56 h-56 rounded-full blur-2xl opacity-60 transition-all duration-300 pointer-events-none"
              style={{ backgroundColor: currentRank.glow }}
            />

            {/* Floating Particle Numbers */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {floatingParticles.map(p => (
                <div
                  key={p.id}
                  className="absolute animate-pop-float font-mono font-extrabold text-sm sm:text-base text-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.8)] pointer-events-none z-30"
                  style={{ left: `${p.x}px`, top: `${p.y}px` }}
                >
                  {p.text}
                </div>
              ))}
            </div>

            {/* Main Interactive Button */}
            <button
              onClick={handleFarmAura}
              className={`relative z-20 group cursor-pointer flex flex-col items-center justify-center w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-b from-purple-600 via-purple-800 to-slate-950 border-4 border-purple-400/50 shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_70px_rgba(236,72,153,0.6)] active:scale-95 transition-all duration-150 ${
                isPressing ? 'scale-90 ring-4 ring-pink-500/50' : 'hover:scale-105'
              }`}
            >
              {/* Inner glowing ring */}
              <div className="absolute inset-2 rounded-full border border-purple-300/30 pointer-events-none" />
              
              <div className="relative flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-9 h-9 text-amber-300 fill-amber-300 filter drop-shadow-[0_0_12px_rgba(252,211,77,0.8)] animate-pulse" />
                </div>
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase drop-shadow-md">
                  FARM AURA
                </span>
                <span className="text-xs font-semibold text-purple-200/90 tracking-wide">
                  +{100 * multiplier} AURA / Click
                </span>
              </div>
            </button>
          </div>

          {/* Farming Modifiers & Power-ups */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-8">
            <button
              onClick={() => {
                if (aura >= 1000) {
                  setAura(a => a - 1000);
                  setMultiplier(m => m + 1);
                  playSound('milestone');
                }
              }}
              className={`p-3 rounded-xl border text-left transition ${
                aura >= 1000 
                  ? 'bg-purple-950/40 border-purple-500/40 hover:border-purple-400 text-purple-200 cursor-pointer' 
                  : 'bg-slate-950/40 border-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span>⚡ Multiplier</span>
                <span className="font-mono text-amber-400">x{multiplier}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Upgrade: 1,000 Aura
              </div>
            </button>

            <button
              onClick={() => {
                setAutoCooking(!autoCooking);
                playSound('click');
              }}
              className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                autoCooking 
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200' 
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span>🍳 Auto-Cook</span>
                <span className={autoCooking ? "text-emerald-400 font-bold" : "text-slate-500"}>
                  {autoCooking ? "ON" : "OFF"}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                +{(5 * multiplier)} Aura/sec
              </div>
            </button>

            <button
              onClick={handleShareTwitter}
              className="p-3 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-sky-500/40 hover:bg-sky-950/30 text-slate-300 hover:text-sky-200 transition text-left cursor-pointer col-span-2 sm:col-span-1"
            >
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span>📢 Share Aura</span>
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <div className="text-[11px] text-slate-400">
                Flex to the world
              </div>
            </button>
          </div>

          {/* Reset button subtle */}
          <div className="mt-5 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span>Total clicks: {clicks}</span>
            <span>•</span>
            <button 
              onClick={() => {
                if (window.confirm("Reset your farmed aura back to 100?")) {
                  setAura(100);
                  setMultiplier(1);
                  setClicks(0);
                }
              }}
              className="hover:text-slate-400 underline cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

        </div>

      </main>

      {/* Modern Sleek Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-purple-400" />
          <span>Thank you for being patient while we cook.</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="font-mono text-purple-400/90 font-medium">doquick v1.0.0-aura</span>
          <span>•</span>
          <span>© 2026 doquick. All aura reserved.</span>
        </div>
      </footer>

    </div>
  );
}
