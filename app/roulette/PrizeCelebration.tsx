"use client";

import { useEffect, useRef } from "react";
import { advanceCelebrationParticle, CELEBRATION_DURATION, createCelebrationParticles } from "../../lib/celebration.mjs";
import styles from "./LuckySpin.module.css";

export default function PrizeCelebration({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !active) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let startedAt = 0;
    let previousAt = 0;
    let width = 0;
    let height = 0;
    let particles: ReturnType<typeof createCelebrationParticles> = [];

    const stop = () => {
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, width, height);
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (now: number) => {
      if (!startedAt) { startedAt = now; previousAt = now; }
      const elapsed = (now - startedAt) / 1000;
      const dt = (now - previousAt) / 1000;
      previousAt = now;
      context.clearRect(0, 0, width, height);
      if (elapsed >= CELEBRATION_DURATION) return;
      const opacity = Math.min(1, (CELEBRATION_DURATION - elapsed) / 1.1);
      for (const particle of particles) {
        if (elapsed < particle.delay) continue;
        advanceCelebrationParticle(particle, dt);
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.angle);
        context.scale(Math.cos(particle.flip), 1);
        context.globalAlpha = opacity * (.68 + .32 * Math.abs(Math.cos(particle.flip)));
        context.fillStyle = particle.color;
        context.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
        context.restore();
      }
      frame = requestAnimationFrame(draw);
    };
    const start = () => {
      stop();
      if (preference.matches) return;
      resize();
      particles = createCelebrationParticles(width, height);
      startedAt = 0;
      frame = requestAnimationFrame(draw);
    };
    start();
    preference.addEventListener("change", start);
    window.addEventListener("resize", resize);
    return () => {
      stop();
      preference.removeEventListener("change", start);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className={styles.celebrationCanvas} aria-hidden="true" />;
}
