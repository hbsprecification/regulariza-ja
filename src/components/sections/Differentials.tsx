import { CheckCircle2 } from "lucide-react";

const items = [
  "Comunicação clara e objetiva",
  "Análise técnica completa da situação do imóvel",
  "Experiência prática com processos administrativos",
  "Orientação segura para condução da regularização",
  "Abordagem técnica sem burocracia desnecessária",
];

const Differentials = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Diferenciais</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
          Por que contar com acompanhamento técnico especializado?
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-card transition-smooth hover:border-accent/40">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
            <p className="font-medium text-foreground">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Differentials;