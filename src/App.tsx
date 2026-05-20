import { useState, useEffect } from 'react';
import { Camera, ShieldAlert, Sparkles, User, ExternalLink, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'user' | 'photographer' | 'admin'>('user');
  const [iframeSrc, setIframeSrc] = useState('/user.html');
  const [syncSignal, setSyncSignal] = useState(0);

  // Parse URL path, hash, or queries on mount/change to auto-select tabs
  useEffect(() => {
    const checkNavigationRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      if (path.includes('admin') || hash.includes('admin') || search.includes('admin')) {
        setActiveTab('admin');
      } else if (path.includes('photographer') || path.includes('artist') || hash.includes('photographer') || hash.includes('artist') || search.includes('photographer') || search.includes('artist')) {
        setActiveTab('photographer');
      } else if (path.includes('user') || path.includes('client') || hash.includes('user') || hash.includes('client') || search.includes('user') || search.includes('client')) {
        setActiveTab('user');
      }
    };

    checkNavigationRoute();
    
    window.addEventListener('hashchange', checkNavigationRoute);
    window.addEventListener('popstate', checkNavigationRoute);
    return () => {
      window.removeEventListener('hashchange', checkNavigationRoute);
      window.removeEventListener('popstate', checkNavigationRoute);
    };
  }, []);

  // Update hash when active tab changes to keep URLs bookmarkable
  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '').toLowerCase();
    if (currentHash !== activeTab) {
      window.history.pushState(null, '', `#${activeTab}`);
    }
  }, [activeTab]);

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

  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div id="gs_photography_simulator" className="h-screen w-screen bg-[#050505] text-[#F5F5F5] flex flex-col font-sans overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      
      {/* MOBILE-FRIENDLY COMPACT FLOATING NAVIGATION HEADER */}
      <header className="border-b border-white/10 bg-black/80 px-4 md:px-6 py-2.5 sm:py-3 z-50 backdrop-blur-xl flex-shrink-0">
        <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-tr from-[#D4AF37] to-[#FFD700] flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.25)]">
              <Camera className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black" />
            </div>
            <div className="text-left">
              <h1 className="tracking-widest text-[#F5F5F5] text-sm sm:text-base font-bold leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                GS <span className="text-[#D4AF37]">PHOTOGRAPHY</span>
              </h1>
              <span className="text-[8px] sm:text-[9px] text-gray-400 tracking-wider font-mono block">
                Ecosystem Hub · AI Super platform
              </span>
            </div>
          </div>
          
          {/* Main Switcher Tabs - FULL WIDTH on mobile */}
          <div className="flex bg-black/60 border border-white/10 rounded-xl p-0.5 gap-0.5 w-full md:w-auto md:min-w-[420px] shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            <button 
              onClick={() => setActiveTab('user')}
              className={`flex-1 py-1.5 sm:py-2 px-2 text-[10px] sm:text-xs font-bold rounded-lg tracking-wider font-mono transition-all duration-200 cursor-pointer ${activeTab === 'user' ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_8px_rgba(212,175,55,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >
              USER APP
            </button>
            <button 
              onClick={() => setActiveTab('photographer')}
              className={`flex-1 py-1.5 sm:py-2 px-2 text-[10px] sm:text-xs font-bold rounded-lg tracking-wider font-mono transition-all duration-200 cursor-pointer ${activeTab === 'photographer' ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_8px_rgba(212,175,55,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >
              ARTIST APP
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-1.5 sm:py-2 px-2 text-[10px] sm:text-xs font-bold rounded-lg tracking-wider font-mono transition-all duration-200 cursor-pointer ${activeTab === 'admin' ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_8px_rgba(212,175,55,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >
              ADMIN PANEL
            </button>
          </div>

          {/* Action Tools */}
          <div className="flex gap-2 w-full sm:w-auto justify-end sm:justify-start">
            <button 
              onClick={() => setShowInfoModal(true)}
              className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-[10px] text-gray-300 font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              title="View login accounts & cheat-sheet manual"
            >
              <User className="w-3.5 h-3.5" />
              Accounts Cheat-Sheet
            </button>

            <button 
              onClick={() => setSyncSignal(prev => prev + 1)}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#D4AF37]/10 active:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[10px] text-[#D4AF37] font-mono flex items-center justify-center gap-1 transition-all cursor-pointer"
              title="Force Database Synchronisation"
            >
              <RotateCcw className="w-3 h-3 animate-spin duration-1000" style={{ animationDuration: '3s' }} />
              Sync DB
            </button>
          </div>
        </div>
      </header>

      {/* FULL EDGE-TO-EDGE HIGH FIDELITY DEVICE PORTFOLIO FRAMEWORK */}
      <main className="flex-1 w-full bg-black relative overflow-hidden flex flex-col">
        <iframe 
          src={iframeSrc}
          className="w-full h-full border-none select-text bg-[#050505]"
          title="GS Photography Live Enterprise Viewport"
          referrerPolicy="no-referrer"
        />
      </main>

      {/* POPUP ACCOUNTS OVERLAY DRAWER/MODAL FOR INSTANT REFERENCE */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0c0c0c] border border-[#D4AF37]/20 rounded-2xl p-5 max-w-md w-full relative space-y-4 shadow-2xl">
            
            <div className="flex justify-between items-center border-b border-white/15 pb-2.5">
              <span className="text-[#D4AF37] text-xs font-bold font-mono tracking-widest flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> ECOSYSTEM MANUAL & CREDENTIALS
              </span>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="text-gray-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
              GS Photography tracks authorization states globally. Login within the emulator using these preconfigured accounts to bypass client modes:
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-black border border-white/5 rounded-xl space-y-1">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#D4AF37] block">👑 CONTROL CENTER ADMIN</span>
                <p className="text-white text-[11px]">Email: <span className="text-yellow-400 font-bold">Admin@photo.com</span></p>
                <p className="text-[10px] text-gray-400">Password: <span className="text-gray-300">Choose any password (e.g., 123456)</span></p>
              </div>

              <div className="p-3 bg-black border border-white/5 rounded-xl space-y-1">
                <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 block">📸 ASSIGNED PHOTOGRAPHER</span>
                <p className="text-white text-[11px]">Email: <span className="text-emerald-400 font-bold">Photographer@gmail.com</span></p>
                <p className="text-[10px] text-gray-400">Password: <span className="text-gray-300">Choose any password</span></p>
              </div>

              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-gray-500 text-[10px] leading-relaxed">
                <span className="text-[8px] uppercase font-bold tracking-widest text-gray-500 block mb-0.5">👤 CLIENT DEMO ACCOUNT</span>
                Signup or punch in any other email directly inside the client application to auto-generate customized database structures!
              </div>
            </div>

            <button 
              onClick={() => setShowInfoModal(false)}
              className="w-full py-2 bg-[#D4AF37] hover:bg-amber-500 active:bg-amber-600 font-bold text-black border-none text-[10px] uppercase rounded-xl duration-150 tracking-widest font-mono cursor-pointer"
            >
              Acknowledge & Continue
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
