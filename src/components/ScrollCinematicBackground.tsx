import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const FRAME_COUNT = 40;
const LERP_FACTOR = 0.09;
const SNAP_EPSILON = 0.02;
const BACKDROP_COLOR = "#0b1929";

function framePath(frameNumber: number) {
  return `/imagens2/ezgif-frame-${String(frameNumber).padStart(3, "0")}.png`;
}

type Props = {
  children: ReactNode;
};

export default function ScrollCinematicBackground({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Wrapper height = the content's own natural height + one viewport.
  // That's the exact scroll distance needed for the content to fully
  // scroll past while the canvas stays pinned — no trailing dead zone,
  // no content cut short, regardless of how tall the children are.
  const [wrapperHeight, setWrapperHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    function measure() {
      setWrapperHeight(content!.scrollHeight + window.innerHeight);
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(content);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const frame = frameRef.current;
    if (!canvas || !wrapper || !sticky || !frame) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMotionQuery.matches;
    const onMotionPreferenceChange = () => {
      prefersReducedMotion = reducedMotionQuery.matches;
    };
    reducedMotionQuery.addEventListener("change", onMotionPreferenceChange);

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);

    let currentFrame = 0;
    let lastDrawnFrame = -1;
    let rafId = 0;
    let disposed = false;

    function nearestLoadedIndex(target: number) {
      const clamped = Math.min(FRAME_COUNT - 1, Math.max(0, target));
      if (loaded[clamped]) return clamped;
      for (let distance = 1; distance < FRAME_COUNT; distance++) {
        const lower = clamped - distance;
        const upper = clamped + distance;
        if (lower >= 0 && loaded[lower]) return lower;
        if (upper < FRAME_COUNT && loaded[upper]) return upper;
      }
      return -1;
    }

    function drawFrame(index: number, force = false) {
      if (index === lastDrawnFrame && !force) return;

      const cw = canvas!.width;
      const ch = canvas!.height;
      if (cw === 0 || ch === 0) return;

      const sourceIndex = nearestLoadedIndex(index);
      if (sourceIndex === -1) return;

      const img = images[sourceIndex];
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;

      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;
      let sx: number, sy: number, sw: number, sh: number;

      if (imgRatio > canvasRatio) {
        sh = ih;
        sw = ih * canvasRatio;
        sx = (iw - sw) / 2;
        sy = 0;
      } else {
        sw = iw;
        sh = iw / canvasRatio;
        sx = 0;
        sy = (ih - sh) / 2;
      }

      ctx!.fillStyle = BACKDROP_COLOR;
      ctx!.fillRect(0, 0, cw, ch);
      ctx!.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      lastDrawnFrame = index;
    }

    function resizeCanvas() {
      const rect = frame!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        drawFrame(Math.round(currentFrame), true);
      }
    }

    function getScrollProgress() {
      const rect = wrapper!.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return rect.top <= 0 ? 1 : 0;
      const scrolled = -rect.top;
      return Math.min(1, Math.max(0, scrolled / scrollable));
    }

    function loadFrames() {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          loaded[i] = true;
          if (i === 0) drawFrame(0, true);
        };
        img.src = framePath(i + 1);
        images[i] = img;
      }
    }

    function step() {
      const progress = getScrollProgress();
      const target = progress * (FRAME_COUNT - 1);

      if (prefersReducedMotion || Math.abs(target - currentFrame) < SNAP_EPSILON) {
        currentFrame = target;
      } else {
        currentFrame += (target - currentFrame) * LERP_FACTOR;
      }

      drawFrame(Math.round(currentFrame));
    }

    function tick() {
      if (disposed) return;
      step();
      rafId = requestAnimationFrame(tick);
    }

    // Scroll events keep firing even when a browser throttles rAF in
    // backgrounded/inactive windows, so this guarantees the frame never
    // stalls regardless of the rAF loop's actual cadence.
    function onScroll() {
      step();
    }

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(frame);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", onScroll, { passive: true });

    loadFrames();
    resizeCanvas();
    rafId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", onScroll);
      reducedMotionQuery.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ backgroundColor: BACKDROP_COLOR, height: wrapperHeight ? `${wrapperHeight}px` : "auto" }}
    >
      <div ref={stickyRef} className="sticky top-0 left-0 h-screen w-full">
        <div className="container h-full">
          <div
            ref={frameRef}
            className="relative h-full w-full overflow-hidden rounded-3xl"
            style={{ backgroundColor: BACKDROP_COLOR }}
          >
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-black/45" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70"
            />
          </div>
        </div>
      </div>

      <div ref={contentRef} className="absolute inset-x-0 top-0">
        {children}
      </div>
    </div>
  );
}
