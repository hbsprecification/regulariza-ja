import { useEffect, useRef, useState } from "react";

/**
 * Premium animated architectural blueprint background.
 * - SVG grid + drawing animations (CSS only, GPU-friendly)
 * - Parallax via transform: translateY (compositor thread)
 * - Node/particle dots on intersections
 * - Respects prefers-reduced-motion
 * - Opacity 5–8% — never competes with content
 */
const BlueprintBackground = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 768px)");
    setReducedMotion(mq.matches);
    setIsMobile(mqMobile.matches);

    const handleRM = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handleRM);
    mqMobile.addEventListener("change", handleMobile);
    return () => {
      mq.removeEventListener("change", handleRM);
      mqMobile.removeEventListener("change", handleMobile);
    };
  }, []);

  // Parallax: move background at 30% scroll speed (desktop only)
  useEffect(() => {
    if (reducedMotion || isMobile || !layerRef.current) return;
    let rafId: number;
    let lastY = 0;

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY * 0.28;
        if (Math.abs(y - lastY) < 0.5) return;
        lastY = y;
        if (layerRef.current) {
          layerRef.current.style.transform = `translateY(${y}px)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, isMobile]);

  const animate = !reducedMotion;

  // Intersection points for particle nodes
  const nodes = [
    { cx: 120, cy: 120 }, { cx: 440, cy: 120 }, { cx: 120, cy: 340 }, { cx: 440, cy: 340 },
    { cx: 280, cy: 120 }, { cx: 280, cy: 240 }, { cx: 120, cy: 240 },
    { cx: 1080, cy: 180 }, { cx: 1380, cy: 180 }, { cx: 1380, cy: 360 },
    { cx: 1200, cy: 180 }, { cx: 1200, cy: 360 }, { cx: 1020, cy: 260 },
    { cx: 180, cy: 700 }, { cx: 420, cy: 700 }, { cx: 180, cy: 860 }, { cx: 420, cy: 860 }, { cx: 300, cy: 780 },
    { cx: 1100, cy: 820 }, { cx: 1260, cy: 720 }, { cx: 1420, cy: 820 }, { cx: 1420, cy: 900 }, { cx: 1100, cy: 900 },
    { cx: 600, cy: 0 }, { cx: 600, cy: 600 }, { cx: 800, cy: 520 },
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      {/* Parallax layer */}
      <div ref={layerRef} className="absolute inset-0 will-change-transform">
        <svg
          className="absolute inset-0 h-[130%] w-full opacity-[0.065] sm:opacity-[0.08]"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fine 40px grid */}
            <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.4" />
            </pattern>
            {/* Major 200px grid */}
            <pattern id="bp-grid-major" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.9" />
            </pattern>
          </defs>

          {/* Grid layers */}
          <rect width="100%" height="100%" fill="url(#bp-grid)" />
          <rect width="100%" height="100%" fill="url(#bp-grid-major)" opacity="0.55" />

          <g
            stroke="hsl(var(--accent))"
            fill="none"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="13"
          >
            {/* === House plan #1 (top-left) === */}
            <g strokeWidth="1.4" className={animate ? "bp-draw bp-draw-1" : ""}>
              <rect x="120" y="120" width="320" height="220" />
              <line x1="280" y1="120" x2="280" y2="240" />
              <line x1="120" y1="240" x2="280" y2="240" />
              <line x1="280" y1="200" x2="440" y2="200" />
              <path d="M 200 240 A 30 30 0 0 1 230 270" />
              {/* window notch */}
              <line x1="350" y1="120" x2="350" y2="130" />
              <line x1="420" y1="120" x2="420" y2="130" />
            </g>
            {/* dim lines */}
            <g strokeWidth="0.7" opacity="0.8">
              <line x1="120" y1="98" x2="440" y2="98" />
              <line x1="120" y1="90" x2="120" y2="106" />
              <line x1="440" y1="90" x2="440" y2="106" />
              <line x1="456" y1="120" x2="456" y2="340" />
              <line x1="448" y1="120" x2="464" y2="120" />
              <line x1="448" y1="340" x2="464" y2="340" />
            </g>
            <text x="280" y="89" textAnchor="middle" fill="hsl(var(--accent))" stroke="none">10.50m</text>
            <text x="468" y="235" textAnchor="start" fill="hsl(var(--accent))" stroke="none">8.20m</text>

            {/* === House plan #2 (right) === */}
            <g strokeWidth="1.4" className={animate ? "bp-draw bp-draw-2" : ""}>
              <polyline points="1080,180 1380,180 1380,360 1200,360 1200,420 1020,420 1020,260 1080,260 1080,180" />
              <line x1="1200" y1="180" x2="1200" y2="360" />
              <line x1="1080" y1="260" x2="1200" y2="260" />
              {/* window notches */}
              <line x1="1120" y1="180" x2="1120" y2="190" />
              <line x1="1160" y1="180" x2="1160" y2="190" />
            </g>
            <g strokeWidth="0.7" opacity="0.8">
              <line x1="1020" y1="440" x2="1380" y2="440" />
              <line x1="1020" y1="432" x2="1020" y2="448" />
              <line x1="1380" y1="432" x2="1380" y2="448" />
            </g>
            <text x="1200" y="462" textAnchor="middle" fill="hsl(var(--accent))" stroke="none">12.40m</text>

            {/* === Dotted division lines === */}
            <g strokeWidth="0.8" strokeDasharray="6 9" opacity="0.6">
              <line x1="0" y1="600" x2="1600" y2="600" className={animate ? "bp-dash" : ""} />
              <line x1="600" y1="0" x2="600" y2="1000" className={animate ? "bp-dash bp-dash-2" : ""} />
            </g>

            {/* === Lower-left structure === */}
            <g strokeWidth="1.4" className={animate ? "bp-draw bp-draw-3" : ""}>
              <rect x="180" y="700" width="240" height="160" />
              <line x1="180" y1="780" x2="420" y2="780" />
              <line x1="300" y1="700" x2="300" y2="780" />
            </g>
            <text x="300" y="688" textAnchor="middle" fill="hsl(var(--accent))" stroke="none">7.80m</text>
            <text x="158" y="785" textAnchor="end" fill="hsl(var(--accent))" stroke="none">5.20m</text>

            {/* === Lower-right pitched roof === */}
            <g strokeWidth="1.4" className={animate ? "bp-draw bp-draw-4" : ""}>
              <polyline points="1100,820 1260,720 1420,820 1420,900 1100,900 1100,820" />
              <line x1="1260" y1="720" x2="1260" y2="900" />
            </g>
            <text x="1260" y="924" textAnchor="middle" fill="hsl(var(--accent))" stroke="none">9.60m</text>

            {/* === Scale legend === */}
            <g strokeWidth="0.7" opacity="0.55">
              <line x1="700" y1="520" x2="900" y2="520" />
              <line x1="700" y1="512" x2="700" y2="528" />
              <line x1="800" y1="512" x2="800" y2="528" />
              <line x1="900" y1="512" x2="900" y2="528" />
            </g>
            <text x="800" y="508" textAnchor="middle" fill="hsl(var(--accent))" stroke="none" fontSize="11">ESC 1:100</text>

            {/* North indicator */}
            <g strokeWidth="0.8" opacity="0.5">
              <circle cx="750" cy="560" r="18" />
              <line x1="750" y1="543" x2="750" y2="577" />
              <polyline points="744,553 750,543 756,553" fill="hsl(var(--accent))" />
            </g>
            <text x="750" y="597" textAnchor="middle" fill="hsl(var(--accent))" stroke="none" fontSize="10">N</text>
          </g>

          {/* Particle nodes at intersections */}
          <g fill="hsl(var(--accent))" className={animate ? "bp-nodes" : ""}>
            {nodes.map((n, i) => (
              <circle
                key={i}
                cx={n.cx}
                cy={n.cy}
                r="2.5"
                style={animate ? { animationDelay: `${(i * 0.6) % 8}s` } : undefined}
              />
            ))}
          </g>
        </svg>
      </div>

      <style>{`
        /* === Drawing animations === */
        .bp-draw {
          stroke-dasharray: 2600;
          stroke-dashoffset: 2600;
          animation: bp-draw-anim 32s ease-in-out infinite;
        }
        .bp-draw-1 { animation-delay: 0s; }
        .bp-draw-2 { animation-delay: 5s; }
        .bp-draw-3 { animation-delay: 11s; }
        .bp-draw-4 { animation-delay: 16s; }

        @keyframes bp-draw-anim {
          0%   { stroke-dashoffset: 2600; opacity: 0; }
          8%   { opacity: 1; }
          42%  { stroke-dashoffset: 0; opacity: 1; }
          85%  { stroke-dashoffset: 0; opacity: 0.85; }
          100% { stroke-dashoffset: 0; opacity: 0.85; }
        }

        /* === Dashed lines drift === */
        .bp-dash {
          animation: bp-dash-anim 22s linear infinite;
        }
        .bp-dash-2 { animation-duration: 30s; animation-direction: reverse; }

        @keyframes bp-dash-anim {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -90; }
        }

        /* === Node pulse === */
        .bp-nodes circle {
          opacity: 0;
          animation: bp-node-pulse 5s ease-in-out infinite;
        }
        @keyframes bp-node-pulse {
          0%, 100% { opacity: 0; transform: scale(1); }
          40%       { opacity: 0.9; transform: scale(1.4); }
          70%       { opacity: 0.6; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bp-draw, .bp-dash, .bp-nodes circle {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 0.6 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BlueprintBackground;