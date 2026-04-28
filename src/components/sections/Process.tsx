import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";
import { MessageCircle, ArrowRight, MessageSquare, Search, FileCog, CheckCircle2 } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    n: "01",
    Icon: MessageSquare,
    title: "Análise Inicial",
    desc: "Explique a situação do imóvel. Sem formulários complexos, iniciamos via contato direto.",
    free: true,
    freeLabel: "Gratuita",
  },
  {
    n: "02",
    Icon: Search,
    title: "Diagnóstico Técnico",
    desc: "Levantamento das pendências, avaliação do zoneamento e verificação das exigências legais.",
    free: false,
    freeLabel: null,
  },
  {
    n: "03",
    Icon: FileCog,
    title: "Engenharia Legal",
    desc: "Desenvolvimento do plano técnico, documentação e projetos necessários para adequação.",
    free: false,
    freeLabel: null,
  },
  {
    n: "04",
    Icon: CheckCircle2,
    title: "Aprovação & Registro",
    desc: "Acompanhamento protocolar nos órgãos públicos até a emissão do certificado de regularidade.",
    free: false,
    freeLabel: null,
  },
];

const Process = () => {
  const headingRef = useInView<HTMLDivElement>(0.2);
  const gridRef = useInView<HTMLDivElement>(0.2);

  return (
    <section
      id="processo"
      className="relative overflow-hidden py-16 lg:py-20"
      aria-labelledby="process-heading"
    >
      <div className="absolute inset-0 gradient-surface" aria-hidden />
      <div className="absolute inset-0 blueprint-bg" aria-hidden />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headingRef} className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden />
            Metodologia
            <span className="h-px w-6 bg-accent" aria-hidden />
          </span>
          <h2
            id="process-heading"
            className="mt-4 font-display text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-4xl"
          >
            Processo Técnico de Regularização
          </h2>
          <p className="mt-4 text-gray-300 leading-[1.7] drop-shadow-sm sm:text-lg">
            Um fluxo de trabalho estruturado para garantir a legalidade do seu ativo imobiliário,
            com precisão em cada fase e mitigação de riscos burocráticos.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="reveal-stagger mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`glass-card group relative flex flex-col overflow-hidden rounded-2xl p-7 ${
                s.free ? "ring-1 ring-accent/30" : ""
              }`}
            >
              {/* Free badge */}
              {s.free && (
                <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-accent ring-1 ring-accent/20">
                  {s.freeLabel}
                </div>
              )}

              {/* Step number */}
              <div className="font-display text-5xl font-extrabold tracking-tighter text-muted-foreground/15 transition-colors group-hover:text-accent/20">
                {s.n}
              </div>

              {/* Icon */}
              <div className="glass-icon mt-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary shadow-sm ring-1 ring-border group-hover:text-accent">
                <s.Icon className="h-6 w-6 stroke-[1.5]" />
              </div>

              {/* Title */}
              <h3 className="mt-5 font-display text-lg font-bold text-white drop-shadow-sm">
                {s.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-[1.7] text-gray-400">
                {s.desc}
              </p>

              {/* Connector arrow — desktop only */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:absolute lg:-right-3 lg:top-1/2 lg:-translate-y-1/2 lg:text-border lg:block"
                  aria-hidden
                >
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal reveal-delay-3 mt-16 flex flex-col items-center gap-4">
          <Button
            asChild
            size="lg"
            className="btn-glow group w-full bg-gradient-to-r from-accent to-orange-400 px-8 py-6 text-base font-bold text-white shadow-xl shadow-accent/25 transition-all hover:opacity-90 sm:w-auto"
            id="process-cta"
          >
            <a href={consultLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              Solicitar diagnóstico gratuito
            </a>
          </Button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Análise sem custo
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Sigilo documental
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;