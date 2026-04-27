import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Map, Home, CheckCircle2, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Stage visuals ────────────────────────────────────────────────── */

/** Stage 1 — Technical documents pile */
const StageDocuments = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 px-6">
    {/* Stacked paper cards */}
    <div className="relative h-56 w-full max-w-xs">
      {/* Paper 3 — back */}
      <div className="absolute inset-0 top-4 rotate-[-5deg] scale-95 rounded-xl border border-white/10 bg-zinc-800 p-5 shadow-lg">
        <div className="h-2 w-16 rounded-full bg-white/20 mb-2" />
        <div className="h-1.5 w-32 rounded-full bg-white/10 mb-1" />
        <div className="h-1.5 w-24 rounded-full bg-white/10" />
      </div>
      {/* Paper 2 — middle */}
      <div className="absolute inset-0 top-2 rotate-[2deg] rounded-xl border border-white/15 bg-zinc-700 p-5 shadow-lg">
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent/80 mb-2">Matrícula do Imóvel</p>
        <div className="h-1.5 w-3/4 rounded-full bg-white/20 mb-1" />
        <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
        <div className="mt-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full border-2 border-accent/40 flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 text-accent/60" />
          </div>
          <div className="h-1.5 w-20 rounded-full bg-white/15" />
        </div>
      </div>
      {/* Paper 1 — front */}
      <div className="absolute inset-0 rounded-xl border border-white/20 bg-zinc-600 p-5 shadow-xl">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-accent mb-1">Planta Técnica</p>
            <div className="h-1.5 w-28 rounded-full bg-white/25 mb-1" />
            <div className="h-1.5 w-20 rounded-full bg-white/15" />
          </div>
          <FileText className="h-8 w-8 text-accent/60" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-6 rounded border border-white/10 bg-white/5" />
          ))}
        </div>
      </div>
    </div>
    <p className="mt-6 text-sm font-semibold text-white/60">📄 Documentação técnica</p>
  </div>
);

/** Stage 2 — Blueprint / architectural drawing */
const StageBlueprint = () => (
  <div
    className="absolute inset-0 flex flex-col items-center justify-center"
    style={{ background: "#0d2144" }}
  >
    {/* Blueprint grid */}
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
    {/* House outline */}
    <div className="relative z-10 flex flex-col items-center">
      <svg viewBox="0 0 200 160" className="w-52 sm:w-64" fill="none" stroke="white" strokeWidth="1.5">
        {/* Roof */}
        <polyline points="20,80 100,20 180,80" strokeDasharray="6 3" />
        {/* Walls */}
        <rect x="35" y="80" width="130" height="75" strokeDasharray="6 3" />
        {/* Door */}
        <rect x="80" y="110" width="40" height="45" strokeDasharray="4 2" />
        {/* Windows */}
        <rect x="45" y="90" width="25" height="20" strokeDasharray="4 2" />
        <rect x="130" y="90" width="25" height="20" strokeDasharray="4 2" />
        {/* Measurements */}
        <line x1="35" y1="168" x2="165" y2="168" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <line x1="35" y1="165" x2="35" y2="171" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <line x1="165" y1="165" x2="165" y2="171" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      </svg>
      <p className="mt-1 text-[10px] text-white/40 tracking-widest uppercase">8.50m</p>
    </div>
    <p className="relative z-10 mt-5 text-sm font-semibold text-white/70">📐 Análise técnica da planta</p>
  </div>
);

/** Stage 3 — Wireframe structure */
const StageWireframe = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 220 180" className="w-52 sm:w-64" fill="none">
        {/* 3D house wireframe */}
        {/* Front face */}
        <polyline points="30,90 110,30 190,90" stroke="#7A3E0E" strokeWidth="2" />
        <rect x="45" y="90" width="130" height="80" stroke="#7A3E0E" strokeWidth="2" />
        {/* Side face depth suggestion */}
        <line x1="175" y1="90" x2="195" y2="70" stroke="#7A3E0E" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
        <line x1="175" y1="170" x2="195" y2="150" stroke="#7A3E0E" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
        <line x1="195" y1="70" x2="195" y2="150" stroke="#7A3E0E" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
        {/* Roof depth */}
        <line x1="110" y1="30" x2="130" y2="10" stroke="#7A3E0E" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
        <line x1="130" y1="10" x2="195" y2="70" stroke="#7A3E0E" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
        {/* Door */}
        <rect x="90" y="120" width="35" height="50" stroke="rgba(122,62,14,0.5)" strokeWidth="1.5" />
        {/* Windows */}
        <rect x="50" y="100" width="28" height="22" stroke="rgba(122,62,14,0.5)" strokeWidth="1.5" />
        <rect x="140" y="100" width="28" height="22" stroke="rgba(122,62,14,0.5)" strokeWidth="1.5" />
        {/* Grid dots at intersections */}
        {[[30,90],[110,30],[190,90],[45,90],[175,90],[45,170],[175,170]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#7A3E0E" opacity="0.8" />
        ))}
      </svg>
    </div>
    <p className="mt-4 text-sm font-semibold text-white/60">🔧 Planejamento estrutural</p>
  </div>
);

/** Stage 4 — House taking shape */
const StageBuilding = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 170" className="w-52 sm:w-64">
        {/* Filled walls */}
        <rect x="30" y="90" width="140" height="75" fill="#3f3f46" stroke="#7A3E0E" strokeWidth="1.5" />
        {/* Filled roof */}
        <polygon points="15,90 100,22 185,90" fill="#52525b" stroke="#7A3E0E" strokeWidth="1.5" />
        {/* Door — solid */}
        <rect x="80" y="118" width="40" height="47" fill="#27272a" stroke="rgba(122,62,14,0.7)" strokeWidth="1.5" />
        {/* Windows — lit up in accent */}
        <rect x="38" y="98" width="30" height="24" fill="rgba(122,62,14,0.25)" stroke="#7A3E0E" strokeWidth="1.5" />
        <rect x="132" y="98" width="30" height="24" fill="rgba(122,62,14,0.25)" stroke="#7A3E0E" strokeWidth="1.5" />
        {/* Construction lines still visible */}
        <line x1="30" y1="90" x2="15" y2="90" stroke="#7A3E0E" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
        <line x1="170" y1="90" x2="185" y2="90" stroke="#7A3E0E" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
      </svg>
    </div>
    <p className="mt-4 text-sm font-semibold text-white/60">🏗️ Regularização em andamento</p>
  </div>
);

/** Stage 5 — Complete + Regularizado seal */
const StageComplete = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 168" className="w-52 sm:w-64">
        {/* House — fully solid, premium feel */}
        <polygon points="14,90 100,20 186,90" fill="#7A3E0E" />
        <rect x="28" y="90" width="144" height="75" fill="#5c2e08" />
        {/* Door */}
        <rect x="79" y="116" width="42" height="49" rx="3" fill="#3d1f05" />
        <circle cx="117" cy="141" r="2.5" fill="rgba(255,255,255,0.4)" />
        {/* Windows */}
        <rect x="38" y="98" width="32" height="26" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <rect x="130" y="98" width="32" height="26" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        {/* Shine on roof */}
        <polygon points="14,90 100,20 186,90" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      </svg>
      {/* Approved seal */}
      <div className="mt-4 flex items-center gap-2.5 rounded-full border-2 border-emerald-500/60 bg-emerald-500/15 px-5 py-2 shadow-lg shadow-emerald-500/10">
        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
        <span className="text-sm font-extrabold tracking-wide text-emerald-300">
          Imóvel Regularizado
        </span>
      </div>
    </div>
    <p className="mt-4 text-sm font-semibold text-white/60">🏠 Processo concluído</p>
  </div>
);

/* ─── Main animation component ─────────────────────────────────────── */

const stages = [
  StageDocuments,
  StageBlueprint,
  StageWireframe,
  StageBuilding,
  StageComplete,
] as const;

const stageLabels = [
  "Documentação",
  "Análise técnica",
  "Planejamento",
  "Regularização",
  "Concluído",
];

interface HeroAnimationProps {
  /** If true, device prefers reduced motion — show static final stage */
  reducedMotion?: boolean;
}

const HeroAnimation = ({ reducedMotion = false }: HeroAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState<number>(
    reducedMotion ? stages.length - 1 : 0
  );
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const els = stageRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length !== stages.length) return;

    // Initial state — only stage 0 visible
    gsap.set(els, { opacity: 0, scale: 1.03 });
    gsap.set(els[0], { opacity: 1, scale: 1 });

    // Build timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        once: true,
      },
      onUpdate() {
        // Update progress bar
        if (progressRef.current) {
          progressRef.current.style.width = `${tl.progress() * 100}%`;
        }
      },
    });

    tlRef.current = tl;

    // Auto-play through stages: each stage visible for 1s, crossfade 0.5s
    stages.forEach((_, i) => {
      if (i === 0) return; // stage 0 already visible
      tl.to(els[i - 1], { opacity: 0, scale: 0.97, duration: 0.5, ease: "power2.in" })
        .to(
          els[i],
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            onStart: () => setCurrentStage(i),
          },
          "<0.2"
        )
        .addPause(`+=${i === stages.length - 1 ? 0 : 1}`);
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <div className="flex flex-col gap-3">
      {/* Animation container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl shadow-elegant ring-1 ring-white/15"
        style={{ aspectRatio: "4/3" }}
      >
        {stages.map((Stage, i) => (
          <div
            key={i}
            ref={(el) => { stageRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{
              opacity: reducedMotion ? (i === stages.length - 1 ? 1 : 0) : i === 0 ? 1 : 0,
            }}
            aria-hidden={currentStage !== i}
          >
            <Stage />
          </div>
        ))}

        {/* Progress bar */}
        {!reducedMotion && (
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/10">
            <div
              ref={progressRef}
              className="h-full bg-accent transition-[width] duration-100"
              style={{ width: "0%" }}
            />
          </div>
        )}

        {/* Floating badge — Consultoria gratuita */}
        <div className="absolute right-3 top-3 rounded-lg bg-accent px-3 py-1.5 text-center shadow-lg">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-accent-foreground">
            Consultoria
          </p>
          <p className="text-sm font-extrabold text-accent-foreground leading-none">GRATUITA</p>
        </div>
      </div>

      {/* Stage indicator dots */}
      {!reducedMotion && (
        <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Etapas da regularização">
          {stageLabels.map((label, i) => (
            <div
              key={label}
              role="tab"
              aria-selected={currentStage === i}
              aria-label={label}
              title={label}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentStage === i
                  ? "w-6 bg-accent"
                  : i < currentStage
                  ? "w-3 bg-accent/50"
                  : "w-3 bg-white/20"
              }`}
            />
          ))}
        </div>
      )}

      {/* Current stage label */}
      {!reducedMotion && (
        <p className="text-center text-xs font-medium text-primary-foreground/60">
          {stageLabels[currentStage]}
        </p>
      )}
    </div>
  );
};

export default HeroAnimation;
