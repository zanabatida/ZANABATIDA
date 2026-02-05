
import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';

interface HeaderProps {
  onNavigate: (tab: PageTab) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNav = (tab: PageTab) => {
    onNavigate(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[250] glass-morphism border-b border-white/5 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            onClick={() => handleNav('generator')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-all duration-300">
              <span className="text-white font-black text-xl">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none uppercase">
                GEN<span className="gradient-text">MOZPRO</span>
              </span>
              <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-0.5">Enterprise v3.2</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <button onClick={() => handleNav('generator')} className="hover:text-indigo-400 transition-colors flex items-center gap-2 group outline-none">
              <svg className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Início
            </button>
            <button onClick={() => handleNav('checker')} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group outline-none">
              <svg className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Checker
            </button>
            <button onClick={() => handleNav('articles')} className="hover:text-purple-400 transition-colors flex items-center gap-2 group outline-none">
              <svg className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              Insights
            </button>
            <button onClick={() => handleNav('about')} className="hover:text-white transition-colors flex items-center gap-2 group outline-none">
              <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Sobre
            </button>
            <div className="h-4 w-px bg-white/10 mx-2"></div>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-500/10">
              API ACCESS
            </button>
          </nav>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-3 hover:bg-white/10 rounded-2xl transition-all border border-white/10 flex items-center justify-center bg-slate-900/50 shadow-lg relative z-[301]"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </header>

      {/* MOBILE DASHBOARD MENU */}
      <div 
        className={`fixed inset-0 bg-[#020617] z-[240] flex flex-col transition-all duration-500 ease-in-out lg:hidden overflow-y-auto pt-[100px] px-6 pb-12 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        {/* INFO DASHBOARD (Home Info) */}
        <div className="mb-8 p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
             <div className="flex flex-col">
               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">Rede Global GENMOZ</p>
               <h4 className="text-white font-black text-xl">Dashboard em Tempo Real</h4>
             </div>
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-emerald-400 text-[10px] font-black uppercase">V3.2 Ativa</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            {[
              { label: 'Status Server', val: 'Online (DREX)', color: 'text-white' },
              { label: 'Gerações /h', val: '142.8k+', color: 'text-indigo-400' },
              { label: 'Latência Reduz.', val: '12ms', color: 'text-white' },
              { label: 'Uptime Sistema', val: '100.0%', color: 'text-emerald-400' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest block mb-1">{stat.label}</span>
                <span className={`${stat.color} text-lg font-black tracking-tight`}>{stat.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION PANEL */}
        <div className="space-y-3 mb-12">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 px-2">Comandos Principais</p>
          
          <button 
            onClick={() => handleNav('generator')} 
            className="w-full flex items-center justify-between p-5 bg-white/[0.03] hover:bg-white/[0.08] rounded-3xl border border-white/5 transition-all text-left group"
          >
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 border border-indigo-500/10 group-hover:scale-110 transition-transform">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
               </div>
               <div className="flex flex-col">
                 <span className="text-white font-black uppercase tracking-widest text-xs">Gerador Industrial</span>
                 <span className="text-slate-500 text-[9px] font-bold">BIN & Wildcard v3.2</span>
               </div>
             </div>
             <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <button 
            onClick={() => handleNav('checker')} 
            className="w-full flex items-center justify-between p-5 bg-white/[0.03] hover:bg-white/[0.08] rounded-3xl border border-white/5 transition-all text-left group"
          >
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 border border-emerald-500/10 group-hover:scale-110 transition-transform">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div className="flex flex-col">
                 <span className="text-white font-black uppercase tracking-widest text-xs">Deep Checker Live</span>
                 <span className="text-slate-500 text-[9px] font-bold">Validação Real-Time</span>
               </div>
             </div>
             <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <button 
            onClick={() => handleNav('articles')} 
            className="w-full flex items-center justify-between p-5 bg-white/[0.03] hover:bg-white/[0.08] rounded-3xl border border-white/5 transition-all text-left group"
          >
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 border border-purple-500/10 group-hover:scale-110 transition-transform">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
               </div>
               <div className="flex flex-col">
                 <span className="text-white font-black uppercase tracking-widest text-xs">Insights Hub</span>
                 <span className="text-slate-500 text-[9px] font-bold">Notícias & Tendências</span>
               </div>
             </div>
             <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* SECONDARY NAVIGATION */}
        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button onClick={() => handleNav('about')} className="py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white active:bg-white/5 transition-all outline-none">Sobre Nós</button>
            <button onClick={() => handleNav('contact')} className="py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white active:bg-white/5 transition-all outline-none">Suporte</button>
          </div>
          <div className="flex flex-col items-center gap-3">
             <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
             <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">GENMOZPRO ENTERPRISE EDITION</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
