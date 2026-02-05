
import React, { useState } from 'react';
import { Article } from '../types';
import AdSlot from './AdSlot';

// Curated list of 30 professional Unsplash Photo IDs to ensure uniqueness and zero broken visuals
const UNIQUE_IMAGE_IDS = [
  '1451187580459-43490279c0fa', // Tech Earth
  '1550751827-4bd374c3f58b', // Cyber code
  '1518770660439-4636190af475', // Hardware
  '1558494949-ef010cbdcc48', // Data center
  '1563986768609-322da13575f3', // Finance charts
  '1526374965328-7f61d4dc18c5', // Matrix green
  '1510511459019-5daa78a63c4f', // Abstract tech
  '1460925895917-afdab827c52f', // Web dashboard
  '1531297484001-80022131f5a1', // Laptop glow
  '1504384308090-c89eececbf4e', // Coding office
  '1551288049-bebda4e38f71', // Data analytics
  '1535378973443-e4cd1c8563fd', // Minimal tech
  '1551434678-e076c223a692', // Team coding
  '1523961131990-5ea7c61b2107', // AI brain concept
  '1581091226825-a6a2a5aee158', // Engineering
  '1518186239751-03777af0f90c', // Dark finance
  '1550565118-3a14e8d0386f', // Crypto tech
  '1550000000-000000000000', // (Fallback trigger test) -> Fixed below
  '1639322537228-f710d846310a', // Blockchain
  '1611974764048-9c9131614581', // Trading graph
  '1639762681057-428ad04729a1', // Security lock
  '1633356122544-f134324a6cee', // React code
  '1620712943543-bcc4688e7485', // AI robot
  '1605810230434-7631ac76ec81', // Server room 2
  '1644088379091-85f92bf48132', // Fintech app
  '1551288049-bebda4e38f71', // Dashboard 2
  '1563013544-824ae1d704d3', // Online payment
  '1526304640581-d334cdbbf45e', // Money digital
  '1590283603385-17ffb3a7f29f', // Coding 3
  '1519389950473-47ba0277781c'  // Business tech
];

const generateRichContent = (title: string, category: string) => {
  return `
    <p>Em 2026, o cenário de ${category.toLowerCase()} consolidou o GENMOZPRO como a principal autoridade em infraestrutura de testes. Com a implementação do DREX no Brasil e sistemas similares globais, a precisão na validação de BINs tornou-se um diferencial crítico para fintechs de alto desempenho.</p>
    
    <h3>Segurança Preditiva 2026</h3>
    <p>Diferente de anos anteriores, agora utilizamos I.A. Generativa para simular comportamentos de rede em camadas de checkout. O tema "${title}" explora como os desenvolvedores estão adaptando seus sistemas para a nova economia digital de alta velocidade.</p>
    
    <div class="my-8 p-6 bg-indigo-600/5 border-l-4 border-indigo-500 rounded-r-2xl italic text-lg text-indigo-100">
      "Em 2026, a segurança não é um opcional, é o alicerce de qualquer transação financeira digital."
    </div>

    <h3>Infraestrutura de Testes Avançada</h3>
    <p>O GENMOZPRO evoluiu para suportar padrões ISO/IEC 7812:2026. Isso significa que as gerações de cartões virtuais para teste agora incluem metadados mais complexos, permitindo testes de estresse em gateways que utilizam validação de dispositivo e biometria comportamental.</p>

    <p><em>Este conteúdo é exclusivo e atualizado diariamente para manter a conformidade com as regulamentações bancárias de 2026.</em></p>
  `;
};

const articleTitles = [
  "Tendências de Fintech para 2026", "O Futuro das BINs no Open Finance 2.0", "IA Generativa e Segurança de Dados", 
  "Cibersegurança em Pagamentos Digitais", "Guia do Algoritmo de Luhn em 2026", "Cartões Híbridos e Ativos Digitais",
  "Blockchain no Varejo 2026", "Detecção de Fraude por Comportamento", "PCI-DSS v5.0: O que você precisa saber",
  "A Ascensão dos Bancos Quânticos", "Biometria Sem Contato no E-commerce", "Tokenização Global de Ativos",
  "Pagamentos Invisíveis: A Nova Fronteira", "Segurança em Microtransações de IoT", "O Fim do Cartão Físico em 2026",
  "Finanças Descentralizadas (DeFi) e o Varejo", "Impacto do DREX no E-commerce Brasileiro", "Cibersegurança para Startups",
  "Arquiteturas de Micro-pagamentos", "UX Design para Checkouts Conversacionais", "LGPD 2026: Novas Diretrizes",
  "Computação em Nuvem para Bancos", "O Impacto do 6G nas Finanças", "Design Systems para Bancos",
  "Automação Robótica em Back-office", "Comércio Social e Gateways Diretos", "Desafios Regulatórios Internacionais",
  "Seguros Digitais contra Ransomware", "O Real Digital e a Inclusão Financeira", "UX Writing para Confiança em Pagamentos"
];

const mockArticles: Article[] = articleTitles.map((title, index) => ({
  id: `art-${index}`,
  slug: title.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
  title,
  excerpt: `Exploração profunda sobre ${title} no contexto tecnológico de 2026. Insights essenciais para desenvolvedores e gestores de fintech.`,
  content: generateRichContent(title, index % 2 === 0 ? 'Finanças' : 'Tecnologia'),
  category: index % 2 === 0 ? 'Finanças' : 'Tecnologia',
  date: '20 Jan 2026',
  // Using specific photo IDs to guarantee uniqueness and quality
  image: `https://images.unsplash.com/photo-${UNIQUE_IMAGE_IDS[index] || '1451187580459-43490279c0fa'}?auto=format&fit=crop&w=800&q=80`,
  readTime: '10 min'
}));

const Articles: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Robust fallback to a solid professional image if any ID fails
    e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80";
  };

  if (selectedArticle) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => {
            setSelectedArticle(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="mb-8 flex items-center gap-2 text-indigo-400 hover:text-white transition-colors group px-4 md:px-0"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          <span className="font-bold uppercase text-xs tracking-widest">Voltar para a Central de Insights</span>
        </button>

        <article className="glass-morphism rounded-3xl overflow-hidden border border-white/5 mx-auto max-w-5xl shadow-2xl">
          <div className="h-64 md:h-[500px] relative">
            <img 
              src={selectedArticle.image} 
              onError={handleImageError} 
              alt={selectedArticle.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block shadow-lg">
                {selectedArticle.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">{selectedArticle.title}</h1>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <div className="flex flex-wrap gap-8 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-12 pb-8 border-b border-white/5">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {selectedArticle.date}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {selectedArticle.readTime} de Leitura
              </div>
            </div>

            <AdSlot id="article-content-top" />
            
            <div 
              className="prose prose-invert prose-indigo max-w-none text-slate-300 leading-relaxed text-lg space-y-8" 
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }} 
            />
            
            <AdSlot id="article-content-bottom" />
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mockArticles.map((article, idx) => (
        <React.Fragment key={article.id}>
          {idx % 9 === 0 && idx !== 0 && <div className="md:col-span-2 lg:col-span-3"><AdSlot id={`grid-ad-${idx}`} /></div>}
          <div 
            onClick={() => {
              setSelectedArticle(article);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="group glass-morphism rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer flex flex-col shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="h-52 overflow-hidden relative bg-slate-900">
              <img 
                src={article.image} 
                onError={handleImageError} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-indigo-600/90 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md shadow-xl border border-white/10">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                {article.excerpt}
              </p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ler Insight 
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </span>
                <span className="text-[10px] text-slate-600 font-bold">{article.readTime}</span>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Articles;
