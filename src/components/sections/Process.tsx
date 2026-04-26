import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";
import { MessageCircle } from "lucide-react";

const steps = [
  {
    n: "01",
    emoji: "💬",
    title: "Você explica sua situação",
    desc: "Me conta sobre o imóvel pelo WhatsApp. Sem formulários complexos, sem documentos ainda.",
    free: true,
  },
  {
    n: "02",
    emoji: "🔍",
    title: "Identifico as irregularidades",
    desc: "Faço o levantamento técnico das pendências e verifico as exigências para regularização.",
    free: false,
  },
  {
    n: "03",
    emoji: "🗺️",
    title: "Planejamento do processo",
    desc: "Definimos juntos o caminho técnico e documental mais adequado para o seu imóvel.",
    free: false,
  },
  {
    n: "04",
    emoji: "✅",
    title: "Execução e acompanhamento",
    desc: "Elaboro os documentos técnicos e conduzo o processo junto aos órgãos competentes.",
    free: false,
  },
];

const Process = () => (
  <section id="processo" className="bg-primary py-20 text-primary-foreground lg:py-28" aria-labelledby="process-heading">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">Processo</span>
        <h2 id="process-heading" className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          Como funciona o processo completo
        </h2>
        <p className="mt-4 text-primary-foreground/75">
          Um caminho estruturado em 4 etapas com clareza e segurança técnica em cada fase.{" "}
          <strong className="text-accent">A primeira é gratuita.</strong>
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.n} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 pt-7 backdrop-blur-sm transition-all hover:bg-white/10">
            {/* Free badge */}
            {s.free && (
              <span className="absolute right-4 top-4 rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                Gratuita
              </span>
            )}
            <div className="font-display text-6xl font-extrabold text-accent/25">{s.n}</div>
            <div className="mt-2 text-2xl">{s.emoji}</div>
            <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="absolute right-3 top-10 hidden text-primary-foreground/20 lg:block" aria-hidden>→</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button asChild size="lg" className="bg-accent font-bold text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all hover:scale-[1.02]" id="process-cta">
          <a href={consultLink()} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Começar pela consultoria gratuita
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default Process;