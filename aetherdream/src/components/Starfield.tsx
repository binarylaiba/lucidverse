import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = Math.max(window.innerWidth || 1280, 300);
      canvas.height = Math.max(window.innerHeight || 800, 300);
    };
    resize();

    const starCount = 60;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      dAlpha: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
    }));

    let isRunning = true;
    const loop = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#a78bfa';
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += s.dAlpha;
        if (s.alpha > 0.8 || s.alpha < 0.15) s.dAlpha = -s.dAlpha;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(loop);
    };

    loop();

    window.addEventListener('resize', resize, { passive: true });
    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
