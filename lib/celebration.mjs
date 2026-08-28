// Cosmetic animation only. This module never reads or changes reward selection.
export const CELEBRATION_DURATION = 4.8;

/** @param {number} width @param {number} height @param {number} seed */
export function createCelebrationParticles(width, height, seed = 71) {
  let state = seed >>> 0;
  const random = () => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 4294967296);
  const scale = Math.max(.65, Math.min(1.15, width / 1100));
  return Array.from({ length: 88 }, (_, index) => {
    const fromLeft = index % 2 === 0;
    return {
      x: width * (fromLeft ? .15 : .85), y: height * .63,
      vx: (fromLeft ? 1 : -1) * (100 + random() * 230) * scale,
      vy: -(310 + random() * 250) * scale,
      width: (3 + random() * 3) * scale, height: (7 + random() * 8) * scale,
      angle: random() * Math.PI * 2, spin: (random() - .5) * 7,
      flip: random() * Math.PI * 2, flutter: 4 + random() * 5,
      delay: .28 + random() * .2,
      color: ["#d8b464", "#f0d697", "#ba934c", "#f8f4e7", "#7f9bb9"][index % 5],
    };
  });
}

/** Time-based physics, capped after background-tab pauses.
 * @param {ReturnType<typeof createCelebrationParticles>[number]} particle @param {number} seconds */
export function advanceCelebrationParticle(particle, seconds) {
  const dt = Math.max(0, Math.min(seconds, .04));
  particle.vx *= Math.exp(-.45 * dt);
  particle.vy += 245 * dt;
  particle.x += particle.vx * dt;
  particle.y += particle.vy * dt;
  particle.angle += particle.spin * dt;
  particle.flip += particle.flutter * dt;
}
