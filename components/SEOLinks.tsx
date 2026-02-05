
import React from 'react';

const SEOLinks: React.FC = () => {
  const brands = [
    { name: 'Visa', count: '1.2M', icon: '💳' },
    { name: 'MasterCard', count: '850K', icon: '🏦' },
    { name: 'American Express', count: '420K', icon: '💎' },
    { name: 'Discover', count: '120K', icon: '🔍' },
    { name: 'Elo', count: '95K', icon: '🇧🇷' },
    { name: 'JCB', count: '45K', icon: '🇯🇵' },
  ];

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </span>
          Popularmente Gerados
        </h3>
        <span className="text-xs text-slate-500 font-medium">Atualizado em tempo real</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <a 
            key={brand.name}
            href={`/gerador-bin-${brand.name.toLowerCase().replace(' ', '-')}`}
            className="group glass-morphism p-4 rounded-xl border border-white/5 hover:border-indigo-500/50 transition-all text-center"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{brand.icon}</div>
            <div className="text-sm font-bold text-slate-200 mb-1">BIN {brand.name}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-tighter">{brand.count} Gerações</div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SEOLinks;
