import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Blueprint house animation.
 *
 * Technique: SVG strokeDashoffset "draw" effect.
 * Each <path> gets strokeDasharray = its own total length,
 * and strokeDashoffset animated from length → 0, revealing
 * the stroke progressively like a pen drawing.
 *
 * Order:
 *  1. Grid / paper appear
 *  2. Ground line
 *  3. Left + right walls rise
 *  4. Roof left + right slopes
 *  5. Chimney
 *  6. Door outline
 *  7. Window outlines
 *  8. Dimension lines
 *  9. Annotations + title block
 * 10. "Imóvel Regularizado" seal
 */
const HeroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const annotationsRef = useRef<SVGGElement>(null);

  /* ── One ref per drawable path ─────────────────────────────── */
  const rGround    = useRef<SVGPathElement>(null);
  const rWallL     = useRef<SVGPathElement>(null);
  const rWallR     = useRef<SVGPathElement>(null);
  const rRoofL     = useRef<SVGPathElement>(null);
  const rRoofR     = useRef<SVGPathElement>(null);
  const rChimL     = useRef<SVGPathElement>(null);
  const rChimR     = useRef<SVGPathElement>(null);
  const rChimTop   = useRef<SVGPathElement>(null);
  const rDoorL     = useRef<SVGPathElement>(null);
  const rDoorR     = useRef<SVGPathElement>(null);
  const rDoorTop   = useRef<SVGPathElement>(null);
  const rWinL      = useRef<SVGPathElement>(null);
  const rWinR      = useRef<SVGPathElement>(null);
  const rDimH      = useRef<SVGPathElement>(null);
  const rDimV      = useRef<SVGPathElement>(null);

  useEffect(() => {
    const drawPaths: SVGPathElement[] = [
      rGround, rWallL, rWallR,
      rRoofL, rRoofR,
      rChimL, rChimR, rChimTop,
      rDoorL, rDoorR, rDoorTop,
      rWinL, rWinR,
      rDimH, rDimV,
    ]
      .map((r) => r.current)
      .filter((el): el is SVGPathElement => el !== null);

    /* ── 1. Measure & initialise stroke-dash ─────────────────── */
    drawPaths.forEach((path) => {
      try {
        const len = path.getTotalLength();
        if (len > 0) {
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        }
      } catch {
        // Older environments: just show the path immediately
        gsap.set(path, { opacity: 1 });
      }
    });

    // Hide annotations & seal initially
    if (annotationsRef.current) gsap.set(annotationsRef.current, { opacity: 0 });
    if (sealRef.current)        gsap.set(sealRef.current, { opacity: 0, scale: 0.85, y: 8 });

    /* ── 2. Helper: draw one path ────────────────────────────── */
    const draw = (ref: React.RefObject<SVGPathElement | null>, dur = 0.35) =>
      gsap.to(ref.current, {
        strokeDashoffset: 0,
        duration: dur,
        ease: "power2.inOut",
      });

    /* ── 3. Build timeline ───────────────────────────────────── */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 78%",
        once: true,
      },
    });

    tl
      // Container fades in
      .fromTo(
        containerRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      )

      // Ground — anchor
      .add(draw(rGround, 0.45))

      // Walls rise (parallel, slightly staggered)
      .add(draw(rWallL, 0.45), "<0.15")
      .add(draw(rWallR, 0.45), "<0.05")

      // Roof slopes (parallel)
      .add(draw(rRoofL, 0.4), ">0.05")
      .add(draw(rRoofR, 0.4), "<")

      // Chimney (sequential, quick)
      .add(draw(rChimL, 0.22), ">0.05")
      .add(draw(rChimR, 0.22), "<")
      .add(draw(rChimTop, 0.12), ">")

      // Door
      .add(draw(rDoorL, 0.22), ">0.08")
      .add(draw(rDoorR, 0.22), "<")
      .add(draw(rDoorTop, 0.15), ">")

      // Windows (parallel)
      .add(draw(rWinL, 0.3), ">0.08")
      .add(draw(rWinR, 0.3), "<")

      // Dimension lines (parallel)
      .add(draw(rDimH, 0.3), ">0.08")
      .add(draw(rDimV, 0.3), "<")

      // Annotations block
      .to(
        annotationsRef.current,
        { opacity: 1, duration: 0.35, ease: "power2.out" },
        ">0.08"
      )

      // Seal pops in
      .to(
        sealRef.current,
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" },
        ">0.1"
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ── SVG coordinate system ────────────────────────────────────
   *  viewBox 0 0 400 310
   *  Ground:   y=238
   *  House:    x=65–335  (270px wide)
   *  Walls:    height 118px  →  top y=120
   *  Roof peak: x=200  y=38
   *  Chimney:  x=255–278  y=72–120
   *  Door:     x=176–224  y=185–238  (48px wide, 53px tall)
   *  Win L:    x=88–132   y=148–180
   *  Win R:    x=268–312  y=148–180
   *  Dim H:    y=255
   *  Dim V:    x=350
   ─────────────────────────────────────────────────────────── */

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl shadow-elegant ring-1 ring-white/10"
      aria-label="Animação ilustrativa de projeto arquitetônico"
      role="img"
    >
      {/* ── Blueprint dark paper ── */}
      <div className="absolute inset-0 bg-[#0b1929]" aria-hidden />

      {/* ── SVG drawing ─────────────────────────────────────── */}
      <svg
        viewBox="0 0 400 310"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full"
      >
        <defs>
          {/* Fine grid */}
          <pattern id="fine-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#3a6ea5"
              strokeWidth="0.25"
              opacity="0.55"
            />
          </pattern>
          {/* Major grid */}
          <pattern id="major-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="#3a6ea5"
              strokeWidth="0.6"
              opacity="0.35"
            />
          </pattern>
        </defs>

        {/* Grid layers */}
        <rect width="400" height="310" fill="url(#fine-grid)" />
        <rect width="400" height="310" fill="url(#major-grid)" />

        {/* ── STRUCTURAL PATHS (draw effect) ──────────────── */}

        {/* Ground line */}
        <path
          ref={rGround}
          d="M 28,238 L 372,238"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Left wall — M x,bottom L x,top  → draws upward */}
        <path
          ref={rWallL}
          d="M 65,238 L 65,120"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right wall */}
        <path
          ref={rWallR}
          d="M 335,238 L 335,120"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Roof left slope */}
        <path
          ref={rRoofL}
          d="M 65,120 L 200,38"
          stroke="#c87941"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Roof right slope */}
        <path
          ref={rRoofR}
          d="M 335,120 L 200,38"
          stroke="#c87941"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Chimney left vertical */}
        <path
          ref={rChimL}
          d="M 258,120 L 258,72"
          stroke="#87ceeb"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Chimney right vertical */}
        <path
          ref={rChimR}
          d="M 278,120 L 278,72"
          stroke="#87ceeb"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Chimney top horizontal */}
        <path
          ref={rChimTop}
          d="M 255,72 L 281,72"
          stroke="#87ceeb"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Door left vertical */}
        <path
          ref={rDoorL}
          d="M 176,238 L 176,185"
          stroke="#87ceeb"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Door right vertical */}
        <path
          ref={rDoorR}
          d="M 224,238 L 224,185"
          stroke="#87ceeb"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Door top horizontal */}
        <path
          ref={rDoorTop}
          d="M 176,185 L 224,185"
          stroke="#87ceeb"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Window left (closed rectangle path) */}
        <path
          ref={rWinL}
          d="M 88,148 L 132,148 L 132,180 L 88,180 L 88,148"
          stroke="#87ceeb"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Window right */}
        <path
          ref={rWinR}
          d="M 268,148 L 312,148 L 312,180 L 268,180 L 268,148"
          stroke="#87ceeb"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dimension line horizontal */}
        <path
          ref={rDimH}
          d="M 65,256 L 335,256"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Dimension line vertical */}
        <path
          ref={rDimV}
          d="M 352,120 L 352,238"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* ── ANNOTATIONS (fade in) ────────────────────────── */}
        <g ref={annotationsRef}>
          {/* Dimension ticks horizontal */}
          <line x1="65"  y1="253" x2="65"  y2="259" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <line x1="335" y1="253" x2="335" y2="259" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <text x="200" y="267" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5" fontFamily="monospace">14.00m</text>

          {/* Dimension ticks vertical */}
          <line x1="349" y1="120" x2="355" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <line x1="349" y1="238" x2="355" y2="238" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <text
            x="365" y="179"
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            fontSize="8.5"
            fontFamily="monospace"
            transform="rotate(90,365,179)"
          >
            5.90m
          </text>

          {/* Window cross-hairs (interior detail) */}
          <line x1="110" y1="148" x2="110" y2="180" stroke="#87ceeb" strokeWidth="0.7" opacity="0.5" />
          <line x1="88"  y1="164" x2="132" y2="164" stroke="#87ceeb" strokeWidth="0.7" opacity="0.5" />
          <line x1="290" y1="148" x2="290" y2="180" stroke="#87ceeb" strokeWidth="0.7" opacity="0.5" />
          <line x1="268" y1="164" x2="312" y2="164" stroke="#87ceeb" strokeWidth="0.7" opacity="0.5" />

          {/* Door handle dot */}
          <circle cx="218" cy="213" r="2.5" fill="#87ceeb" opacity="0.7" />

          {/* Title block border */}
          <rect x="10" y="275" width="380" height="28" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
          <line x1="10" y1="283" x2="390" y2="283" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

          {/* Title block text */}
          <text x="16" y="280" fill="rgba(255,255,255,0.5)" fontSize="6.5" fontFamily="monospace" letterSpacing="0.3">
            PLANTA ARQUITETÔNICA
          </text>
          <text x="16" y="295" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="monospace">
            ENG. CIV. JÁDSON CASTRO SANTANA — CREA-BA 051598661-5
          </text>
          <text x="374" y="295" textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="monospace">
            ESC. 1:50
          </text>

          {/* Label: Planta */}
          <text x="100" y="135" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">
            SALA
          </text>
          <text x="200" y="220" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">
            CIRCULAÇÃO
          </text>
        </g>
      </svg>

      {/* ── Imóvel Regularizado seal ──────────────────────── */}
      <div
        ref={sealRef}
        className="absolute bottom-12 right-4 flex items-center gap-2 rounded-full border-2 border-emerald-400/60 bg-emerald-500/20 px-4 py-2 shadow-lg backdrop-blur-sm"
      >
        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
        <span className="text-xs font-extrabold tracking-wide text-emerald-300">
          Imóvel Regularizado
        </span>
      </div>

      {/* ── Consultoria gratuita badge ────────────────────── */}
      <div className="absolute right-3 top-3 rounded-lg bg-accent px-3 py-1.5 text-center shadow-lg">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-accent-foreground">
          Consultoria
        </p>
        <p className="text-sm font-extrabold leading-none text-accent-foreground">
          GRATUITA
        </p>
      </div>
    </div>
  );
};

export default HeroAnimation;
