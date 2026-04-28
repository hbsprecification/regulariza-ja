import { useEffect, useRef } from "react";
import portrait from "@/assets/jadson-portrait.jpg";
import { Award, GraduationCap, ShieldCheck, MessageCircle, Cpu, Languages, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";

const credentials = [
  { icon: GraduationCap, text: "Engenharia Civil" },
  { icon: Award,         text: "Pós-grad. Arquitetura e Eng. Legal" },
  { icon: GraduationCap, text: "Pós-graduando — Master BIM" },
  { icon: ShieldCheck,   text: "CREA-BA 051598661-5" },
];

const pillars = [
  {
    Icon: Cpu,
    title: "Técnica aplicada",
    desc: "Conhecimento de engenharia 100% voltado à regularização de imóveis urbanos.",
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
  },
  {
    Icon: Languages,
    title: "Linguagem clara",
    desc: "Sem juridiquês ou termos técnicos desnecessários — você entende cada etapa.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    Icon: Zap,
    title: "Sem burocracia",
    desc: "Condução prática do processo, orientando cada passo de forma objetiva.",
    iconColor: "text-slate-600",
    iconBg: "bg-slate-100",
  },
];

const About = () => {
  const pillarsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    if (pillarsRef.current) obs.observe(pillarsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="blueprint-bg relative overflow-hidden gradient-dark-surface py-16 lg:py-20"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="reveal grid gap-12 lg:grid-cols-5 lg:items-stretch">

          {/* ── Photo column ─────────────────────────────── */}
          <div className="flex lg:col-span-2">
            {/* ambient glow */}
            <div
              className="pointer-events-none absolute -inset-10 rounded-full bg-accent/5 blur-3xl"
              aria-hidden
            />

            {/* Engineering photo frame — stretches to match text height */}
            <div className="eng-photo-frame relative w-full">
              <img
                src={portrait}
                alt="Jádson Castro Santana, Engenheiro Civil especialista em regularização de imóveis em Itabuna e Ilhéus"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover object-top"
                style={{ minHeight: "440px" }}
              />

              {/* CREA badge */}
              <div
                className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl border border-white/30 bg-white/80 px-5 py-2.5 text-center shadow-lg backdrop-blur-md"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  CREA-BA
                </p>
                <p className="font-display text-sm font-black text-gray-900">
                  051598661-5
                </p>
              </div>

              {/* Corner brackets */}
              <span className="corner-bracket tl" aria-hidden />
              <span className="corner-bracket tr" aria-hidden />
              <span className="corner-bracket bl" aria-hidden />
              <span className="corner-bracket br" aria-hidden />
            </div>
          </div>

          {/* ── Text column ──────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-3">
            {/* Section label */}
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="inline-block h-px w-6 bg-accent" aria-hidden />
              Sobre o responsável técnico
            </span>

            {/* Name heading */}
            <h2
              id="about-heading"
              className="mt-4 font-display text-4xl font-black leading-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-5xl"
            >
              Jádson Castro{" "}
              <span className="bg-gradient-to-r from-accent to-[hsl(var(--accent-glow))] bg-clip-text text-transparent">Santana</span>
            </h2>
            <p className="mt-2 text-base font-bold text-gray-400">
              Engenheiro Civil — Especialista em Regularização de Imóveis Urbanos
            </p>

            {/* Credential pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {credentials.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-gray-200 shadow-sm backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0 text-accent" />
                  {text}
                </div>
              ))}
            </div>

            {/* Bio text */}
            <div className="mt-6 space-y-3 text-[0.95rem] leading-[1.7] text-gray-300 drop-shadow-sm">
              <p>
                Engenheiro civil especializado em regularização de imóveis urbanos em Itabuna,
                Ilhéus e toda a região sul da Bahia.
              </p>
              <p>
                Com formação complementar em Arquitetura e Engenharia Legal, atua na análise
                técnica e condução de processos de regularização junto à prefeitura e cartórios —
                simplificando o que muitas pessoas acham impossível.
              </p>
              <p>
                Meu objetivo é que você entenda exatamente a situação do seu imóvel e saiba o
                que fazer — sem enrolação e sem burocracia desnecessária.
              </p>
            </div>

            {/* Pillar cards — glass + staggered reveal */}
            <div
              ref={pillarsRef}
              className="reveal-stagger mt-8 grid gap-3 sm:grid-cols-3"
            >
              {pillars.map(({ Icon, title, desc, iconColor, iconBg }) => (
                <div key={title} className="glass-card rounded-2xl p-5">
                  <div className={`glass-icon mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
                    <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.8} />
                  </div>
                  <p className="font-display text-sm font-bold text-white drop-shadow-sm">{title}</p>
                  <p className="mt-1 text-xs leading-[1.7] text-gray-400">{desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="btn-glow mt-8 w-fit bg-gradient-to-r from-accent to-orange-400 font-bold text-white hover:opacity-90 shadow-xl shadow-accent/25"
              id="about-cta"
            >
              <a href={consultLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar com Jádson agora
              </a>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
