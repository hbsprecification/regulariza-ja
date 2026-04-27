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
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.4 } });

      // Entrance of the image - subtle fade in
      tl.from(imageRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: 0.5,
      });

      // Lines "drawing" animation
      const paths = linesRef.current?.querySelectorAll("path");
      if (paths) {
        tl.from(paths, {
          strokeDashoffset: 400,
          opacity: 0,
          stagger: 0.05,
          duration: 0.4,
        }, "-=0.3");
      }

      // Measures popping up
      if (measuresRef.current) {
        tl.from(measuresRef.current.children, {
          scale: 0,
          opacity: 0,
          stagger: 0.05,
          duration: 0.3,
        }, "-=0.2");
      }

      // Seal appearing
      tl.from(badgeRef.current, {
        scale: 0.5,
        rotate: -15,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.5)",
      }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[4/4] w-full max-w-[500px] mx-auto overflow-hidden rounded-2xl bg-primary/20 shadow-2xl ring-1 ring-white/10 sm:aspect-[4/3] lg:max-w-none"
    >
      {/* Background Engineer Image */}
      <img
        ref={imageRef}
        src={jadsonHero}
        alt="Engenheiro Jádson Castro"
        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />

      {/* Decorative Blueprint Lines Overlay */}
      <svg
        ref={linesRef}
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main framing lines */}
        <path
          d="M 40,40 L 360,40 M 360,40 L 360,360 M 360,360 L 40,360 M 40,360 L 40,40"
          fill="none"
          stroke="rgba(0, 242, 255, 0.4)"
          strokeWidth="1"
          strokeDasharray="400"
          className="opacity-40"
        />
        
        {/* Technical crosshairs/marks */}
        <path d="M 20,40 L 60,40 M 40,20 L 40,60" stroke="rgba(0, 242, 255, 0.6)" strokeWidth="0.5" strokeDasharray="400" />
        <path d="M 340,40 L 380,40 M 360,20 L 360,60" stroke="rgba(0, 242, 255, 0.6)" strokeWidth="0.5" strokeDasharray="400" />
        <path d="M 20,360 L 60,360 M 40,340 L 40,380" stroke="rgba(0, 242, 255, 0.6)" strokeWidth="0.5" strokeDasharray="400" />
        <path d="M 340,360 L 380,360 M 360,340 L 360,380" stroke="rgba(0, 242, 255, 0.6)" strokeWidth="0.5" strokeDasharray="400" />
        
        {/* Architectural dimension lines */}
        <path d="M 80,60 L 320,60" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" strokeDasharray="5,5" />
        <path d="M 340,100 L 340,300" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" strokeDasharray="5,5" />
      </svg>

      {/* Measures labels */}
      <div ref={measuresRef} className="pointer-events-none absolute inset-0">
        <div className="absolute left-[35%] top-[12%] rounded-sm border border-cyan-400/30 bg-black/60 px-1.5 py-0.5 backdrop-blur-sm">
          <span className="text-[10px] font-mono font-bold text-cyan-300">12.00m</span>
        </div>
        <div className="absolute right-[8%] top-[45%] rounded-sm border border-cyan-400/30 bg-black/60 px-1.5 py-0.5 backdrop-blur-sm origin-center" style={{ transform: 'rotate(90deg)' }}>
          <span className="text-[10px] font-mono font-bold text-cyan-300">8.50m</span>
        </div>
      </div>

      {/* SEAL ANIMATED */}
      <div
        ref={badgeRef}
        className="absolute bottom-6 right-6 flex items-center gap-2.5 rounded-full border border-emerald-400/40 bg-[#064e3b]/80 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-shadow duration-300 hover:shadow-emerald-500/20"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-white">
          Imóvel Regularizado
        </span>
      </div>

      {/* Top HUD decoration */}
      <div className="absolute left-6 top-6 flex flex-col gap-1 opacity-40">
        <div className="h-[1px] w-8 bg-cyan-400"></div>
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">Scan Ativo</p>
      </div>

      {/* Bottom HUD decoration */}
      <div className="absolute bottom-6 left-6 opacity-30">
        <p className="text-[8px] font-mono text-white/80">LAT: -14.7912 | LONG: -39.2853</p>
      </div>
    </div>
  );
}
