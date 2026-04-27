import { consultLink } from "@/lib/contact";
import { ArrowRight, MessageCircle, ShieldCheck, GraduationCap } from "lucide-react";
import Hero3D from "@/components/Hero3D";

const Hero = () => (
  <section id="hero" className="relative overflow-hidden pt-20 sm:pt-24" aria-labelledby="hero-heading">
    {/* Dark gradient background */}
    <div className="absolute inset-0 gradient-hero" aria-hidden />
    {/* Subtle grid texture */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      aria-hidden
      style={{
        backgroundImage:
          "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
    {/* Accent glow */}
    <div className="absolute -bottom-32 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" aria-hidden />

    <div className="container relative">
      {/* CREA badge */}
      <div className="flex justify-center pt-10 sm:justify-start">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-accent" />
          CREA-BA 051598661-5 — Registro ativo
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid items-center gap-8 pb-16 pt-8 lg:grid-cols-2 lg:gap-12 lg:pb-24 lg:pt-10">
        {/* Left — Copy */}
        <div className="text-center text-primary-foreground lg:text-left">
          <h1
            id="hero-heading"
            className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.2rem]"
          >
            Regularize seu imóvel com{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">orientação técnica</span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-accent/40" aria-hidden />
            </span>{" "}
            e sem burocracia.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg lg:mx-0">
            Descubra de forma clara se seu imóvel precisa de regularização e quais caminhos podem resolver o problema —
            com análise técnica profissional e gratuita.
          </p>

          {/* CTAs — mobile full-width */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <a
              href={consultLink()}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-primary"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:scale-[1.02] hover:bg-accent/90 hover:shadow-accent/50 sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 flex-shrink-0" />
              Quero minha consultoria gratuita
            </a>
            <a
              href="#calculadora"
              id="hero-cta-secondary"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-4 text-sm font-semibold text-primary-foreground/90 backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
            >
              Verificar meu imóvel <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-3 text-center text-xs text-primary-foreground/55 lg:text-left">
            ✔ Sem compromisso &nbsp;·&nbsp; ✔ Análise inicial gratuita &nbsp;·&nbsp; ✔ Atendimento em todo o Brasil
          </p>

          {/* Credentials card */}
          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm lg:mx-0 lg:max-w-none">
            <p className="font-display text-sm font-bold text-primary-foreground">Jádson Castro Santana</p>
            <p className="text-xs text-primary-foreground/70">Engenheiro Civil — CREA-BA 051598661-5</p>
            <p className="mt-0.5 text-xs font-medium text-accent">Especialista em regularização de imóveis</p>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 text-[11px] text-primary-foreground/60">
                <GraduationCap className="h-3 w-3 text-accent/70 flex-shrink-0" />
                Pós-graduado em Arquitetura e Engenharia Legal
              </div>
              <div className="flex items-center gap-2 text-[11px] text-primary-foreground/60">
                <GraduationCap className="h-3 w-3 text-accent/70 flex-shrink-0" />
                Pós-graduando em Master BIM
              </div>
            </div>
          </div>
        </div>

        {/* Right — 3D Scroll Animation (hidden on mobile to prioritize CTA) */}
        <div className="hidden lg:block">
          <Hero3D />

          {/* Specialization badge */}
          <div className="mt-4 flex justify-center">
            <div className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-center backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50">Especialização</p>
              <p className="font-display text-sm font-bold text-primary-foreground">Arquitetura & Engenharia Legal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;