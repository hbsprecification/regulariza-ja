import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

function Counter({ target, prefix = "", suffix = "", started }: { target: number; prefix?: string; suffix?: string; started: boolean }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Quartic ease out
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

  return <span>{prefix}{count}{suffix}</span>;
}

const stats = [
  { value: 170, suffix: "+", stringValue: null, label: "ARTs registradas" },
  { value: 9, suffix: "+", stringValue: null, label: "anos de experiência" },
  { value: null, stringValue: "Brasil", label: "Atendimento em todo o território nacional" },
  { value: null, stringValue: "CREA", label: "Profissional com registro ativo validado" },
];

const StatsBar = () => {
  const sectionRef = useInView<HTMLDivElement>(0.3);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // We use IntersectionObserver logic from useInView to trigger the counter
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    const el = document.getElementById("stats-trigger");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-trigger"
      className="relative overflow-hidden py-16 lg:py-20 text-white"
      aria-label="Autoridade Técnica"
    >
      <div className="absolute inset-0 gradient-subtle" aria-hidden />
      <div className="absolute inset-0 blueprint-bg" aria-hidden />

      <div className="container relative z-10">
        <div ref={sectionRef} className="reveal-stagger grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="font-display text-[3.5rem] font-black leading-none tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] lg:text-[4rem]">
                {stat.value !== null ? (
                  <Counter target={stat.value} suffix={stat.suffix} started={started} />
                ) : (
                  <span className="text-4xl lg:text-[2.8rem]">{stat.stringValue}</span>
                )}
              </div>
              <p className="mt-4 text-sm font-bold leading-[1.6] text-gray-400 uppercase tracking-widest text-[10px] drop-shadow-sm">
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
