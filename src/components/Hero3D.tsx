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

gsap.registerPlugin(ScrollTrigger);

/* ─── Constants ──────────────────────────────────────────────── */
const W = 6;        // house width  (x: -3 → 3)
const D = 4;        // house depth  (z: -2 → 2)
const H = 2.5;      // wall height
const DOOR = 1.2;   // door width

/* ─── Helper: safe material array ───────────────────────────── */
const mats = (m: Material | Material[]) =>
  Array.isArray(m) ? m : [m];

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas  = canvasRef.current;
    const container = containerRef.current;

    /* ── Renderer ── */
    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0b1929, 1);

    /* ── Scene + Camera ── */
    const scene  = new Scene();
    const camera = new PerspectiveCamera(35, 4/3, 0.1, 100);
    camera.position.set(8, 6, 10);
    camera.lookAt(0, 1, 0);

    /* ── Grid floor ── */
    const grid = new GridHelper(20, 20, 0x1a3a5c, 0x1a3a5c);
    mats(grid.material).forEach((m) => {
      m.opacity = 0.4;
      m.transparent = true;
    });
    scene.add(grid);

    /* ── Floor-plan line ── */
    const planPts: Vector3[] = [
      new Vector3(-3, 0, -2), new Vector3(3, 0, -2),
      new Vector3(3, 0,  2),  new Vector3(0.6, 0, 2),
      new Vector3(-0.6, 0, 2), new Vector3(-3, 0, 2),
      new Vector3(-3, 0, -2),
      new Vector3(-3, 0, 0.2), new Vector3(0.5, 0, 0.2),
      new Vector3(0.5, 0, -2),
    ];
    const planGeo = new BufferGeometry().setFromPoints(planPts);
    planGeo.setDrawRange(0, 0);
    const planMat = new LineBasicMaterial({ color: 0xaad4ff, transparent: true, opacity: 0 });
    scene.add(new Line(planGeo, planMat));

    /* ── Walls ── */
    const wallCfgs = [
      { x: 0,    z: -2,   w: W,    d: 0.1 }, 
      { x: -3,   z: 0,    w: 0.1,  d: D    }, 
      { x: 3,    z: 0,    w: 0.1,  d: D    }, 
      { x: -1.8, z: 2,    w: W/2 - DOOR/2, d: 0.1 }, 
      { x:  1.8, z: 2,    w: W/2 - DOOR/2, d: 0.1 }, 
    ];
    const walls: LineSegments[] = wallCfgs.map(({ x, z, w, d }) => {
      const geo  = new BoxGeometry(w, H, d);
      const edge = new EdgesGeometry(geo);
      geo.dispose();
      const ls   = new LineSegments(edge, new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }));
      ls.position.set(x, 0, z);
      ls.scale.y = 0.001; // start tiny
      scene.add(ls);
      return ls;
    });

    /* ── Roof ── */
    const pY = H + 2.2;
    const roofPts: Vector3[] = [
      new Vector3(-3.3, H, -2.3), new Vector3(0, pY, -2.3),
      new Vector3(-3.3, H,  2.3), new Vector3(0, pY,  2.3),
      new Vector3(3.3, H, -2.3), new Vector3(0, pY, -2.3),
      new Vector3(3.3, H,  2.3), new Vector3(0, pY,  2.3),
      new Vector3(-3.3, H, -2.3), new Vector3(3.3, H, -2.3),
      new Vector3(-3.3, H,  2.3), new Vector3(3.3, H,  2.3),
      new Vector3(0, pY, -2.3), new Vector3(0, pY, 2.3),
    ];
    const roofGeo = new BufferGeometry().setFromPoints(roofPts);
    roofGeo.setDrawRange(0, 0);
    const roofMat = new LineBasicMaterial({ color: 0xc87941, transparent: true, opacity: 0 });
    scene.add(new Line(roofGeo, roofMat));

    /* ── Animation Scroll ── */
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        
        // Plan draw (0 - 30%)
        const pp = Math.min(1, p / 0.3);
        planGeo.setDrawRange(0, Math.round(pp * planPts.length));
        planMat.opacity = pp;

        // Walls rise (30 - 70%)
        const wp = Math.max(0, Math.min(1, (p - 0.3) / 0.4));
        walls.forEach((w, i) => {
          const s = Math.max(0.001, Math.min(1, wp * 1.5 - i * 0.1));
          w.scale.y = s;
          w.position.y = (H / 2) * s;
          (w.material as LineBasicMaterial).opacity = s;
        });

        // Roof draw (70 - 100%)
        const rp = Math.max(0, Math.min(1, (p - 0.7) / 0.3));
        roofGeo.setDrawRange(0, Math.round(rp * roofPts.length));
        roofMat.opacity = rp;

        // Camera drift
        camera.position.set(8 - p * 3, 6 - p, 10 - p * 2);
        camera.lookAt(0, 1, 0);

        renderer.render(scene, camera);
        setComplete(p > 0.95);
      }
    });

    // Initial render
    renderer.render(scene, camera);

    /* ── Resize ── */
    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      planGeo.dispose(); planMat.dispose();
      roofGeo.dispose(); roofMat.dispose();
      walls.forEach(w => {
        w.geometry.dispose();
        (w.material as LineBasicMaterial).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0b1929] shadow-elegant ring-1 ring-white/10"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      
      {/* Consultoria Gratuita Badge */}
      <div className="absolute right-4 top-4 rounded-lg bg-accent px-3 py-1.5 text-center shadow-lg">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-accent-foreground">
          Consultoria
        </p>
        <p className="text-sm font-extrabold leading-none text-accent-foreground">
          GRATUITA
        </p>
      </div>

      {/* Regularizado Seal */}
      <div
        className={`absolute bottom-6 right-6 flex items-center gap-2 rounded-full border-2 border-emerald-400/60 bg-emerald-500/20 px-4 py-2 shadow-lg backdrop-blur-sm transition-all duration-700 ${
          complete ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        <span className="text-xs font-extrabold tracking-wide text-emerald-300">
          Imóvel Regularizado
        </span>
      </div>

      {/* Progress Label */}
      <div className="absolute bottom-4 left-6 pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
          Visualização Técnica 3D
        </p>
      </div>
    </div>
  );
}
