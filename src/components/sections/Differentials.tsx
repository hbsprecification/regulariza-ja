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
        <span className="tech-tag justify-center">SYS.05 · DIFERENCIAIS</span>
        <h2 id="differentials-heading" className="mt-3 font-display text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-4xl">
          Por que contar com acompanhamento técnico especializado?
        </h2>
        <p className="mt-4 text-gray-300 leading-[1.7] drop-shadow-sm">
          Regularizar um imóvel sem orientação técnica pode resultar em erros caros e perda de tempo. Veja o que trabalhar com um especialista faz diferença:
        </p>
        <div className="beam-divider mx-auto mt-8 max-w-md" aria-hidden />
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <div key={item.text} className="holo-card relative flex items-start gap-4 p-5">
            <span className="hud-corner tl" aria-hidden />
            <span className="hud-corner br" aria-hidden />
            <span className="text-2xl flex-shrink-0">{item.emoji}</span>
            <div className="flex-1">
              <span className="font-mono text-[9px] font-medium tracking-widest text-accent/70">D.{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-1 font-bold text-white leading-snug drop-shadow-sm">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Differentials;