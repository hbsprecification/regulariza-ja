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
      className="border-y border-border bg-secondary/40 py-12 lg:py-16"
      aria-label="Números do profissional"
    >
      <div className="container">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-4 py-6 text-center shadow-card opacity-0"
            >
              <span className="text-3xl">{stat.icon}</span>
              <p className="font-display text-3xl font-extrabold text-accent sm:text-4xl">
                <Counter target={stat.value} suffix={stat.suffix} started={started} />
              </p>
              <p className="text-xs font-medium leading-tight text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
