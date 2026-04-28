import { CheckCircle2, Star } from "lucide-react";

const items = [
  { emoji: "🎯", text: "Comunicação clara e objetiva, sem jargões técnicos" },
  { emoji: "🔍", text: "Análise técnica completa da situação do imóvel" },
  { emoji: "📋", text: "Experiência prática com processos junto à prefeitura e cartório" },
  { emoji: "🛡️", text: "Orientação segura e técnica para todo o processo de regularização" },
  { emoji: "⚡", text: "Abordagem direta, sem enrolação ou burocracia desnecessária" },
  { emoji: "📍", text: "Especialista em regularização em Itabuna, Ilhéus e região sul da Bahia" },
];

const Differentials = () => (
  <section className="blueprint-bg relative overflow-hidden py-16 lg:py-20" aria-labelledby="differentials-heading">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-accent drop-shadow-sm">Diferenciais</span>
        <h2 id="differentials-heading" className="mt-3 font-display text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-4xl">
          Por que contar com acompanhamento técnico especializado?
        </h2>
        <p className="mt-4 text-gray-300 leading-[1.7] drop-shadow-sm">
          Regularizar um imóvel sem orientação técnica pode resultar em erros caros e perda de tempo. Veja o que trabalhar com um especialista faz diferença:
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.text} className="glass-card flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg transition-all hover:border-white/20 hover:bg-white/10">
            <span className="text-2xl flex-shrink-0">{item.emoji}</span>
            <p className="font-bold text-white leading-snug drop-shadow-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Differentials;