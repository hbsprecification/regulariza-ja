import { useEffect, useRef, useState } from "react";
import {
  WebGLRenderer, Scene, PerspectiveCamera,
  BufferGeometry, LineBasicMaterial, Line,
  BoxGeometry, EdgesGeometry, LineSegments,
  GridHelper, Vector3, type Material,
  Group, AmbientLight, DirectionalLight
} from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { consultLink } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

/* ─── Config ────────────────────────────────────────────────── */
const HOUSE_W = 6;
const HOUSE_D = 4;
const HOUSE_H = 2.8;
const DOOR_W  = 1.2;

const mats = (m: Material | Material[]) => Array.isArray(m) ? m : [m];

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [stageProgress, setStageProgress] = useState(0); // 0 to 1
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas  = canvasRef.current;
    const container = containerRef.current;
    const heroSection = document.getElementById("hero");

    /* ── Renderer ── */
    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0b1929, 0);

    /* ── Scene ── */
    const scene  = new Scene();
    const camera = new PerspectiveCamera(35, 4/3, 0.1, 100);
    camera.position.set(11, 9, 13);
    camera.lookAt(0, 1, 0);

    const group = new Group();
    scene.add(group);

    /* ── Lights ── */
    scene.add(new AmbientLight(0xffffff, 0.6));
    const sideLight = new DirectionalLight(0xffffff, 0.5);
    sideLight.position.set(5, 10, 5);
    scene.add(sideLight);

    /* ── Blueprint Grid ── */
    const grid = new GridHelper(24, 24, 0x1e4b8a, 0x1a3a5c);
    mats(grid.material).forEach((m) => {
      m.opacity = 0.3;
      m.transparent = true;
    });
    scene.add(grid);

    /* ── 1. Flat Blueprint (Floor Lines) ── */
    const planPts = [
      new Vector3(-3, 0.02, -2), new Vector3(3, 0.02, -2),
      new Vector3(3, 0.02,  2),  new Vector3(0.6, 0.02, 2),
      new Vector3(-0.6, 0.02, 2), new Vector3(-3, 0.02, 2),
      new Vector3(-3, 0.02, -2),
      // Internal divisions
      new Vector3(-3, 0.02, 0), new Vector3(0, 0.02, 0),
      new Vector3(0, 0.02, -2),
    ];
    const planGeo = new BufferGeometry().setFromPoints(planPts);
    planGeo.setDrawRange(0, 0);
    const planMat = new LineBasicMaterial({ color: 0x00f2ff, transparent: true, opacity: 0 });
    const planLine = new Line(planGeo, planMat);
    group.add(planLine);

    /* ── 2. Walls (Wireframe) ── */
    const wallCfgs = [
      { x: 0,    z: -2,   w: HOUSE_W,    d: 0.1 }, 
      { x: -3,   z: 0.1,  w: 0.1,        d: HOUSE_D }, 
      { x: 3,    z: 0.1,  w: 0.1,        d: HOUSE_D }, 
      { x: -1.8, z: 2,    w: HOUSE_W/2 - DOOR_W/2, d: 0.1 }, 
      { x:  1.8, z: 2,    w: HOUSE_W/2 - DOOR_W/2, d: 0.1 }, 
    ];
    const walls: LineSegments[] = wallCfgs.map(({ x, z, w, d }) => {
      const geo  = new BoxGeometry(w, HOUSE_H, d);
      const edge = new EdgesGeometry(geo);
      geo.dispose();
      const mat  = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      const ls   = new LineSegments(edge, mat);
      ls.position.set(x, 0, z);
      ls.scale.y = 0.001; 
      group.add(ls);
      return ls;
    });

    /* ── 3. Roof (Blueprint/Wireframe) ── */
    const pY = HOUSE_H + 2.4; // Peak height
    const roofPts = [
      // Main Ridge
      new Vector3(0, pY, -2.4), new Vector3(0, pY, 2.4),
      // Left Slope
      new Vector3(-3.4, HOUSE_H, -2.4), new Vector3(0, pY, -2.4),
      new Vector3(-3.4, HOUSE_H,  2.4), new Vector3(0, pY,  2.4),
      new Vector3(-3.4, HOUSE_H, -2.4), new Vector3(-3.4, HOUSE_H, 2.4),
      // Right Slope
      new Vector3(3.4, HOUSE_H, -2.4), new Vector3(0, pY, -2.4),
      new Vector3(3.4, HOUSE_H,  2.4), new Vector3(0, pY,  2.4),
      new Vector3(3.4, HOUSE_H, -2.4), new Vector3(3.4, HOUSE_H, 2.4),
    ];
    const roofGeo = new BufferGeometry().setFromPoints(roofPts);
    roofGeo.setDrawRange(0, 0);
    const roofMat = new LineBasicMaterial({ color: 0xc87941, transparent: true, opacity: 0 });
    const roofLine = new Line(roofGeo, roofMat);
    group.add(roofLine);

    /* ── GSAP Scroll Controller ── */
    ScrollTrigger.create({
      trigger: heroSection || container,
      start: "top top",
      end: "+=300%", 
      pin: heroSection ? true : false,
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        setStageProgress(p);

        // 1. Plan (0 - 25%)
        const pp = Math.min(1, p / 0.25);
        planGeo.setDrawRange(0, Math.round(pp * planPts.length));
        planMat.opacity = pp;

        // 2. Walls (25 - 65%)
        const wp = Math.max(0, Math.min(1, (p - 0.25) / 0.4));
        walls.forEach((w, i) => {
          const s = Math.max(0.001, Math.min(1, wp * 1.5 - i * 0.08));
          w.scale.y = s;
          w.position.y = (HOUSE_H/2) * s;
          (w.material as LineBasicMaterial).opacity = s;
        });

        // 3. Roof (65 - 100%)
        const rp = Math.max(0, Math.min(1, (p - 0.65) / 0.35));
        roofGeo.setDrawRange(0, Math.round(rp * roofPts.length));
        roofMat.opacity = rp;

        // Camera zoom in & low angle
        camera.position.set(
          11 - p * 5, 
          9 - p * 4.5, 
          13 - p * 7
        );
        camera.lookAt(0, 1, 0);
        
        group.rotation.y = p * 0.4;
        
        renderer.render(scene, camera);
        setComplete(p > 0.92);
      }
    });

    /* ── Initial Render ── */
    renderer.render(scene, camera);

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
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0b1929]/30 shadow-elegant ring-1 ring-white/10 backdrop-blur-sm"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      
      {/* Visual HUD / Labels */}
      <div className="absolute left-6 top-6 pointer-events-none space-y-1">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/80">3D Project Engine</p>
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-8 bg-accent/40" />
          <p className="text-[9px] text-white/40 font-mono">STATUS: {complete ? 'VERIFIED' : 'ANALYZING'}</p>
        </div>
      </div>

      {/* Blueprint Stage Info */}
      <div className={`absolute bottom-6 left-6 transition-opacity duration-500 ${complete ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
           {stageProgress < 0.25 ? 'Etapa 1: Planta Baixa' : stageProgress < 0.65 ? 'Etapa 2: Estrutura' : 'Etapa 3: Cobertura'}
        </p>
      </div>
      
      {/* The GREEN BADGE "Imóvel Regularizado" */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 ${
          complete ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
           <div className="flex items-center gap-3 rounded-full border-2 border-emerald-400/80 bg-emerald-500/30 px-8 py-4 shadow-[0_0_40px_rgba(16,185,129,0.3)] backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/50">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-100/70 leading-none">Status Final</span>
              <span className="text-xl font-black tracking-tight text-white">
                Imóvel Regularizado
              </span>
            </div>
          </div>

          {/* Prompt to conversion */}
          <div className="animate-bounce mt-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm">
                <ArrowRight className="h-5 w-5" />
             </div>
          </div>
        </div>
      </div>

      {/* CTA Overlay when complete (Interacting with the badge) */}
      {complete && (
        <a 
          href={consultLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-50 flex items-center justify-center"
          aria-label="Falar com engenheiro"
        />
      )}

      {/* Consultoria Gratuita Badge (Floating) */}
      {!complete && (
        <div className="absolute right-4 top-4 rounded-lg bg-accent px-3 py-1.5 text-center shadow-lg">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-accent-foreground">
            Consultoria
          </p>
          <p className="text-sm font-extrabold leading-none text-accent-foreground">
            GRATUITA
          </p>
        </div>
      )}
    </div>
  );
}
