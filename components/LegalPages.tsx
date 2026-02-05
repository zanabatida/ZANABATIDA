
import React from 'react';
import AdSlot from './AdSlot';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'about' | 'contact' | 'transparency';
}

const LegalPages: React.FC<LegalPageProps> = ({ type }) => {
  const content = {
    privacy: {
      title: "Política de Privacidade",
      text: "No GENMOZPRO, priorizamos sua segurança. Em 2026, atualizamos nossas políticas para conformidade total com LGPD e GDPR. Não armazenamos dados gerados em nossos servidores. Nossos cookies são estritamente técnicos para funcionalidade da plataforma e integração com Google AdSense."
    },
    terms: {
      title: "Termos de Uso",
      text: "O GENMOZPRO é uma ferramenta de uso educacional e para testes de software. Ao utilizar nossos serviços, você concorda que é o único responsável pelo uso das informações geradas. Proibimos estritamente o uso para atividades ilícitas ou fraudulentas em gateways reais."
    },
    about: {
      title: "Sobre Nós",
      text: "Líderes em tecnologia de validação de dados financeiros desde 2023. O GENMOZPRO nasceu para preencher a lacuna entre desenvolvedores e a necessidade de dados de teste de alta qualidade. Nossa equipe é composta por engenheiros de software focados em segurança digital."
    },
    transparency: {
      title: "Transparência de Dados",
      text: "Mantemos transparência total sobre como monetizamos nossa plataforma. O GENMOZPRO utiliza anúncios do Google AdSense para manter os servidores ativos e gratuitos. Nossos algoritmos de geração (Luhn) são abertos e seguem o padrão ISO/IEC 7812:2026."
    },
    contact: {
      title: "Contato Profissional",
      text: "Dúvidas técnicas ou parcerias comerciais? Entre em contato conosco."
    }
  };

  const page = content[type];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-6">
      <h1 className="text-4xl font-black text-white mb-8 gradient-text">{page.title}</h1>
      <div className="glass-morphism rounded-3xl p-8 md:p-12 border border-white/5 space-y-6 text-slate-300 leading-relaxed">
        <p className="text-lg font-medium text-indigo-400">Atualizado em Janeiro de 2026</p>
        <p>{page.text}</p>
        
        {type === 'contact' ? (
          <form className="space-y-4 mt-8">
            <input type="text" placeholder="Nome Completo" className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white" />
            <input type="email" placeholder="E-mail" className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white" />
            <textarea placeholder="Sua Mensagem" rows={5} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white"></textarea>
            <button className="bg-indigo-600 w-full py-4 rounded-xl font-bold hover:bg-indigo-500 transition-all">Enviar Mensagem</button>
          </form>
        ) : (
          <>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <AdSlot id="legal-content-ad" />
            <p>Em 2026, a infraestrutura global de pagamentos exige validações em tempo real. O GENMOZPRO fornece essa camada de segurança para ambientes de desenvolvimento sandbox. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </>
        )}
      </div>
      <AdSlot id="legal-footer-ad" />
    </div>
  );
};

export default LegalPages;
