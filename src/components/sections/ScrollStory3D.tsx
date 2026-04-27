import { useEffect, useRef, useState } from "react";
import {
  WebGLRenderer, Scene, PerspectiveCamera,
  BufferGeometry, LineBasicMaterial, Line,
  BoxGeometry, EdgesGeometry, LineSegments,
  GridHelper, Vector3, type Material,
} from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { consultLink } from "@/lib/contact";
import { MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Constants ──────────────────────────────────────────────── */
const W = 6;        // house width  (x: -3 → 3)
const D = 4;        // house depth  (z: -2 → 2)
const H = 2.5;      // wall height
const DOOR = 1.2;   // door width

const STAGES = [
  "📄 Documentação técnica",
  "📐 Planta arquitetônica",
  "🧱 Paredes surgindo",
  "🏠 Imóvel regularizado",
];

/* ─── Helper: safe material array ───────────────────────────── */
const mats = (m: Material | Material[]) =>
  Array.isArray(m) ? m : [m];

/* ─── Component ─────────────────────────────────────────────── */
export default function ScrollStory3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [stage, setStage]   = useState(0);
  const [is3D,  setIs3D]    = useState(false);

  useEffect(() => {
    const desktop      = window.matchMedia("(min-width: 1024px)").matches;
    const lowMotion    = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const capable      = desktop && !lowMotion;

    setIs3D(capable);
    if (!capable || !canvasRef.current || !sectionRef.current) return;

    const canvas  = canvasRef.current;
    const section = sectionRef.current;

    /* ── Renderer ── */
    const cW = canvas.offsetWidth  || 800;
    const cH = canvas.offsetHeight || 600;

    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(cW, cH, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0b1929);

    /* ── Scene + Camera ── */
    const scene  = new Scene();
    const camera = new PerspectiveCamera(38, cW / cH, 0.1, 100);
    camera.position.set(8, 6, 10);
    camera.lookAt(0, 1, 0);

    /* ── Grid floor ── */
    const grid = new GridHelper(24, 24, 0x1a3a5c, 0x1a3a5c);
    mats(grid.material).forEach((m) => {
      m.opacity = 0.35;
      m.transparent = true;
    });
    scene.add(grid);

    /* ── Floor-plan line (drawRange trick) ── */
    const planPts: Vector3[] = [
      // Outer perimeter
      new Vector3(-3, 0, -2), new Vector3(3, 0, -2),
      new Vector3(3, 0,  2),  new Vector3(0.6, 0, 2),
      // door gap → resume
      new Vector3(-0.6, 0, 2), new Vector3(-3, 0, 2),
      new Vector3(-3, 0, -2),
      // Interior wall
      new Vector3(-3, 0, 0.2), new Vector3(0.5, 0, 0.2),
      new Vector3(0.5, 0, -2),
      // Door reveal
      new Vector3(-0.6, 0, 2), new Vector3(-0.6, 0, 1.4),
      new Vector3(0.6, 0, 1.4), new Vector3(0.6, 0, 2),
    ];
    const planGeo = new BufferGeometry().setFromPoints(planPts);
    planGeo.setDrawRange(0, 0);
    const planMat = new LineBasicMaterial({ color: 0xaad4ff, transparent: true, opacity: 0 });
    scene.add(new Line(planGeo, planMat));

    /* ── Walls (EdgesGeometry, scale-Y from 0→1) ── */
    const wallCfgs = [
      { x: 0,    z: -2,   w: W,                            d: 0.12 },  // back
      { x: -3,   z: 0,    w: 0.12,                         d: D    },  // left
      { x: 3,    z: 0,    w: 0.12,                         d: D    },  // right
      { x: -1.8, z: 2,    w: W / 2 - DOOR / 2,             d: 0.12 },  // front-L
      { x:  1.8, z: 2,    w: W / 2 - DOOR / 2,             d: 0.12 },  // front-R
    ];
    const walls: LineSegments[] = wallCfgs.map(({ x, z, w: bw, d: bd }) => {
      const geo  = new BoxGeometry(bw, H, bd);
      const edge = new EdgesGeometry(geo);
      geo.dispose();
      const mat  = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      const ls   = new LineSegments(edge, mat);
      ls.position.set(x, 0, z);
      ls.scale.y = 0;
      scene.add(ls);
      return ls;
    });

    /* ── Roof lines (drawRange) ── */
    const rY  = H;
    const pY  = H + 2.3;   // peak
    const rx  = W / 2 + 0.35;
    const rz  = D / 2 + 0.35;
    const roofPts: Vector3[] = [
      // Left slope edges
      new Vector3(-rx, rY, -rz), new Vector3(0, pY, -rz),
      new Vector3(-rx, rY,  rz), new Vector3(0, pY,  rz),
      // Right slope edges
      new Vector3(rx, rY, -rz), new Vector3(0, pY, -rz),
      new Vector3(rx, rY,  rz), new Vector3(0, pY,  rz),
      // Eaves
      new Vector3(-rx, rY, -rz), new Vector3(rx, rY, -rz),
      new Vector3(-rx, rY,  rz), new Vector3(rx, rY,  rz),
      // Ridge
      new Vector3(0, pY, -rz), new Vector3(0, pY, rz),
    ];
    const roofGeo = new BufferGeometry().setFromPoints(roofPts);
    roofGeo.setDrawRange(0, 0);
    const roofMat = new LineBasicMaterial({ color: 0xc87941, transparent: true, opacity: 0 });
    scene.add(new Line(roofGeo, roofMat));

    /* ── RAF loop (renders only when dirty) ── */
    let dirty = true;
    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (dirty) { renderer.render(scene, camera); dirty = false; }
    };
    tick();

    /* ── ScrollTrigger ── */
    ScrollTrigger.create({
      trigger: section,
      start:   "top top",
      end:     "+=1100",
      pin:     true,
      scrub:   1.2,
      anticipatePin: 1,
      onUpdate(self) {
        const p = self.progress;

        // stage label
        setStage(p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.78 ? 2 : 3);

        // 1. Floor plan draw (0 → 40%)
        const lp = Math.min(1, p / 0.4);
        planGeo.setDrawRange(0, Math.max(2, Math.round(lp * planPts.length)));
        planMat.opacity = lp * 0.9;

        // 2. Walls rise with slight stagger (40 → 80%)
        const wp = Math.max(0, Math.min(1, (p - 0.4) / 0.4));
        walls.forEach((wall, i) => {
          const del = i * 0.07;
          const lv  = Math.max(0, Math.min(1, (wp - del) / (1 - del)));
          wall.scale.y    = lv;
          wall.position.y = (H / 2) * lv;
          (wall.material as LineBasicMaterial).opacity = lv * 0.88;
        });

        // 3. Roof draws (80 → 100%)
        const rp = Math.max(0, Math.min(1, (p - 0.8) / 0.2));
        roofGeo.setDrawRange(0, Math.max(2, Math.round(rp * roofPts.length)));
        roofMat.opacity = rp;

        // 4. Camera slowly drifts for depth
        camera.position.set(8 - p * 2.5, 6 - p * 0.8, 10 - p * 1.5);
        camera.lookAt(0, 1 + p * 0.4, 0);

        dirty = true;
      },
    });

    /* ── Resize ── */
    const ro = new ResizeObserver(() => {
      const nW = canvas.offsetWidth;
      const nH = canvas.offsetHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH, false);
      dirty = true;
    });
    ro.observe(canvas);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      planGeo.dispose(); planMat.dispose();
      roofGeo.dispose(); roofMat.dispose();
      walls.forEach((w) => {
        w.geometry.dispose();
        (w.material as LineBasicMaterial).dispose();
      });
      mats(grid.material).forEach((m) => m.dispose());
      grid.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#0b1929]"
      aria-label="Animação 3D: da documentação técnica ao imóvel regularizado"
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${is3D ? "block" : "hidden"}`}
      />

      {/* Mobile / fallback */}
      {!is3D && (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
          <div className="text-8xl">🏠</div>
          <p className="font-display text-2xl font-bold text-primary-foreground">
            Da documentação ao imóvel
          </p>
          <p className="max-w-xs text-sm text-primary-foreground/60">
            Regularização começa com análise técnica. O primeiro passo é gratuito.
          </p>
          <a
            href={consultLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            Consultoria gratuita
          </a>
        </div>
      )}

      {/* Left vignette + content overlay */}
      {is3D && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-[#0b1929] via-[#0b1929]/80 to-transparent lg:w-96" />

          <div className="container relative z-10 flex h-full items-center">
            <div className="max-w-[280px] text-primary-foreground">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                Da documentação ao imóvel
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold leading-snug">
                Regularização começa na análise técnica
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/60">
                Role para ver como documentos técnicos se transformam em imóvel regularizado.
              </p>

              {/* Stage indicators */}
              <div className="mt-8 space-y-3">
                {STAGES.map((label, i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                      i === stage
                        ? "text-white"
                        : i < stage
                        ? "text-emerald-400/70"
                        : "text-primary-foreground/30"
                    }`}
                  >
                    {i < stage ? (
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
                    ) : (
                      <div
                        className={`h-2 w-2 flex-shrink-0 rounded-full transition-colors ${
                          i === stage ? "bg-accent" : "bg-white/20"
                        }`}
                      />
                    )}
                    {label}
                  </div>
                ))}
              </div>

              <p className="mt-8 flex items-center gap-2 text-xs text-primary-foreground/35">
                <span>Role para animar</span>
                <span className="animate-bounce">↓</span>
              </p>
            </div>
          </div>

          {/* Regularizado seal */}
          <div
            className={`absolute bottom-8 right-8 flex items-center gap-2.5 rounded-full border-2 border-emerald-400/60 bg-emerald-500/20 px-5 py-2.5 backdrop-blur-sm transition-all duration-700 ${
              stage >= 3 ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-extrabold tracking-wide text-emerald-300">
              Imóvel Regularizado
            </span>
          </div>
        </>
      )}
    </section>
  );
}
