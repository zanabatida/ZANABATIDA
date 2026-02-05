
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('genmozpro_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('genmozpro_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-4xl mx-auto glass-morphism border border-indigo-500/30 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
            Preferências de Cookies
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Utilizamos cookies para melhorar sua experiência no <span className="text-indigo-400 font-semibold">GENMOZPRO</span>. 
            Ao continuar navegando, você concorda com nossa <a href="#" className="underline hover:text-white transition-colors">Política de Privacidade</a>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={() => setIsVisible(false)}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-medium transition-all"
          >
            Configurações
          </button>
          <button 
            onClick={handleAccept}
            className="px-8 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            Aceitar Tudo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
