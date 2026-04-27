import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CheckCircle2 } from "lucide-react";
import jadsonHero from "@/assets/jadson-hero-2.jpg";

export default function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const linesRef = useRef<SVGSVGElement>(null);
  const measuresRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.4 } });

      tl.from(imageRef.current, { scale: 1.2, opacity: 0, duration: 0.6 });

      const paths = linesRef.current?.querySelectorAll("path");
      if (paths) {
        tl.from(paths, { strokeDashoffset: 400, opacity: 0, stagger: 0.05, duration: 0.4 }, "-=0.3");
      }

      if (measuresRef.current) {
        tl.from(measuresRef.current.children, { scale: 0, opacity: 0, stagger: 0.05, duration: 0.3 }, "-=0.2");
      }

      tl.from(badgeRef.current, {
        scale: 0.5, rotate: -15, opacity: 0, duration: 0.4, ease: "back.out(1.5)",
      }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[4/5] w-full max-w-[420px] mx-auto overflow-hidden rounded-2xl bg-primary/20 shadow-2xl ring-1 ring-white/10 lg:max-w-none"
    >
      {/* Engineer Photo */}
      <img
        ref={imageRef}
        src={jadsonHero}
        alt="Engenheiro Jádson Castro"
        className="h-full w-full object-cover object-[center_12%] scale-110 transition-transform duration-700 group-hover:scale-[1.15]"
      />

      {/* Scan line effect */}
      <div className="scan-line" style={{ animationDelay: "1.2s" }} />
      <div className="scan-line-glow" style={{ animationDelay: "1.2s" }} />

      {/* Corner brackets */}
      <div className="corner-bracket tl" />
      <div className="corner-bracket tr" />
      <div className="corner-bracket bl" />
      <div className="corner-bracket br" />

      {/* Blueprint framing lines */}
      <svg
        ref={linesRef}
        viewBox="0 0 400 500"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 30,30 L 370,30 L 370,470 L 30,470 Z" fill="none" stroke="rgba(0, 242, 255, 0.35)" strokeWidth="0.8" strokeDasharray="400" />
        <path d="M 15,30 L 45,30 M 30,15 L 30,45" stroke="rgba(0, 242, 255, 0.55)" strokeWidth="0.5" strokeDasharray="400" />
        <path d="M 355,30 L 385,30 M 370,15 L 370,45" stroke="rgba(0, 242, 255, 0.55)" strokeWidth="0.5" strokeDasharray="400" />
        <path d="M 15,470 L 45,470 M 30,455 L 30,485" stroke="rgba(0, 242, 255, 0.55)" strokeWidth="0.5" strokeDasharray="400" />
        <path d="M 355,470 L 385,470 M 370,455 L 370,485" stroke="rgba(0, 242, 255, 0.55)" strokeWidth="0.5" strokeDasharray="400" />
        <path d="M 30,360 L 370,360" stroke="rgba(0, 242, 255, 0.2)" strokeWidth="0.5" strokeDasharray="6,8" />
      </svg>

      {/* Measure labels */}
      <div ref={measuresRef} className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] bottom-[22%] rounded-sm border border-cyan-400/30 bg-black/70 px-1.5 py-0.5 backdrop-blur-sm">
          <span className="text-[10px] font-mono font-bold text-cyan-300">12.00m</span>
        </div>
        <div className="absolute right-[8%] top-[38%] rounded-sm border border-cyan-400/30 bg-black/70 px-1.5 py-0.5 backdrop-blur-sm origin-center" style={{ transform: "rotate(90deg)" }}>
          <span className="text-[10px] font-mono font-bold text-cyan-300">8.50m</span>
        </div>
      </div>

      {/* Imóvel Regularizado seal */}
      <div
        ref={badgeRef}
        className="absolute bottom-5 right-5 flex items-center gap-2.5 rounded-full border border-emerald-400/40 bg-[#064e3b]/85 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(52,211,153,0.18)]"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-white">
          Imóvel Regularizado
        </span>
      </div>

      {/* Top-left HUD label */}
      <div className="absolute left-5 top-5 flex flex-col gap-0.5 opacity-50">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/80">Scan Ativo</p>
        </div>
      </div>

      {/* Bottom-left coordinates */}
      <div className="absolute bottom-5 left-5 opacity-25">
        <p className="text-[8px] font-mono text-white/80">LAT: -14.7912 | LONG: -39.2853</p>
      </div>
    </div>
  );
}
