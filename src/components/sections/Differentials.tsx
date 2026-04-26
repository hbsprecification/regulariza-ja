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
  <section className="py-20 lg:py-28" aria-labelledby="differentials-heading">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Diferenciais</span>
        <h2 id="differentials-heading" className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
          Por que contar com acompanhamento técnico especializado?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Regularizar um imóvel sem orientação técnica pode resultar em erros caros e perda de tempo. Veja o que trabalhar com um especialista faz diferença:
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.text} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:border-accent/40 hover:shadow-elegant">
            <span className="text-2xl flex-shrink-0">{item.emoji}</span>
            <p className="font-medium text-foreground leading-snug">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Differentials;