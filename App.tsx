
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Generator from './components/Generator';
import Checker from './components/Checker';
import Articles from './components/Articles';
import LegalPages from './components/LegalPages';
import CookieConsent from './components/CookieConsent';
import SEOLinks from './components/SEOLinks';
import Assistant from './components/Assistant';
import AdSlot from './components/AdSlot';
import { PageTab } from './types';

const PROCESSING_MESSAGES = [
  "INICIALIZANDO PROTOCOLOS 2026...",
  "VALIDANDO SEGURANÇA BANCÁRIA...",
  "SINCRONIZANDO COM DREX API...",
  "PREPARANDO AMBIENTE SEGURO...",
  "FINALIZANDO..."
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PageTab>('generator');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processMsgIndex, setProcessMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleTabChange = (tab: PageTab) => {
    if (activeTab === tab && !isProcessing) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    
    // Simulate system processing for professional look
    setTimeout(() => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => {
        setIsProcessing(false);
      }, 600);
    }, 300);
  };

  useEffect(() => {
    let interval: number;
    if (isProcessing) {
      interval = window.setInterval(() => {
        setProcessMsgIndex((prev) => (prev + 1) % PROCESSING_MESSAGES.length);
      }, 200);
      
      const progressInterval = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 5;
        });
      }, 40);

      return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
      };
    }
  }, [isProcessing]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500/30 relative bg-[#020617] text-slate-200">
      <Header onNavigate={handleTabChange} />
      
      {isProcessing && (
        <div className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-[#020617] backdrop-blur-3xl animate-in fade-in duration-300">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.4)] animate-bounce mb-12">
              <span className="text-white font-black text-4xl">G</span>
            </div>
            <div className="text-center space-y-6 w-full max-w-xs">
              <h3 className="text-white font-black tracking-[0.3em] text-[10px] animate-pulse uppercase">
                {PROCESSING_MESSAGES[processMsgIndex]}
              </h3>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow pt-32 pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          
          {(activeTab === 'generator' || activeTab === 'checker') && (
            <section className="text-center mb-12 space-y-6">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-indigo-400 text-[10px] md:text-xs font-black uppercase tracking-widest animate-pulse">
                SISTEMA GENMOZPRO v3.2 ONLINE 2026
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter uppercase">
                {activeTab === 'generator' ? <>Gerador de BIN <span className="gradient-text">Elite v3.2</span></> : <>Checker Live <span className="gradient-text text-emerald-400">Deep Scan</span></>}
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg">
                {activeTab === 'generator' 
                  ? 'Gere milhares de BINs válidas instantaneamente para testes de integração em ambientes de pagamento.' 
                  : 'Valide listas completas de cartões com nosso motor de análise em tempo real de alta precisão.'}
              </p>
            </section>
          )}

          <AdSlot id="header-top-banner" />

          <section className="relative min-h-[600px] mt-12">
            {activeTab === 'generator' && <Generator />}
            {activeTab === 'checker' && <Checker />}
            {activeTab === 'articles' && <Articles />}
            {['privacy', 'terms', 'about', 'contact', 'transparency'].includes(activeTab) && (
              <LegalPages type={activeTab as any} />
            )}
          </section>
          
          {activeTab === 'generator' && <SEOLinks />}
          
          <AdSlot id="footer-bottom-banner" />
        </div>
      </main>
      
      <Footer onNavigate={handleTabChange} />
      <Assistant />
      <CookieConsent />
    </div>
  );
};

export default App;
