import { useEffect, useState } from "react";

/**
 * Subtle animated architectural blueprint background.
 * - Pure SVG (GPU-friendly, lightweight on mobile)
 * - Slow stroke-dashoffset animation (no scroll listeners)
 * - Respects prefers-reduced-motion
 * - Low opacity to never compete with content
 */
const BlueprintBackground = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const animate = !reducedMotion;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft tint backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/40" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07] sm:opacity-[0.09]"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Fine technical grid */}
          <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern id="bp-grid-major" width="200" height="200" patternUnits="userSpaceOnUse">
            <path
              d="M 200 0 L 0 0 0 200"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>

        {/* Grid layers */}
        <rect width="100%" height="100%" fill="url(#bp-grid)" />
        <rect width="100%" height="100%" fill="url(#bp-grid-major)" opacity="0.6" />

        <g
          stroke="hsl(var(--accent))"
          fill="none"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="14"
        >
          {/* === House plan #1 (top-left) === */}
          <g strokeWidth="1.5" className={animate ? "bp-draw bp-draw-1" : ""}>
            <rect x="120" y="120" width="320" height="220" />
            {/* interior walls */}
            <line x1="280" y1="120" x2="280" y2="240" />
            <line x1="120" y1="240" x2="280" y2="240" />
            <line x1="280" y1="200" x2="440" y2="200" />
            {/* door arc */}
            <path d="M 200 240 A 30 30 0 0 1 230 270" />
          </g>
          {/* dimension lines */}
          <g strokeWidth="0.8" stroke="hsl(var(--accent))" opacity="0.85">
            <line x1="120" y1="100" x2="440" y2="100" />
            <line x1="120" y1="92" x2="120" y2="108" />
            <line x1="440" y1="92" x2="440" y2="108" />
          </g>
          <text x="280" y="92" textAnchor="middle" fill="hsl(var(--accent))" stroke="none">
            10.50m
          </text>
          <text x="100" y="235" textAnchor="end" fill="hsl(var(--accent))" stroke="none">
            8.20m
          </text>

          {/* === House plan #2 (right) === */}
          <g strokeWidth="1.5" className={animate ? "bp-draw bp-draw-2" : ""}>
            <polyline points="1080,180 1380,180 1380,360 1200,360 1200,420 1020,420 1020,260 1080,260 1080,180" />
            <line x1="1200" y1="180" x2="1200" y2="360" />
            <line x1="1080" y1="260" x2="1200" y2="260" />
          </g>
          <g strokeWidth="0.8" opacity="0.85">
            <line x1="1020" y1="450" x2="1380" y2="450" />
            <line x1="1020" y1="442" x2="1020" y2="458" />
            <line x1="1380" y1="442" x2="1380" y2="458" />
          </g>
          <text x="1200" y="475" textAnchor="middle" fill="hsl(var(--accent))" stroke="none">
            12.40m
          </text>

          {/* === Dotted boundary lines === */}
          <g strokeWidth="1" strokeDasharray="6 8" opacity="0.7">
            <line x1="0" y1="600" x2="1600" y2="600" className={animate ? "bp-dash" : ""} />
            <line x1="600" y1="0" x2="600" y2="1000" className={animate ? "bp-dash bp-dash-2" : ""} />
          </g>

          {/* === Lower-left small structure === */}
          <g strokeWidth="1.5" className={animate ? "bp-draw bp-draw-3" : ""}>
            <rect x="180" y="700" width="240" height="160" />
            <line x1="180" y1="780" x2="420" y2="780" />
            <line x1="300" y1="700" x2="300" y2="780" />
          </g>
          <text x="300" y="690" textAnchor="middle" fill="hsl(var(--accent))" stroke="none">
            7.80m
          </text>
          <text x="160" y="785" textAnchor="end" fill="hsl(var(--accent))" stroke="none">
            5.20m
          </text>

          {/* === Lower-right roof outline === */}
          <g strokeWidth="1.5" className={animate ? "bp-draw bp-draw-4" : ""}>
            <polyline points="1100,820 1260,720 1420,820 1420,900 1100,900 1100,820" />
            <line x1="1260" y1="720" x2="1260" y2="900" />
          </g>
          <text x="1260" y="930" textAnchor="middle" fill="hsl(var(--accent))" stroke="none">
            9.60m
          </text>

          {/* === Center scale legend === */}
          <g strokeWidth="0.8" opacity="0.6">
            <line x1="700" y1="520" x2="900" y2="520" />
            <line x1="700" y1="514" x2="700" y2="526" />
            <line x1="900" y1="514" x2="900" y2="526" />
            <line x1="800" y1="514" x2="800" y2="526" />
          </g>
          <text x="800" y="510" textAnchor="middle" fill="hsl(var(--accent))" stroke="none" fontSize="11">
            ESC 1:100
          </text>
        </g>
      </svg>

      <style>{`
        .bp-draw {
          stroke-dasharray: 2400;
          stroke-dashoffset: 2400;
          animation: bp-draw-anim 28s ease-in-out infinite;
        }
        .bp-draw-1 { animation-delay: 0s; }
        .bp-draw-2 { animation-delay: 4s; }
        .bp-draw-3 { animation-delay: 9s; }
        .bp-draw-4 { animation-delay: 13s; }

        @keyframes bp-draw-anim {
          0%   { stroke-dashoffset: 2400; }
          35%  { stroke-dashoffset: 0; }
          75%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

        .bp-dash {
          stroke-dashoffset: 0;
          animation: bp-dash-anim 18s linear infinite;
        }
        .bp-dash-2 { animation-duration: 24s; animation-direction: reverse; }

        @keyframes bp-dash-anim {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -56; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bp-draw, .bp-dash { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default BlueprintBackground;