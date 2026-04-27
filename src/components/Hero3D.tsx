import { useEffect, useRef, useState } from "react";
import {
  WebGLRenderer, Scene, PerspectiveCamera,
  BufferGeometry, LineBasicMaterial, Line,
  BoxGeometry, EdgesGeometry, LineSegments,
  GridHelper, Vector3, type Material,
  MeshBasicMaterial, Mesh, PlaneGeometry, 
  Group, AmbientLight, DirectionalLight
} from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { consultLink } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

/* ─── Constants ──────────────────────────────────────────────── */
const W = 6;        
const D = 4;        
const H = 2.5;      
const DOOR = 1.2;   

const mats = (m: Material | Material[]) => Array.isArray(m) ? m : [m];

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [complete, setComplete] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas  = canvasRef.current;
    const container = containerRef.current;
    const heroSection = document.getElementById("hero");

    /* ── Renderer ── */
    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0b1929, 0); // Transparent background to show Hero's gradient

    /* ── Scene + Camera ── */
    const scene  = new Scene();
    const camera = new PerspectiveCamera(35, 4/3, 0.1, 100);
    camera.position.set(10, 8, 12); // Further away initially
    camera.lookAt(0, 1, 0);

    const houseGroup = new Group();
    scene.add(houseGroup);

    /* ── Lights (for basic shading if needed) ── */
    const amb = new AmbientLight(0xffffff, 0.5);
    scene.add(amb);
    const dir = new DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    /* ── Grid floor ── */
    const grid = new GridHelper(24, 24, 0x1a3a5c, 0x1a3a5c);
    mats(grid.material).forEach((m) => {
      m.opacity = 0.25;
      m.transparent = true;
    });
    scene.add(grid);

    /* ── Floor-plan line ── */
    const planPts: Vector3[] = [
      new Vector3(-3, 0.05, -2), new Vector3(3, 0.05, -2),
      new Vector3(3, 0.05,  2),  new Vector3(0.6, 0.05, 2),
      new Vector3(-0.6, 0.05, 2), new Vector3(-3, 0.05, 2),
      new Vector3(-3, 0.05, -2),
      new Vector3(-3, 0.05, 0.2), new Vector3(0.5, 0.05, 0.2),
      new Vector3(0.5, 0.05, -2),
    ];
    const planGeo = new BufferGeometry().setFromPoints(planPts);
    planGeo.setDrawRange(0, 0);
    const planMat = new LineBasicMaterial({ color: 0x00f2ff, transparent: true, opacity: 0 }); // Cyan glow
    const planLine = new Line(planGeo, planMat);
    houseGroup.add(planLine);

    /* ── Walls (Wireframe Blueprint) ── */
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
      ls.scale.y = 0.001; 
      houseGroup.add(ls);
      return ls;
    });

    /* ── Roof ── */
    const pY = H + 2.2;
    const roofPts: Vector3[] = [
      new Vector3(-3.4, H, -2.4), new Vector3(0, pY, -2.4),
      new Vector3(-3.4, H,  2.4), new Vector3(0, pY,  2.4),
      new Vector3(3.4, H, -2.4), new Vector3(0, pY, -2.4),
      new Vector3(3.4, H,  2.4), new Vector3(0, pY,  2.4),
      new Vector3(-3.4, H, -2.4), new Vector3(3.4, H, -2.4),
      new Vector3(-3.4, H,  2.4), new Vector3(3.4, H,  2.4),
      new Vector3(0, pY, -2.4), new Vector3(0, pY, 2.4),
    ];
    const roofGeo = new BufferGeometry().setFromPoints(roofPts);
    roofGeo.setDrawRange(0, 0);
    const roofMat = new LineBasicMaterial({ color: 0xc87941, transparent: true, opacity: 0 });
    const roofLine = new Line(roofGeo, roofMat);
    houseGroup.add(roofLine);

    /* ── Scroll Animation Implementation ── */
    ScrollTrigger.create({
      trigger: heroSection || container,
      start: "top top",
      end: "+=300%", // Longer animation experience
      pin: heroSection ? true : false, // Pin the whole hero
      scrub: 1.5, // Smoother follow
      onUpdate: (self) => {
        const p = self.progress;
        
        // 1. Blueprint drawing (0% - 20%)
        const pp = Math.min(1, p / 0.2);
        planGeo.setDrawRange(0, Math.round(pp * planPts.length));
        planMat.opacity = pp;

        // 2. Walls Extruding UP (20% - 60%)
        const wp = Math.max(0, Math.min(1, (p - 0.2) / 0.4));
        walls.forEach((w, i) => {
          const s = Math.max(0.001, Math.min(1, wp * 1.4 - i * 0.05));
          w.scale.y = s;
          w.position.y = (H / 2) * s;
          (w.material as LineBasicMaterial).opacity = s;
        });

        // 3. Roof Construction (60% - 90%)
        const rp = Math.max(0, Math.min(1, (p - 0.6) / 0.3));
        roofGeo.setDrawRange(0, Math.round(rp * roofPts.length));
        roofMat.opacity = rp;

        // 4. Camera Zoom + Move Logic (smooth drift toward house)
        camera.position.set(
          10 - p * 4.5, 
          8 - p * 3.5, 
          12 - p * 6
        );
        camera.lookAt(0, 1, 0);

        // 5. Rotation to give it more 3D feel
        houseGroup.rotation.y = p * 0.5;

        renderer.render(scene, camera);
        
        // State updates for UI
        setComplete(p > 0.85);
        setCtaVisible(p > 0.98); 
      }
    });

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
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0b1929]/40 shadow-elegant ring-1 ring-white/10 backdrop-blur-sm"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      
      {/* Consultoria Gratuita Badge */}
      <div className={`absolute right-4 top-4 rounded-lg bg-accent px-3 py-1.5 text-center shadow-lg transition-opacity duration-500 ${complete ? 'opacity-0' : 'opacity-100'}`}>
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
          complete ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-90"
        }`}
      >
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        <span className="text-xs font-extrabold tracking-wide text-emerald-300">
          Imóvel Regularizado
        </span>
      </div>

      {/* FINAL CTA BUTTON - Fades in at 100% scroll */}
      <div 
        className={`absolute inset-0 z-20 flex items-center justify-center bg-primary/20 backdrop-blur-[2px] transition-all duration-700 ${
          ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <a
          href={consultLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 text-center"
        >
          <div className="relative">
             <div className="absolute -inset-4 rounded-full bg-accent/20 blur-xl animate-pulse" />
             <button className="relative flex items-center gap-3 rounded-full bg-accent px-8 py-5 text-lg font-black text-accent-foreground shadow-2xl transition-transform active:scale-95 group-hover:scale-105">
                Regularizar meu imóvel
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
             </button>
          </div>
          <p className="text-sm font-bold text-white drop-shadow-md">
             Fale direto com o Engenheiro Jádson
          </p>
        </a>
      </div>

      {/* Progress Label */}
      <div className="absolute bottom-4 left-6 pointer-events-none opacity-40">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">
          Engineered by HBS • 3D Core
        </p>
      </div>
    </div>
  );
}
