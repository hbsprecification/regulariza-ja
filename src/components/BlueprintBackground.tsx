import { useEffect, useState } from "react";

/**
 * Subtle technical blueprint background for white sections.
 * - Localized absolute overlay (no fixed positioning issues)
 * - Pure SVG with very low opacity (3-5%)
 * - Light gray architectural lines
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
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <svg
        className="absolute w-full h-[150%] top-0 left-0 opacity-[0.04]"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(0 0% 20%)" strokeWidth="0.5" />
          </pattern>
          <pattern id="bp-grid-major" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="hsl(0 0% 20%)" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Grid layers */}
        <rect width="100%" height="100%" fill="url(#bp-grid)" />
        <rect width="100%" height="100%" fill="url(#bp-grid-major)" opacity="0.6" />

        <g
          stroke="hsl(0 0% 15%)"
          fill="none"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="13"
        >
          {/* === Design Elements === */}
          <g strokeWidth="1.2" className={animate ? "bp-draw bp-draw-1" : ""}>
            <rect x="120" y="120" width="320" height="220" />
            <line x1="280" y1="120" x2="280" y2="240" />
            <line x1="120" y1="240" x2="280" y2="240" />
            <path d="M 200 240 A 30 30 0 0 1 230 270" />
          </g>
          
          <g strokeWidth="0.6" opacity="0.8">
            <line x1="120" y1="98" x2="440" y2="98" />
            <line x1="120" y1="90" x2="120" y2="106" />
            <line x1="440" y1="90" x2="440" y2="106" />
          </g>

          <g strokeWidth="1.2" className={animate ? "bp-draw bp-draw-2" : ""}>
            <polyline points="1080,180 1380,180 1380,360 1200,360 1200,420 1020,420 1020,260 1080,260 1080,180" />
            <line x1="1200" y1="180" x2="1200" y2="360" />
          </g>

          {/* Dotted border lines */}
          <g strokeWidth="0.8" strokeDasharray="6 9" opacity="0.6">
            <line x1="0" y1="600" x2="1600" y2="600" className={animate ? "bp-dash" : ""} />
            <line x1="600" y1="0" x2="600" y2="1000" className={animate ? "bp-dash bp-dash-2" : ""} />
          </g>

          {/* Measurement Circles */}
          <g stroke="hsl(0 0% 15%)" opacity="0.5" strokeWidth="0.8">
            <circle cx="800" cy="520" r="45" strokeDasharray="4 6" />
            <circle cx="800" cy="520" r="30" strokeDasharray="2 4" />
            <line x1="740" y1="520" x2="860" y2="520" strokeWidth="0.5"/>
            <line x1="800" y1="460" x2="800" y2="580" strokeWidth="0.5"/>
          </g>

          {/* Lower structure */}
          <g strokeWidth="1.2" className={animate ? "bp-draw bp-draw-3" : ""}>
            <rect x="180" y="700" width="240" height="160" />
            <line x1="180" y1="780" x2="420" y2="780" />
          </g>
        </g>
      </svg>

      {/* Gentle gradient fade at boundaries to blend with the white sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80" />

      <style>{`
        .bp-draw {
          stroke-dasharray: 2600;
          stroke-dashoffset: 2600;
          animation: bp-draw-anim 32s ease-in-out infinite;
        }
        .bp-draw-1 { animation-delay: 0s; }
        .bp-draw-2 { animation-delay: 5s; }
        .bp-draw-3 { animation-delay: 11s; }

        @keyframes bp-draw-anim {
          0%   { stroke-dashoffset: 2600; opacity: 0; }
          8%   { opacity: 1; }
          42%  { stroke-dashoffset: 0; opacity: 1; }
          85%  { stroke-dashoffset: 0; opacity: 0.8; }
          100% { stroke-dashoffset: 0; opacity: 0.8; }
        }

        .bp-dash {
          animation: bp-dash-anim 22s linear infinite;
        }
        .bp-dash-2 { animation-duration: 30s; animation-direction: reverse; }

        @keyframes bp-dash-anim {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -90; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bp-draw, .bp-dash {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 0.8 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BlueprintBackground;