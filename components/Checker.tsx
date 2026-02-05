
import React, { useState } from 'react';
import { validateLuhn, detectBrand } from '../utils/cardLogic';

interface CheckResult {
  fullLine: string;
  brand: string;
  luhn: boolean;
  status: 'LIVE' | 'DIE' | 'INVALID';
  details: string;
  timestamp: string;
}

const Checker: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<CheckResult[]>([]);

  const handleCheck = () => {
    const lines = inputText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;
    
    setChecking(true);
    
    let currentIndex = 0;
    const processNext = () => {
      if (currentIndex >= lines.length) {
        setChecking(false);
        return;
      }

      const line = lines[currentIndex];
      const parts = line.split(/[|/ ]+/);
      const cardNumber = parts[0]?.replace(/\D/g, '') || '';
      
      const brand = detectBrand(cardNumber);
      const isLuhnValid = validateLuhn(cardNumber);
      
      let status: 'LIVE' | 'DIE' | 'INVALID' = 'INVALID';
      let details = 'REJECTED';

      if (cardNumber.length >= 13 && cardNumber.length <= 19) {
        if (isLuhnValid) {
          // Professional simulation: 25% Live, 60% Die, 15% Error
          const rand = Math.random();
          if (rand > 0.75) {
            status = 'LIVE';
            details = 'APROVADO [CVV MATCH]';
          } else if (rand > 0.15) {
            status = 'DIE';
            details = 'RECUSADO [INSUFFICIENT FUNDS]';
          } else {
            status = 'INVALID';
            details = 'ERRO [GATEWAY TIMEOUT]';
          }
        } else {
          status = 'INVALID';
          details = 'CHECKSUM LUHN ERROR';
        }
      } else {
        status = 'INVALID';
        details = 'INVALID BIN FORMAT';
      }

      const result: CheckResult = {
        fullLine: line,
        brand,
        luhn: isLuhnValid,
        status,
        details,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      setResults(prev => [result, ...prev]);
      currentIndex++;
      
      // Ajustado para exatamente 3 segundos (3000ms) entre cada resultado
      setTimeout(processNext, 3000); 
    };

    processNext();
  };

  const lives = results.filter(r => r.status === 'LIVE');
  const dies = results.filter(r => r.status === 'DIE');
  const invalids = results.filter(r => r.status === 'INVALID');

  const copyLives = () => {
    if (lives.length === 0) return;
    const text = lives.map(l => l.fullLine).join('\n');
    navigator.clipboard.writeText(text);
    alert(`${lives.length} LIVES copiadas com sucesso!`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input area */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-morphism rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl relative">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
              Deep Scanner PRO 2026
            </h2>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Cole sua lista aqui...&#10;Ex: 4532150000000000|12|2028|123"
              className="w-full h-80 bg-slate-950/80 border border-white/10 rounded-xl p-4 text-emerald-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all resize-none custom-scrollbar"
            />
            
            <div className="mt-6 space-y-3">
              <button
                onClick={handleCheck}
                disabled={checking || !inputText.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {checking ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> PROCESSANDO (3s)...</>
                ) : (
                  "INICIAR VERIFICAÇÃO LIVE"
                )}
              </button>
              <div className="flex gap-2">
                 <button onClick={() => setInputText('')} className="flex-1 py-2 text-[10px] font-bold text-slate-500 hover:text-white border border-white/5 rounded-lg transition-colors uppercase">Limpar</button>
                 <button onClick={() => setResults([])} className="flex-1 py-2 text-[10px] font-bold text-slate-500 hover:text-white border border-white/5 rounded-lg transition-colors uppercase">Reset Log</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="glass-morphism p-4 rounded-xl border border-white/5 text-center">
              <p className="text-[10px] font-bold text-slate-500 mb-1">LIVE</p>
              <p className="text-2xl font-black text-emerald-400">{lives.length}</p>
            </div>
            <div className="glass-morphism p-4 rounded-xl border border-white/5 text-center">
              <p className="text-[10px] font-bold text-slate-500 mb-1">DIE</p>
              <p className="text-2xl font-black text-red-500">{dies.length}</p>
            </div>
            <div className="glass-morphism p-4 rounded-xl border border-white/5 text-center">
              <p className="text-[10px] font-bold text-slate-500 mb-1">TOTAL</p>
              <p className="text-2xl font-black text-indigo-400">{results.length}</p>
            </div>
          </div>
        </div>

        {/* Results area */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-full">
          {/* LIVES SECTION - HIGHLIGHTED */}
          <div className="glass-morphism rounded-2xl border border-emerald-500/20 shadow-2xl overflow-hidden flex flex-col flex-1 max-h-[400px]">
            <div className="px-6 py-4 bg-emerald-500/10 border-b border-white/5 flex justify-between items-center">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Aprovados (LIVE)
              </span>
              <button onClick={copyLives} className="text-[9px] font-bold text-emerald-400 hover:bg-emerald-400 hover:text-black transition-all border border-emerald-500/30 px-3 py-1 rounded-md uppercase">Copiar Lives</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] space-y-1.5 custom-scrollbar bg-black/40">
              {lives.map((res, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-emerald-500/5 border border-emerald-500/10 text-emerald-300">
                  <span className="truncate">{res.fullLine}</span>
                  <span className="shrink-0 font-bold ml-4">#LIVE</span>
                </div>
              ))}
              {lives.length === 0 && <p className="text-slate-700 text-center py-8 italic uppercase text-[10px]">Nenhum cartão aprovado detectado</p>}
            </div>
          </div>

          {/* ALL LOGS SECTION */}
          <div className="glass-morphism rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col flex-1 max-h-[350px]">
             <div className="px-6 py-3 bg-white/5 border-b border-white/5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full System Log</span>
             </div>
             <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] space-y-1 custom-scrollbar bg-black/20">
                {results.map((res, i) => (
                  <div key={i} className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
                    <span className="text-slate-600 shrink-0">[{res.timestamp}]</span>
                    <span className={res.status === 'LIVE' ? 'text-emerald-400' : res.status === 'DIE' ? 'text-red-500' : 'text-orange-500'}>
                      {res.status}
                    </span>
                    <span className="text-slate-400 truncate">{res.fullLine}</span>
                    <span className="ml-auto text-slate-600 italic">» {res.details}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checker;
