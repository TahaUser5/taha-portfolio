'use client';

import { useEffect, useRef } from 'react';

const SIZE = 96;
const CX   = SIZE / 2;
const CY   = SIZE / 2;
const RX   = 34; // ellipse x-radius
const RY   = 14; // ellipse y-radius (flat orbit)

export default function AboutRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = SIZE;
    canvas.height = SIZE;

    const particles = Array.from({ length: 10 }, (_, i) => ({
      angle:  (i / 10) * Math.PI * 2,
      speed:  0.007 + (i % 3) * 0.002,
      radius: 1.2 + (i % 4) * 0.4,
      phase:  (i / 10) * Math.PI * 2,
    }));

    let animId = 0;
    let t = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.016;
      ctx.clearRect(0, 0, SIZE, SIZE);

      particles.forEach((p) => {
        p.angle += p.speed;
        const x     = CX + Math.cos(p.angle) * RX;
        const y     = CY + Math.sin(p.angle) * RY;
        const alpha = Math.max(0.08, 0.28 + Math.sin(p.angle + p.phase + t) * 0.18);

        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,148,${alpha.toFixed(3)})`;
        ctx.fill();
      });

      /* Faint orbit ellipse guide */
      ctx.beginPath();
      ctx.ellipse(CX, CY, RX, RY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(139,92,246,0.12)';
      ctx.lineWidth   = 0.5;
      ctx.stroke();
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      aria-hidden="true"
      style={{
        position:      'absolute',
        top:           '50%',
        left:          '50%',
        transform:     'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex:        0,
        opacity:       0.85,
      }}
    />
  );
}
