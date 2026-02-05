
import React, { useState, useCallback } from 'react';
import { GeneratorOptions, GeneratedCard } from '../types';
import { generateCard } from '../utils/cardLogic';

const Generator: React.FC = () => {
  const [isWildcardMode, setIsWildcardMode] = useState(false);
  const [options, setOptions] = useState<GeneratorOptions>({
    bin: '453215',
    quantity: 10,
    month: 'Random',
    year: 'Random',
    cvv: 'Random',
    format: 'pipe',
    includeDate: true,
    includeCVV: true,
  });

  const [results, setResults] = useState<GeneratedCard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!options.bin.trim()) {
      alert('Por favor, insira uma BIN ou Padrão.');
      return;
    }
    
    setIsGenerating(true);
    setTimeout(() => {
      const newResults = Array.from({ length: options.quantity }, () => generateCard(options));
      setResults(newResults);
      setIsGenerating(false);
    }, 400);
  }, [options]);

  const handleClear = () => {
    if (results.length === 0) return;
    if (confirm('Deseja realmente limpar todos os resultados?')) {
      setResults([]);
    }
  };

  const copyToClipboard = () => {
    const text = results.map(r => r.formatted).join('\n');
    navigator.clipboard.writeText(text);
    const btn = document.getElementById('copyBtn');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Copiado!';
      btn.classList.add('bg-green-600');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('bg-green-600');
      }, 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Configuration Column */}
      <div className="lg:col-span-4 space-y-6">
        <div className="glass-morphism rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Decorative Background for Advanced Mode */}
          {isWildcardMode && (
            <div className="absolute top-0 right-0 p-2">
              <span className="bg-indigo-500/20 text-indigo-400 text-[8px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/30 uppercase tracking-widest">Advanced Mode</span>
            </div>
          )}

          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full inline-block"></span>
            Configurações
          </h2>
          
          <div className="space-y-4">
            {/* Mode Switcher */}
            <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5 mb-6">
              <button 
                onClick={() => { setIsWildcardMode(false); setOptions({...options, bin: '453215'}); }}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${!isWildcardMode ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                BIN PADRÃO
              </button>
              <button 
                onClick={() => { setIsWildcardMode(true); setOptions({...options, bin: '453215xxxxxx123x'}); }}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${isWildcardMode ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                MODO CURINGA (X)
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                {isWildcardMode ? 'Insira o Padrão Customizado' : 'Insira a BIN'}
              </label>
              <input 
                type="text" 
                value={options.bin}
                onChange={(e) => setOptions({...options, bin: e.target.value})}
                placeholder={isWildcardMode ? "Ex: 4532xx1234xxxxxx" : "Ex: 453215"}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 font-mono"
              />
              {isWildcardMode && (
                <p className="mt-2 text-[10px] text-slate-500 leading-tight">
                  Use <strong className="text-indigo-400">x</strong> para posições aleatórias. O sistema manterá os números fixos e calculará o dígito verificador final automaticamente.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Mês</label>
                <select 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none cursor-pointer"
                  value={options.month}
                  onChange={(e) => setOptions({...options, month: e.target.value})}
                >
                  <option>Random</option>
                  {Array.from({length: 12}, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Ano</label>
                <select 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none cursor-pointer"
                  value={options.year}
                  onChange={(e) => setOptions({...options, year: e.target.value})}
                >
                  <option>Random</option>
                  {Array.from({length: 10}, (_, i) => String(new Date().getFullYear() + i)).map(y => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">CVV</label>
                <input 
                  type="text"
                  value={options.cvv}
                  onChange={(e) => setOptions({...options, cvv: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Quantidade</label>
                <input 
                  type="number"
                  min="1"
                  max="1000"
                  value={options.quantity}
                  onChange={(e) => setOptions({...options, quantity: parseInt(e.target.value) || 1})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 active:scale-[0.98]"
              >
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Gerar Cartões
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              <button 
                onClick={handleClear}
                disabled={results.length === 0}
                className="w-full bg-slate-800/40 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/5 hover:border-red-500/30 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Limpar Resultados
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-8 space-y-6">
        <div className="glass-morphism rounded-2xl border border-white/10 shadow-2xl flex flex-col h-[645px]">
          <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-6 bg-purple-500 rounded-full inline-block"></span>
              Resultados
            </h2>
            <div className="flex gap-2">
              <button 
                id="copyBtn"
                onClick={copyToClipboard}
                disabled={results.length === 0}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-50 shadow-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copiar Tudo
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 font-mono text-indigo-300 text-sm leading-relaxed custom-scrollbar">
            {results.length > 0 ? (
              <pre className="whitespace-pre-wrap">
                {results.map((r, i) => (
                  <div key={i} className="py-1.5 hover:bg-indigo-500/10 px-3 rounded-lg transition-colors group flex items-center">
                    <span className="text-slate-600 w-10 shrink-0 select-none text-xs">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-indigo-200">{r.number}</span>
                    <span className="mx-1 text-indigo-500/50">|</span>
                    <span className="text-indigo-400">{r.month}</span>
                    <span className="mx-1 text-indigo-500/50">/</span>
                    <span className="text-indigo-400">{r.year}</span>
                    <span className="mx-1 text-indigo-500/50">|</span>
                    <span className="text-indigo-500 font-bold">{r.cvv}</span>
                  </div>
                ))}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-900/50 border border-white/5 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="max-w-[280px]">Pronto para gerar! Insira sua BIN ao lado e clique em <strong className="text-indigo-400 font-bold underline underline-offset-4">Gerar Cartões</strong>.</p>
              </div>
            )}
          </div>
          
          {results.length > 0 && (
            <div className="px-8 py-4 border-t border-white/5 bg-slate-900/50 flex justify-between items-center rounded-b-2xl">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Sistema GenMozPro Ativo</span>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  <span className="text-xs text-slate-400">{results.length} resultados</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
