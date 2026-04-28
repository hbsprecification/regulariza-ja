import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/jadson-portrait.jpg";
import { Award, GraduationCap, ShieldCheck, MessageCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";

const credentials = [
  { icon: GraduationCap, label: "Formação", text: "Engenharia Civil" },
  { icon: Award, label: "Pós-graduação", text: "Arquitetura e Engenharia Legal" },
  { icon: Building2, label: "Especialização", text: "Master BIM (em andamento)" },
  { icon: ShieldCheck, label: "Registro", text: "CREA-BA 051598661-5" },
];

const pillars = [
  { emoji: "🏗️", title: "Técnica aplicada", desc: "Conhecimento de engenharia voltado 100% à regularização de imóveis urbanos." },
  { emoji: "💬", title: "Linguagem clara", desc: "Sem juridiquês ou termos técnicos desnecessários. Você entende cada etapa." },
  { emoji: "⚡", title: "Sem burocracia", desc: "Condução prática do processo, orientando cada passo de forma objetiva." },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);

  // Intersection observer for entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Subtle parallax on the portrait
  useEffect(() => {
    const el = sectionRef.current;
    const img = imgRef.current;
    if (!el || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // -1 (above) → 1 (below)
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const offset = Math.max(-25, Math.min(25, -progress * 30));
        img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre"
      aria-labelledby="about-heading"
      className="about-dark relative isolate overflow-hidden py-20 lg:py-28"
    >
      {/* Animated blueprint background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="ab-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="hsl(24 70% 60%)" strokeWidth="0.5" />
            </pattern>
            <pattern id="ab-grid-major" width="240" height="240" patternUnits="userSpaceOnUse">
              <path d="M 240 0 L 0 0 0 240" fill="none" stroke="hsl(24 70% 60%)" strokeWidth="0.9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ab-grid)" />
          <rect width="100%" height="100%" fill="url(#ab-grid-major)" opacity="0.7" />

          <g stroke="hsl(24 70% 60%)" fill="none" strokeWidth="1.1">
            <g className="ab-draw ab-draw-1">
              <rect x="140" y="160" width="360" height="240" />
              <line x1="320" y1="160" x2="320" y2="280" />
              <line x1="140" y1="280" x2="320" y2="280" />
              <path d="M 240 280 A 32 32 0 0 1 272 312" />
            </g>
            <g className="ab-draw ab-draw-2">
              <polyline points="1100,200 1420,200 1420,400 1240,400 1240,460 1060,460 1060,290 1100,290 1100,200" />
              <line x1="1240" y1="200" x2="1240" y2="400" />
            </g>
          </g>

          <g stroke="hsl(24 70% 60%)" strokeWidth="0.7" strokeDasharray="6 9" opacity="0.55">
            <line x1="0" y1="640" x2="1600" y2="640" className="ab-dash" />
            <line x1="640" y1="0" x2="640" y2="1000" className="ab-dash ab-dash-2" />
          </g>
        </svg>
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(0_0%_6%/0.55)_100%)]" />
      </div>

      <div className="container relative z-10 grid gap-10 lg:grid-cols-5 lg:items-stretch">
        {/* PHOTO COLUMN — full height */}
        <div
          className={`relative lg:col-span-2 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="absolute -inset-4 rounded-3xl bg-[hsl(24_80%_45%/0.18)] blur-3xl" aria-hidden />
          <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <img
              ref={imgRef}
              src={portrait}
              alt="Jádson Castro Santana, Engenheiro Civil especialista em regularização de imóveis"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ objectPosition: "center 18%", transform: "scale(1.04)" }}
            />
            {/* Gradient overlay bottom for legibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

            {/* CREA badge floating */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl bg-black/55 backdrop-blur-md px-4 py-3 ring-1 ring-white/15">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                  CREA-BA
                </p>
                <p className="font-display text-base font-extrabold text-white">
                  051598661-5
                </p>
              </div>
              <ShieldCheck className="h-6 w-6 text-[hsl(24_85%_60%)]" />
            </div>
          </div>
        </div>

        {/* TEXT COLUMN */}
        <div className="lg:col-span-3">
          <div
            className={`transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(24_85%_55%/0.4)] bg-[hsl(24_80%_45%/0.12)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[hsl(24_85%_70%)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(24_85%_60%)]" />
              Sobre o responsável técnico
            </span>
            <h2
              id="about-heading"
              className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.5rem] leading-tight"
            >
              Jádson Castro Santana
            </h2>
            <p className="mt-2 text-base font-medium text-white/65">
              Engenheiro Civil — Especialista em Regularização de Imóveis Urbanos
            </p>
          </div>

          {/* Credentials grid */}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {credentials.map(({ icon: Icon, label, text }, i) => (
              <div
                key={text}
                className={`group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-[hsl(24_85%_55%/0.5)] hover:bg-white/[0.07] hover:shadow-[0_8px_30px_-12px_hsl(24_85%_45%/0.4)] ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(24_80%_45%/0.15)] ring-1 ring-[hsl(24_85%_55%/0.3)] transition-colors group-hover:bg-[hsl(24_80%_45%/0.25)]">
                  <Icon className="h-4 w-4 text-[hsl(24_85%_65%)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/45">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-white/90">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div
            className={`mt-7 space-y-3 text-[15px] leading-relaxed text-white/75 transition-all duration-700 delay-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p>
              Engenheiro civil, pós-graduado em Arquitetura e Engenharia Legal e
              pós-graduando em Building Information Modeling (Master BIM).
            </p>
            <p>
              Atua na orientação e condução de processos de regularização de
              imóveis urbanos, simplificando um tema técnico que muitas vezes é
              tratado com excesso de burocracia.
            </p>
          </div>

          {/* Pillars */}
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {pillars.map(({ emoji, title, desc }, i) => (
              <div
                key={title}
                className={`group rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(24_85%_55%/0.4)] hover:bg-white/[0.06] ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${600 + i * 80}ms` }}
              >
                <div className="text-2xl transition-transform group-hover:scale-110">{emoji}</div>
                <p className="mt-2 font-display text-sm font-bold text-white">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">{desc}</p>
              </div>
            ))}
          </div>

          <div
            className={`mt-8 transition-all duration-700 delay-[900ms] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              asChild
              size="lg"
              id="about-cta"
              className="about-cta-glow bg-[hsl(24_85%_50%)] font-bold text-white hover:bg-[hsl(24_85%_55%)] transition-all hover:scale-[1.02]"
            >
              <a href={consultLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar com Jádson agora
              </a>
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .about-dark {
          background:
            radial-gradient(ellipse at 20% 0%, hsl(24 40% 14%) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 100%, hsl(24 35% 12%) 0%, transparent 50%),
            linear-gradient(180deg, hsl(0 0% 7%) 0%, hsl(0 0% 5%) 100%);
        }
        .about-cta-glow {
          box-shadow: 0 0 0 0 hsl(24 85% 50% / 0.5), 0 10px 30px -10px hsl(24 85% 45% / 0.6);
          animation: about-glow 3s ease-in-out infinite;
        }
        @keyframes about-glow {
          0%, 100% { box-shadow: 0 0 0 0 hsl(24 85% 50% / 0.45), 0 10px 30px -10px hsl(24 85% 45% / 0.55); }
          50%      { box-shadow: 0 0 0 8px hsl(24 85% 50% / 0), 0 14px 40px -10px hsl(24 85% 45% / 0.75); }
        }
        .ab-draw {
          stroke-dasharray: 2400;
          stroke-dashoffset: 2400;
          animation: ab-draw-anim 30s ease-in-out infinite;
        }
        .ab-draw-1 { animation-delay: 0s; }
        .ab-draw-2 { animation-delay: 6s; }
        @keyframes ab-draw-anim {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          10%  { opacity: 1; }
          45%  { stroke-dashoffset: 0; opacity: 1; }
          90%  { stroke-dashoffset: 0; opacity: 0.7; }
          100% { stroke-dashoffset: 0; opacity: 0.7; }
        }
        .ab-dash { animation: ab-dash-anim 24s linear infinite; }
        .ab-dash-2 { animation-duration: 32s; animation-direction: reverse; }
        @keyframes ab-dash-anim {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -120; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-draw, .ab-dash, .about-cta-glow { animation: none !important; }
          .ab-draw { stroke-dashoffset: 0 !important; opacity: 0.7 !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
