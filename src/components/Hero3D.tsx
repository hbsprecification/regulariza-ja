import { useEffect, useRef, useState } from "react";
import {
  WebGLRenderer, Scene, PerspectiveCamera,
  BufferGeometry, LineBasicMaterial, Line,
  BoxGeometry, EdgesGeometry, LineSegments,
  GridHelper, Vector3, type Material,
  Group, AmbientLight, DirectionalLight,
  MeshStandardMaterial, Mesh, PlaneGeometry,
  CylinderGeometry, ConeGeometry, PCFSoftShadowMap
} from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Styles & Theme ────────────────────────────────────────── */
const COLORS = {
  bg: 0x0b1929,
  base: 0xf3f4f6,      // light gray maquette base
  house: 0xffffff,    // white wall
  roof: 0x7A3E0E,     // accent rust
  tree: 0x2d5a27,     // dark minimal green
  blueprint: 0x00f2ff // cyan glow
};

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas  = canvasRef.current;
    const container = containerRef.current;
    const heroSection = document.getElementById("hero");

    /* ── Renderer ── */
    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(COLORS.bg, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    /* ── Scene ── */
    const scene  = new Scene();
    // Isometric-like view
    const camera = new PerspectiveCamera(30, 4/3, 0.1, 100);
    camera.position.set(12, 10, 12);
    camera.lookAt(0, 0, 0);

    const world = new Group();
    scene.add(world);

    /* ── Lights ── */
    scene.add(new AmbientLight(0xffffff, 0.7));
    const Sun = new DirectionalLight(0xffffff, 0.9);
    Sun.position.set(5, 10, 5);
    Sun.castShadow = true;
    Sun.shadow.mapSize.width = 1024;
    Sun.shadow.mapSize.height = 1024;
    scene.add(Sun);

    /* ── 1. Maquette Base (Terrain) ── */
    const baseGeo = new BoxGeometry(8, 0.2, 6);
    const baseMat = new MeshStandardMaterial({ color: 0xe5e7eb });
    const base = new Mesh(baseGeo, baseMat);
    base.position.y = -0.1;
    base.receiveShadow = true;
    world.add(base);

    /* ── 2. The Miniature House ── */
    const houseGroup = new Group();
    world.add(houseGroup);

    // Main Body
    const bodyGeo = new BoxGeometry(3, 2, 2.5);
    const bodyMat = new MeshStandardMaterial({ color: 0xffffff });
    const body = new Mesh(bodyGeo, bodyMat);
    body.position.y = 1;
    body.castShadow = true;
    houseGroup.add(body);

    // Roof
    const roofGeo = new BoxGeometry(3.4, 0.2, 3);
    const roofMat = new MeshStandardMaterial({ color: COLORS.roof });
    const roof = new Mesh(roofGeo, roofMat);
    roof.position.y = 2.05;
    roof.rotation.x = 0; // Flat modern roof or slight pitch
    roof.castShadow = true;
    houseGroup.add(roof);
    
    // Sloped part of roof (classic shape)
    const atticGeo = new CylinderGeometry(0, 1.8, 1, 4); // Pyramid-ish
    atticGeo.rotateY(Math.PI/4);
    const attic = new Mesh(atticGeo, roofMat);
    attic.position.y = 2.5;
    attic.scale.set(1.1, 1, 0.7);
    attic.castShadow = true;
    houseGroup.add(attic);

    /* ── 3. Minimal Trees ── */
    const createTree = (x: number, z: number) => {
      const tree = new Group();
      const trunk = new Mesh(new CylinderGeometry(0.1, 0.1, 0.5), new MeshStandardMaterial({ color: 0x4b3621 }));
      trunk.position.y = 0.25;
      tree.add(trunk);
      const top = new Mesh(new ConeGeometry(0.5, 1.2, 8), new MeshStandardMaterial({ color: COLORS.tree }));
      top.position.y = 1;
      top.castShadow = true;
      tree.add(top);
      tree.position.set(x, 0, z);
      world.add(tree);
    };
    createTree(-3, -2);
    createTree(-2, 2);
    createTree(3, 1.5);

    /* ── 4. Technical Blueprint Lines (Hidden by default) ── */
    const blueprintLines = new Group();
    world.add(blueprintLines);

    const addLines = (mesh: Mesh, color = COLORS.blueprint) => {
      const edges = new EdgesGeometry(mesh.geometry);
      const line = new LineSegments(edges, new LineBasicMaterial({ color, transparent: true, opacity: 0 }));
      line.position.copy(mesh.position);
      line.rotation.copy(mesh.rotation);
      line.scale.copy(mesh.scale);
      blueprintLines.add(line);
      return line;
    };
    const bLines = [
      addLines(body),
      addLines(attic),
      addLines(base, 0xffffff)
    ];

    /* ── Animation Loop ── */
    let rafId: number;
    const tick = () => {
      // Auto-rotation on load
      world.rotation.y += 0.003;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    /* ── Scroll Interactions ── */
    ScrollTrigger.create({
      trigger: heroSection || container,
      start: "top top",
      end: "+=200%",
      pin: heroSection ? true : false,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        
        // Show blueprint lines around house based on scroll
        bLines.forEach(l => {
          (l.material as Material).opacity = p * 0.8;
          l.scale.set(1 + p * 0.05, 1 + p * 0.05, 1 + p * 0.05); // slight expansion
        });

        // Camera move
        camera.position.set(12 - p * 4, 10 - p * 3, 12 - p * 2);
        camera.lookAt(0, 0, 0);

        setComplete(p > 0.9);
      }
    });

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach(t => t.kill());
      renderer.dispose();
      // Proper disposal of all geometries/materials would go here
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0b1929]/20 shadow-elegant ring-1 ring-white/10 backdrop-blur-sm"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      
      {/* HUD Style Overlay */}
      <div className="absolute left-6 top-6 pointer-events-none opacity-40">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white">Maquete Digital v1.0</p>
      </div>

      {/* FINAL BADGE */}
      <div
        className={`absolute bottom-8 right-8 flex items-center gap-3 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-5 py-2.5 backdrop-blur-md transition-all duration-700 ${
          complete ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
        }`}
      >
        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        <span className="text-sm font-bold tracking-tight text-white">
          Imóvel Regularizado
        </span>
      </div>

      {/* Floating Consultoria Badge */}
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
