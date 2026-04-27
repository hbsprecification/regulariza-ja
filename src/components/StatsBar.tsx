import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileCheck2, Building2, GraduationCap, MapPin, type LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: number | null;
  prefix?: string;
  suffix?: string;
  staticLabel?: string;
  label: string;
  Icon: LucideIcon;
};

const stats: Stat[] = [
  { value: 170, prefix: "+", label: "ARTs registradas", Icon: FileCheck2 },
  { value: 350, prefix: "+", label: "Imóveis analisados", Icon: Building2 },
  { value: 9, suffix: " anos", label: "De experiência profissional", Icon: GraduationCap },
  { value: null, staticLabel: "Brasil", label: "Atendimento em todo o país", Icon: MapPin },
];

function Counter({
  target,
  prefix = "",
  suffix = "",
  started,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, started]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const StatsBar = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate cards in from below on scroll
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".stat-card"),
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => setStarted(true),
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border bg-secondary/30 py-14 lg:py-20"
      aria-label="Números do profissional"
    >
      {/* Blueprint background — section-scoped */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          viewBox="0 0 1600 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="sb-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="hsl(0 0% 55%)" strokeWidth="0.5" />
            </pattern>
            <pattern id="sb-grid-major" width="160" height="160" patternUnits="userSpaceOnUse">
              <path d="M 160 0 L 0 0 0 160" fill="none" stroke="hsl(0 0% 45%)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sb-grid)" />
          <rect width="100%" height="100%" fill="url(#sb-grid-major)" opacity="0.6" />

          <g stroke="hsl(0 0% 50%)" fill="none" strokeWidth="1">
            <rect x="160" y="120" width="260" height="180" className="sb-draw sb-draw-1" />
            <line x1="290" y1="120" x2="290" y2="220" className="sb-draw sb-draw-1" />
            <line x1="160" y1="220" x2="290" y2="220" className="sb-draw sb-draw-1" />

            <polyline
              points="1180,140 1420,140 1420,300 1280,300 1280,360 1100,360 1100,220 1180,220 1180,140"
              className="sb-draw sb-draw-2"
            />

            <rect x="700" y="380" width="200" height="120" className="sb-draw sb-draw-3" />
            <line x1="800" y1="380" x2="800" y2="500" className="sb-draw sb-draw-3" />
          </g>

          <g stroke="hsl(0 0% 50%)" strokeWidth="0.6" strokeDasharray="5 9" opacity="0.45" fill="none">
            <line x1="0" y1="300" x2="1600" y2="300" className="sb-dash" />
            <line x1="800" y1="0" x2="800" y2="600" className="sb-dash sb-dash-2" />
          </g>

          {/* Measurement circles — very subtle */}
          <g stroke="hsl(0 0% 50%)" fill="none" opacity="0.35">
            <circle cx="160" cy="210" r="40" strokeWidth="0.5" strokeDasharray="3 5" />
            <circle cx="800" cy="300" r="55" strokeWidth="0.5" strokeDasharray="3 5" />
            <circle cx="1300" cy="220" r="45" strokeWidth="0.5" strokeDasharray="3 5" />
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.Icon;
            return (
              <div
                key={stat.label}
                className="stat-card group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card/80 px-5 py-8 text-center shadow-sm backdrop-blur-sm opacity-0 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <p className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  {stat.value !== null ? (
                    <Counter
                      target={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      started={started}
                    />
                  ) : (
                    <span>{stat.staticLabel}</span>
                  )}
                </p>
                <p className="text-sm font-medium leading-tight text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .sb-draw {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: sb-draw-anim 28s ease-in-out infinite;
        }
        .sb-draw-1 { animation-delay: 0s; }
        .sb-draw-2 { animation-delay: 4s; }
        .sb-draw-3 { animation-delay: 9s; }
        @keyframes sb-draw-anim {
          0%   { stroke-dashoffset: 1400; opacity: 0; }
          10%  { opacity: 0.7; }
          45%  { stroke-dashoffset: 0; opacity: 0.7; }
          100% { stroke-dashoffset: 0; opacity: 0.55; }
        }
        .sb-dash { animation: sb-dash-anim 24s linear infinite; }
        .sb-dash-2 { animation-duration: 32s; animation-direction: reverse; }
        @keyframes sb-dash-anim {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -80; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-draw, .sb-dash {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 0.5 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsBar;
