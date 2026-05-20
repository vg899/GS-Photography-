import { useState, useEffect } from 'react';
import { Camera, ShieldAlert, Sparkles, User, ExternalLink, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'user' | 'photographer' | 'admin'>('user');
  const [iframeSrc, setIframeSrc] = useState('/user.html');
  const [syncSignal, setSyncSignal] = useState(0);

  useEffect(() => {
    if (activeTab === 'user') {
      setIframeSrc(`/user.html?sync=${syncSignal}`);
    } else if (activeTab === 'photographer') {
      setIframeSrc(`/photographer.html?sync=${syncSignal}`);
    } else {
      setIframeSrc(`/admin.html?sync=${syncSignal}`);
    }
  }, [activeTab, syncSignal]);

  // Listen to message signals across iframe boundaries to trigger multi-frame synchronizations!
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data === 'sync_required') {
        console.log("Cross-frame update received. Synchronizing portal states...");
        setSyncSignal(prev => prev + 1);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const adminEmails = [
    "Admin@photo.com",
    "Admin1@photo.com",
    "Admin2@photo.com"
  ];

  const photographerEmails = [
    "Photographer@gmail.com",
    "Photographer1@gmail.com",
    "Photographer2@gmail.com",
    "Photographer3@gmail.com",
    "Photographer4@gmail.com",
    "Photographer5@gmail.com"
  ];

  return (
    <div id="gs_photography_simulator" className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* HEADER SECTION */}
      <header className="border-b border-white/10 bg-black/60 px-6 py-4 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#FFD700] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.35)]">
              <Camera className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="tracking-widest text-[#F5F5F5] text-lg font-bold" style={{ fontFamily: "'Georgia', serif" }}>
                GS <span className="text-[#D4AF37]">PHOTOGRAPHY</span>
              </h1>
              <span className="text-[10px] text-[#D4AF37]/80 tracking-widest font-mono uppercase block">
                Luxury Android Super Ecosystem Platform · AI POWERED
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setSyncSignal(prev => prev + 1)}
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#D4AF37]/10 active:bg-[#D4AF37]/20 border border-white/15 text-xs text-[#D4AF37] font-mono flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(212,175,55,0.05)] cursor-pointer"
              title="Force Realtime Sync across Panels"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Force Database Sync
            </button>
          </div>
        </div>
      </header>

      {/* CORE WORKSPACE GRID */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CONTROLLER INFO MODULE (5 cols) */}
        <section className="lg:col-span-5 space-y-6">
          
          {/* INTRO DECK */}
          <div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-bold text-xs tracking-widest uppercase" style={{ fontFamily: "'Georgia', serif" }}>Ecosystem Simulator</h2>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Welcome to the deluxe preview for <strong className="text-white">GS Photography</strong>. This workspace compiles three standalone platforms linked by Firebase and localized realtime sync engines. Use the interactive Android emulator on the right to navigate screens instantaneously!
            </p>
          </div>

          {/* QUICK TERMINAL LAUNCHER LINKS */}
          <div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl p-5 space-y-4">
            <h3 className="text-[#D4AF37] font-semibold text-xs tracking-wider uppercase" style={{ fontFamily: "'Georgia', serif" }}>
              🚀 Standalone Files (Open in Full Tab)
            </h3>
            
            <div className="space-y-2.5">
              <a 
                href="/user.html" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all text-gray-200 group"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  <div className="text-left">
                    <span className="text-xs font-semibold block text-white group-hover:text-[#D4AF37] transition-colors">Client Application</span>
                    <span className="text-[10px] text-gray-400">Selfie Matcher, AI Editing Tools, Bookings</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#D4AF37] transition-colors" />
              </a>

              <a 
                href="/photographer.html" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all text-gray-200 group"
              >
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-[#D4AF37]" />
                  <div className="text-left">
                    <span className="text-xs font-semibold block text-white group-hover:text-[#D4AF37] transition-colors">Artist Terminal</span>
                    <span className="text-[10px] text-gray-400">Media Ingest, Branding Watermark, Invite Codes</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#D4AF37] transition-colors" />
              </a>

              <a 
                href="/admin.html" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all text-gray-200 group"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
                  <div className="text-left">
                    <span className="text-xs font-semibold block text-white group-hover:text-[#D4AF37] transition-colors">Control Core Panel</span>
                    <span className="text-[10px] text-gray-400">Transaction Receipts, Approved Bookings, UPI Rules</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#D4AF37] transition-colors" />
              </a>
            </div>
          </div>

          {/* ROLE-BASED IDENTITY MANUAL */}
          <div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl p-5 space-y-4">
            <h3 className="text-[#D4AF37] font-[#D4AF37] font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5" style={{ fontFamily: "'Georgia', serif" }}>
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Authentication Credentials Manual
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Login within the application using these pre-authorized address formats to trigger Android native role routing configurations:
            </p>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="p-3 bg-black/80 rounded-xl space-y-1.5 border border-white/10 shadow-lg">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block flex items-center gap-1">👑 ADMIN ACCESS</span>
                <p className="text-white text-[11px]">Email: <span className="text-[#D4AF37] font-bold">Admin@photo.com</span></p>
                <p className="text-[10px] text-gray-400">Password: <span className="text-gray-300">Choose any password (e.g. 123456)</span></p>
                <p className="text-[9px] text-gray-500 italic mt-1 font-sans">Redirects autonomously to Admin Clearance Desk.</p>
              </div>

              <div className="p-3 bg-black/80 rounded-xl space-y-1.5 border border-white/10 shadow-lg">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block flex items-center gap-1">📸 PHOTOGRAPHER ACCESS</span>
                <p className="text-white text-[11px]">Email: <span className="text-[#D4AF37] font-bold">Photographer@gmail.com</span></p>
                <p className="text-[10px] text-gray-400">Password: <span className="text-gray-300">Choose any password</span></p>
                <p className="text-[9px] text-gray-500 italic mt-1 font-sans">Redirects autonomously to Photographer Dashboard.</p>
              </div>

              <div className="p-3 bg-black/40 rounded-xl space-y-1 border border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block">👤 NORMAL GENERAL CLIENTS</span>
                <p className="text-[11px] text-gray-400 font-sans leading-relaxed">Any other custom email automatically creates a standard customer file with full database access.</p>
              </div>
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: HIGH FIDELITY ANDROID DEVICE EMULATOR (7 cols) */}
        <section className="lg:col-span-7 flex flex-col items-center">
          
          {/* SIMULATED DEVICE SWITCHER SELECTOR */}
          <div className="flex bg-black/60 border border-white/10 backdrop-blur-xl rounded-xl p-1 mb-6 gap-1 w-full max-w-md shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            <button 
              onClick={() => setActiveTab('user')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg tracking-wider font-mono transition-all duration-200 cursor-pointer ${activeTab === 'user' ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              USER APP
            </button>
            <button 
              onClick={() => setActiveTab('photographer')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg tracking-wider font-mono transition-all duration-200 cursor-pointer ${activeTab === 'photographer' ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              ARTIST APP
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg tracking-wider font-mono transition-all duration-200 cursor-pointer ${activeTab === 'admin' ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              ADMIN PANEL
            </button>
          </div>

          {/* ANDROID DEVICE FRAMING CONTAINER */}
          <div className="relative w-full max-w-[390px] h-[780px] bg-[#050505] rounded-[52px] p-[10px] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.98)] border-[4px] border-[#252525] ring-[8px] ring-[#121212] overflow-hidden select-none">
            
            {/* Screen Notch / Speaker slot */}
            <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 flex items-center justify-around px-3 border border-white/10 shadow-inner">
              <div className="w-1.5 h-1.5 bg-[#1f1f1f] rounded-full"></div>
              <div className="w-14 h-1 bg-[#1a1a1a] rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-[#0a122e] rounded-full border border-[#2d3763] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#D4AF37] rounded-full"></div>
              </div>
            </div>

            {/* Simulated hardware side buttons highlights */}
            <div className="absolute -left-[14px] top-32 w-1.5 h-12 bg-[#2d2d2d] rounded-l border border-black z-10"></div>
            <div className="absolute -left-[14px] top-48 w-1.5 h-16 bg-[#2d2d2d] rounded-l border border-black z-10"></div>
            <div className="absolute -right-[14px] top-40 w-1.5 h-20 bg-[#2d2d2d] rounded-r border border-black z-10"></div>

            {/* EMBEDDED standalone webapp page IFRAME */}
            <div className="w-full h-full rounded-[42px] overflow-hidden bg-black relative border border-white/10">
              <iframe 
                src={iframeSrc}
                className="w-full h-full border-none select-text bg-[#050505]"
                title="GS Photography Live Device Sandbox Viewport"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* White Android bottom navigator pill spacer */}
            <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-28 h-1 bg-[#D4AF37]/50 rounded-full z-50 animate-pulse"></div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/60 py-6 text-center text-xs text-gray-500 font-mono">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 GS Photography LLP. All rights reserved. Crafted with luxury Glassmorphism UI & Biometric AI scanning. Run autonomously on browser engines.</p>
        </div>
      </footer>

    </div>
  );
}
