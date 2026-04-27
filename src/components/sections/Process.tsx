import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";
import { MessageCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    emoji: "💬",
    title: "Você explica sua situação",
    desc: "Me conta sobre o imóvel pelo WhatsApp. Sem formulários complexos, sem documentos ainda.",
    free: true,
    freeLabel: "Gratuita",
  },
  {
    n: "02",
    emoji: "🔍",
    title: "Identifico as irregularidades",
    desc: "Faço o levantamento técnico das pendências e verifico as exigências para regularização.",
    free: false,
    freeLabel: null,
  },
  {
    n: "03",
    emoji: "🗺️",
    title: "Planejamento do processo",
    desc: "Definimos juntos o caminho técnico e documental mais adequado para o seu imóvel.",
    free: false,
    freeLabel: null,
  },
  {
    n: "04",
    emoji: "✅",
    title: "Execução e acompanhamento",
    desc: "Elaboro os documentos técnicos e conduzo o processo junto aos órgãos competentes.",
    free: false,
    freeLabel: null,
  },
];

const Process = () => (
  <section
    id="processo"
    className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-28"
    aria-labelledby="process-heading"
  >
    {/* Subtle grid texture */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      aria-hidden
      style={{
        backgroundImage:
          "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
    {/* Accent glows */}
    <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/20 blur-3xl" aria-hidden />
    <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/10 blur-3xl" aria-hidden />

    <div className="container relative">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Processo
        </span>
        <h2
          id="process-heading"
          className="mt-3 font-display text-3xl font-extrabold sm:text-4xl"
        >
          Como funciona o processo completo
        </h2>
        <p className="mt-4 text-primary-foreground/75">
          Um caminho estruturado em 4 etapas com clareza e segurança técnica em cada fase.{" "}
          <strong className="font-bold text-accent">
            A primeira é gratuita.
          </strong>
        </p>
      </div>

      {/* Cards grid */}
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 pt-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] ${
              s.free
                ? "border-accent/60 bg-accent/10 shadow-[0_0_0_1px_hsl(24_80%_27%/0.4)] hover:bg-accent/15"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            {/* Free badge */}
            {s.free && (
              <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-accent px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-accent-foreground shadow-sm">
                {s.freeLabel}
              </div>
            )}

            {/* Step number — large, high-contrast */}
            <div
              className={`font-display text-7xl font-extrabold leading-none tracking-tighter transition-all duration-300 ${
                s.free
                  ? "text-accent"
                  : "text-white/20 group-hover:text-white/35"
              }`}
            >
              {s.n}
            </div>

            {/* Emoji */}
            <div className="mt-3 text-2xl">{s.emoji}</div>

            {/* Title */}
            <h3
              className={`mt-3 font-display text-lg font-bold leading-snug ${
                s.free ? "text-white" : "text-primary-foreground"
              }`}
            >
              {s.title}
            </h3>

            {/* Description */}
            <p
              className={`mt-2 text-sm leading-relaxed ${
                s.free ? "text-primary-foreground/85" : "text-primary-foreground/65"
              }`}
            >
              {s.desc}
            </p>

            {/* Connector arrow — desktop only */}
            {i < steps.length - 1 && (
              <div
                className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
                aria-hidden
              >
                <ArrowRight className="h-5 w-5 text-white/30" />
              </div>
            )}

            {/* Bottom accent bar for step 1 */}
            {s.free && (
              <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-accent" aria-hidden />
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-col items-center gap-4">
        <Button
          asChild
          size="lg"
          className="group w-full bg-accent px-8 py-6 text-base font-extrabold text-accent-foreground shadow-[0_4px_24px_-4px_rgba(122,62,14,0.6)] transition-all duration-300 hover:scale-[1.03] hover:bg-accent/90 hover:shadow-[0_8px_32px_-4px_rgba(122,62,14,0.7)] sm:w-auto"
          id="process-cta"
        >
          <a href={consultLink()} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            Começar pela consultoria gratuita
          </a>
        </Button>
        <p className="text-xs text-primary-foreground/50">
          Sem compromisso · Análise inicial gratuita · Resposta rápida
        </p>
      </div>
    </div>
  </section>
);

export default Process;