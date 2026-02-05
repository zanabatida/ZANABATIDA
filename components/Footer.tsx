
import React from 'react';
import { PageTab } from '../types';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/5 py-16 px-6 bg-slate-950/50 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate('generator')}>
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="text-xl font-bold text-white uppercase tracking-tighter">GENMOZPRO <span className="text-[10px] text-indigo-500 font-black">ENGINE 2026</span></span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Referência mundial em tecnologia de validação e geração de dados para testes em gateways de pagamento. Atendimento global 24/7 para desenvolvedores elite.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Plataforma</h4>
          <div className="flex flex-col space-y-3 items-start">
            <button onClick={() => onNavigate('generator')} className="text-sm text-slate-500 hover:text-indigo-400 transition-colors outline-none">Gerador Elite</button>
            <button onClick={() => onNavigate('checker')} className="text-sm text-slate-500 hover:text-indigo-400 transition-colors outline-none">Deep Checker Live</button>
            <button onClick={() => onNavigate('articles')} className="text-sm text-slate-500 hover:text-indigo-400 transition-colors outline-none">Insight Hub</button>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Institucional</h4>
          <div className="flex flex-col space-y-3 items-start">
            <button onClick={() => onNavigate('about')} className="text-sm text-slate-500 hover:text-indigo-400 transition-colors outline-none">Sobre a Empresa</button>
            <button onClick={() => onNavigate('privacy')} className="text-sm text-slate-500 hover:text-indigo-400 transition-colors outline-none">Privacidade</button>
            <button onClick={() => onNavigate('terms')} className="text-sm text-slate-500 hover:text-indigo-400 transition-colors outline-none">Termos</button>
            <button onClick={() => onNavigate('transparency')} className="text-sm text-slate-500 hover:text-indigo-400 transition-colors outline-none">Transparência</button>
            <button onClick={() => onNavigate('contact')} className="text-sm text-slate-500 hover:text-indigo-400 transition-colors outline-none">Suporte Direto</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
        <p>© 2026 GENMOZPRO - PROTOCOLO DE SEGURANÇA ATIVO.</p>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">API V3.2</span>
          <span className="hover:text-white cursor-pointer">TELEGRAM PRO</span>
          <span className="hover:text-white cursor-pointer">GITHUB</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
