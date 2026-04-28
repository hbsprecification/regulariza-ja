import { consultLink } from "@/lib/contact";
import { ArrowRight, MessageCircle, ShieldCheck, GraduationCap, CheckCircle } from "lucide-react";
import HeroImage from "@/components/HeroImage";
import { useInView } from "@/hooks/useInView";

const trustItems = [
  "Sem compromisso",
  "Análise técnica gratuita",
  "Atendimento em todo o Brasil",
];

const Hero = () => {
  const headingRef = useInView<HTMLHeadingElement>(0.2);
  const subRef    = useInView<HTMLParagraphElement>(0.2);
  const ctaRef    = useInView<HTMLDivElement>(0.2);
  const cardRef   = useInView<HTMLDivElement>(0.2);

  return (
    <section id="hero" className="relative overflow-hidden pt-16 sm:pt-20" aria-labelledby="hero-heading">

      {/* ── Deep engineering navy gradient background ── */}
      <div className="absolute inset-0 gradient-hero" aria-hidden />

      {/* ── Blueprint grid overlay ── */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(hsl(214 100% 80% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(214 100% 80% / 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Technical diagonal lines ── */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03]"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="100%" x2="40%" y2="0" stroke="white" strokeWidth="1" />
        <line x1="20%" y1="100%" x2="70%" y2="0" stroke="white" strokeWidth="0.5" />
        <line x1="100%" y1="60%" x2="60%" y2="100%" stroke="white" strokeWidth="0.5" />
        {/* Dashed arc — top right */}
        <circle cx="100%" cy="0" r="300" fill="none" stroke="white" strokeWidth="0.8" strokeDasharray="6 12" />
        <circle cx="100%" cy="0" r="200" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
        {/* Corner bracket — bottom left */}
        <path d="M 0 100% H 40 M 0 100% V calc(100% - 40)" fill="none" stroke="white" strokeWidth="1" />
      </svg>

      {/* ── Accent glow blobs ── */}
      <div className="absolute -bottom-40 left-1/4 h-96 w-[640px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-20 right-0 h-80 w-96 rounded-full bg-accent/5 blur-3xl" aria-hidden />

      <div className="container relative">

        {/* ── CREA verified badge ── */}
        <div className="flex justify-center pt-10 sm:justify-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            CREA-BA 051598661-5 — Engenheiro Registrado
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid items-center gap-10 pb-12 pt-6 lg:grid-cols-2 lg:gap-14 lg:pb-20 lg:pt-8">

          {/* Left — Copy */}
          <div className="text-center lg:text-left">

            {/* Platform badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/50 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Plataforma de regularização técnica
            </div>

            <h1
              ref={headingRef}
              id="hero-heading"
              className="reveal font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)] sm:text-6xl lg:text-[4rem]"
            >
              Regularize seu imóvel com{" "}
              <span className="bg-gradient-to-r from-accent to-[hsl(var(--accent-glow))] bg-clip-text text-transparent drop-shadow-sm">
                clareza técnica
              </span>{" "}
              e autoridade.
            </h1>

            <p
              ref={subRef}
              className="reveal reveal-delay-1 mx-auto mt-6 max-w-xl text-base leading-[1.7] text-gray-300 drop-shadow-sm sm:text-lg lg:mx-0"
            >
              Uma abordagem de engenharia profissional para a legalização de imóveis e conformidade urbana.
              Análise técnica gratuita. Atendimento em todo o Brasil.
            </p>

            {/* CTA buttons */}
            <div ref={ctaRef} className="reveal reveal-delay-2 mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <a
                href={consultLink()}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-primary"
                className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-orange-400 px-7 py-4 text-base font-bold text-white shadow-xl shadow-accent/25 transition-all hover:opacity-90 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5 flex-shrink-0" />
                Iniciar regularização
              </a>
              <a
                href="#processo"
                id="hero-cta-secondary"
                className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-gray-200 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] transition-all hover:border-white/20 hover:bg-white/10 hover:text-white sm:w-auto"
              >
                Ver como funciona <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1.5 lg:justify-start">
              {trustItems.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-white/45">
                  <CheckCircle className="h-3.5 w-3.5 text-accent/70 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            {/* Engineer card */}
            <div
              ref={cardRef}
              className="reveal reveal-delay-3 card-hover mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm lg:mx-0 lg:max-w-none"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/20">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white">Jádson Castro Santana</p>
                  <p className="text-xs text-white/55">Engenheiro Civil — CREA-BA 051598661-5</p>
                  <div className="mt-2 space-y-1">
                    {[
                      "Pós-grad. Arquitetura e Engenharia Legal",
                      "Pós-graduando — Master BIM",
                    ].map((c) => (
                      <div key={c} className="flex items-center gap-1.5 text-[11px] text-white/45">
                        <GraduationCap className="h-3 w-3 text-accent/60 flex-shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Engineer portrait */}
          <div className="flex flex-col items-center">
            <HeroImage />

            {/* Location badge */}
            <div className="mt-6 w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm lg:mt-6">
              <div className="grid grid-cols-2 divide-x divide-white/10 text-center">
                <div className="pr-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
                    Base de Operação
                  </p>
                  <p className="mt-1 font-display text-sm font-bold text-white">Itabuna — BA</p>
                </div>
                <div className="pl-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
                    Atendimento
                  </p>
                  <p className="mt-1 font-display text-sm font-bold text-accent">
                    Todo o Brasil
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;