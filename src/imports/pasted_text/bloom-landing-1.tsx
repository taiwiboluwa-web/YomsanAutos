import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  Wand2, 
  BookOpen, 
  ArrowRight, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Menu, 
  X
} from 'lucide-react';

export default function BloomLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Dynamic Font and Base Injector */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Source+Ser Serif+4:ital,opsz,wght@1,8..60,400..500&display=swap');
        
        :root {
          --radius: 1rem;
          --font-display: 'Poppins', sans-serif;
          --font-body: 'Poppins', sans-serif;
          --font-serif: 'Source Serif 4', serif;
        }

        body {
          font-family: var(--font-body);
          background-color: #000;
          overflow-x: hidden;
        }

        /* Glassmorphism Tier 1: Light */
        .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .liquid-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg, 
            rgba(255, 255, 255, 0.45) 0%, 
            rgba(255, 255, 255, 0.15) 20%, 
            transparent 40%, 
            transparent 60%, 
            rgba(255, 255, 255, 0.15) 80%, 
            rgba(255, 255, 255, 0.45) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Glassmorphism Tier 2: Strong Heavy */
        .liquid-glass-strong {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(50px);
          -webkit-backdrop-filter: blur(50px);
          position: relative;
          overflow: hidden;
          box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }

        .liquid-glass-strong::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg, 
            rgba(255, 255, 255, 0.50) 0%, 
            rgba(255, 255, 255, 0.20) 20%, 
            transparent 40%, 
            transparent 60%, 
            rgba(255, 255, 255, 0.20) 80%, 
            rgba(255, 255, 255, 0.50) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .font-display { font-family: var(--font-display); }
        .font-serif { font-family: var(--font-serif); font-style: italic; }
      `}</style>

      <div className="relative min-h-screen w-full text-white overflow-hidden font-display select-none">
        
        {/* Full-Screen Autoplay Loop Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" type="video/mp4" />
        </video>

        {/* Ambient Darkener Overlays */}
        <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

        {/* Core Layout Split */}
        <div className="relative z-10 flex min-h-screen w-full p-4 lg:p-6 gap-6">
          
          {/* ─── LEFT PANEL (Main Dynamic Canvas) ─── */}
          <div className="relative w-full lg:w-[52%] flex flex-col justify-between p-6 lg:p-8 rounded-[1.75rem] overflow-hidden min-h-[calc(100vh-2rem)] lg:min-h-0">
            <div className="absolute inset-0 liquid-glass-strong rounded-[1.75rem] -z-10" />

            {/* Top Navigation */}
            <header className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3 group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center p-1.5 liquid-glass">
                  <div className="w-full h-full bg-white rounded-sm opacity-90 animate-pulse" />
                </div>
                <span className="text-2xl font-semibold tracking-tighter text-white">bloom</span>
              </div>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="liquid-glass px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase text-white/90 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Menu size={14} className="text-white/80" />
                <span>Menu</span>
              </button>
            </header>

            {/* Central Hero Manifestation */}
            <main className="flex-1 flex flex-col items-center justify-center text-center my-12 lg:my-0 max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center mb-8 liquid-glass hover:scale-105 transition-transform duration-500">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-white/20 rounded-lg transform rotate-45" />
              </div>

              <h1 className="text-5xl lg:text-7xl font-medium tracking-[-0.05em] leading-[1.08] text-white mb-8">
                Innovating the <br />
                <span className="font-serif text-white/80 font-normal">spirit of bloom AI</span>
              </h1>

              <button className="liquid-glass-strong pl-6 pr-3 py-3 rounded-full text-sm font-medium tracking-wide text-white flex items-center gap-4 hover:scale-105 active:scale-95 transition-all duration-300 group shadow-2xl mb-12">
                <span>Explore Now</span>
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                  <Download size={14} className="text-white" />
                </div>
              </button>

              {/* Utility Feature Tags */}
              <div className="flex flex-wrap justify-center gap-2.5">
                {["Artistic Gallery", "AI Generation", "3D Structures"].map((tag, i) => (
                  <span 
                    key={i} 
                    className="liquid-glass px-4 py-2 rounded-full text-xs font-medium text-white/80 hover:scale-105 transition-transform duration-300 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </main>

            {/* Structural Philosophical Bottom Quote */}
            <footer className="w-full pt-6 flex flex-col items-center text-center">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-white/40 uppercase mb-3">
                Visionary Design
              </span>
              <p className="text-lg lg:text-xl text-white/90 max-w-md leading-relaxed tracking-wide">
                "We imagined a <span className="font-serif text-white/70">realm</span> with no <span className="font-serif text-white/70">ending</span>."
              </p>
              
              <div className="w-full flex items-center justify-center gap-4 mt-4 text-white/30">
                <div className="h-[1px] w-8 bg-white/10" />
                <span className="text-[9px] tracking-[0.3em] font-medium uppercase text-white/50">Marcus Aurelio</span>
                <div className="h-[1px] w-8 bg-white/10" />
              </div>
            </footer>
          </div>

          {/* ─── RIGHT PANEL (Ecosystem & Architectural Control) ─── */}
          <div className="hidden lg:flex w-[48%] flex-col justify-between">
            
            {/* Top Operational Status Bar */}
            <div className="w-full flex items-center justify-between">
              <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-4">
                <div className="flex gap-2">
                  {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="text-white/60 hover:text-white transition-colors duration-200">
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
                <div className="w-[1px] h-3 bg-white/20" />
                <button className="text-[11px] font-medium text-white/80 hover:text-white flex items-center gap-1 transition-transform duration-200 hover:scale-105">
                  <span>Connect</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <button className="liquid-glass rounded-full px-5 py-2.5 text-xs font-medium text-white/90 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300">
                <Sparkles size={13} className="text-white/70" />
                <span>Account Setup</span>
              </button>
            </div>

            {/* Right Central Content Ecosystem Card */}
            <div className="my-auto pl-12">
              <div className="liquid-glass rounded-2xl p-6 w-60 flex flex-col gap-3 shadow-lg">
                <h4 className="text-sm font-semibold tracking-tight text-white/90">
                  Enter our ecosystem
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  Synthesize complex architectural plant metrics into hyper-detailed vegetative arrangements with intuitive control layers.
                </p>
                <div className="h-[1px] bg-white/10 my-1" />
                <span className="text-[10px] text-white/40 tracking-wider">STATUS: SYNCED</span>
              </div>
            </div>

            {/* Deep Modular Feature Component Container */}
            <div className="liquid-glass rounded-[2rem] p-5 flex flex-col gap-4 shadow-2xl">
              
              {/* Twin Split Processing Arrays */}
              <div className="grid grid-cols-2 gap-4">
                <div className="liquid-glass rounded-2xl p-5 flex flex-col gap-4 group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Wand2 size={14} className="text-white/80" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">Processing</h3>
                    <p className="text-[11px] text-white/50 leading-normal font-light">
                      Algorithmic floral design compilation engine active.
                    </p>
                  </div>
                </div>

                <div className="liquid-glass rounded-2xl p-5 flex flex-col gap-4 group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <BookOpen size={14} className="text-white/80" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">Growth Archive</h3>
                    <p className="text-[11px] text-white/50 leading-normal font-light">
                      Cataloguing structural evolution timelines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Multi-Media Structural Feature Card */}
              <div className="liquid-glass rounded-2xl p-4 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  {/* Glass-bound Thumbnail Mock */}
                  <div className="w-24 h-16 rounded-xl bg-white/10 overflow-hidden relative liquid-glass shrink-0">
                    <div className="absolute inset-2 rounded-lg bg-gradient-to-tr from-white/30 to-transparent opacity-80" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-white/40" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">Advanced Plant Sculpting</h3>
                    <p className="text-[11px] text-white/50 font-light leading-normal max-w-xs">
                      Manipulate structural mesh bounds via neural vector field weights directly.
                    </p>
                  </div>
                </div>

                <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shrink-0">
                  <span className="text-lg font-light text-white/90">+</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* ─── FLOATING OVERLAY MOBILE DRAWER ─── */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 p-4 lg:hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
            
            <div className="relative w-full liquid-glass-strong rounded-2xl p-6 flex flex-col gap-8 shadow-2xl">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold tracking-tighter">bloom navigation</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-lg">
                {["Artistic Gallery", "AI Generation", "3D Structures", "Ecosystem", "Advanced Sculpting"].map((item, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/80 hover:text-white font-medium transition-colors py-1"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="h-[1px] bg-white/10" />

              <div className="flex justify-between items-center text-xs text-white/40">
                <span>SYSTEM VERSION 4.2.1</span>
                <div className="flex gap-4">
                  <Twitter size={14} />
                  <Linkedin size={14} />
                  <Instagram size={14} />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}