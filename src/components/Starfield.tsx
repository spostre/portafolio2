import { useEffect, useRef } from 'react';

/*
 * Estrellas en movimiento lento para el fondo de las secciones negras.
 * - Se desvanecen fuera de una elipse centrada en `origin`.
 * - Ligero: ~30 fps en un canvas; se pausa fuera de pantalla o con la pestaña oculta.
 * - Con "reducir movimiento" se dibujan quietas.
 * Uso: dentro de un contenedor con la clase `has-stars`.
 */
const lowPower =
  (navigator.hardwareConcurrency ?? 8) <= 4 ||
  ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
const FPS = lowPower ? 20 : 30;
const COLORS = ['255,255,255', '200,218,255', '147,182,255'];

const ORIGINS = {
  top: [0.5, 0],
  'top-left': [0.15, 0],
  'top-right': [0.85, 0],
  bottom: [0.5, 1],
} as const;

interface Star {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  color: string;
}

export default function Starfield({ origin = 'top', density = 1 }: { origin?: keyof typeof ORIGINS; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frame = 0;
    let last = 0;
    let visible = true;

    const createStars = () => {
      const count = Math.min(190, Math.round(((width * height) / 7000) * density * (lowPower ? 0.5 : 1)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.35,
        vx: -(Math.random() * 4 + 2),
        vy: -(Math.random() * 6 + 3),
        phase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const [ox, oy] = ORIGINS[origin];
    const falloff = (x: number, y: number) => {
      const dx = (x - width * ox) / (width * 0.62);
      const dy = (y - height * oy) / (height * 0.85);
      const d = Math.sqrt(dx * dx + dy * dy);
      return d >= 1 ? 0 : Math.pow(1 - d, 1.1);
    };

    const draw = (time: number, dt = 0) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        if (dt) {
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          if (s.y < -2) s.y = height + 2;
          if (s.x < -2) s.x = width + 2;
        }
        const fade = falloff(s.x, s.y);
        if (fade <= 0) continue;
        const twinkle = 0.55 + 0.45 * Math.sin(time / 900 + s.phase);
        ctx.fillStyle = `rgba(${s.color},${(fade * twinkle * 0.9).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
      draw(0);
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden) {
        last = time;
        return;
      }
      if (time - last < 1000 / FPS) return;
      const dt = last ? Math.min((time - last) / 1000, 0.1) : 0;
      last = time;
      draw(time, dt);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);

    resize();
    if (!reduce) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [origin, density]);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
