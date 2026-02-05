
import React from 'react';

interface AdSlotProps {
  id: string;
  type?: 'banner' | 'sidebar' | 'inline';
}

const AdSlot: React.FC<AdSlotProps> = ({ id, type = 'banner' }) => {
  return (
    <div className={`ad-container my-10 mx-auto flex flex-col items-center justify-center transition-all overflow-hidden ${
      type === 'banner' ? 'w-full max-w-[728px] min-h-[90px]' : 
      type === 'sidebar' ? 'w-full min-h-[600px] max-w-[300px]' : 
      'w-full h-auto min-h-[250px]'
    }`}>
      <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2 font-bold opacity-50">Espaço Publicitário</div>
      <div className="w-full h-full glass-morphism border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center relative bg-white/[0.02] p-4">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 flex items-center justify-center mb-2">
          <svg className="w-6 h-6 text-indigo-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <span className="text-slate-600 font-mono text-[10px] uppercase">Anúncio Google AdSense #{id}</span>
      </div>
    </div>
  );
};

export default AdSlot;
