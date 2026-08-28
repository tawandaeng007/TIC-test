import test from "node:test";
import assert from "node:assert/strict";
import { CELEBRATION_DURATION, createCelebrationParticles, advanceCelebrationParticle } from "../lib/celebration.mjs";

test("celebration creates two bounded ribbon bursts with reproducible cosmetic motion", () => {
  for (const [width, height] of [[375, 812], [1440, 900]]) {
    const particles = createCelebrationParticles(width, height);
    assert.equal(particles.length, 88);
    assert.deepEqual(particles, createCelebrationParticles(width, height));
    particles.forEach((particle, index) => {
      assert.ok(particle.x > 0 && particle.x < width);
      assert.ok(particle.y > 0 && particle.y < height);
      assert.ok(particle.vy < 0);
      assert.ok(index % 2 === 0 ? particle.vx > 0 : particle.vx < 0);
      assert.ok(particle.delay >= .28 && particle.delay < .48);
    });
  }
});

test("ribbons arc and fall under gravity, then stop within a finite celebration", () => {
  const particles = createCelebrationParticles(1440, 900);
  assert.equal(CELEBRATION_DURATION, 4.8);
  for (let frame = 0; frame < CELEBRATION_DURATION * 60; frame++) {
    particles.forEach((particle) => advanceCelebrationParticle(particle, 1 / 60));
  }
  particles.forEach((particle) => {
    assert.ok(particle.vy > 0);
    for (const value of Object.values(particle)) if (typeof value === "number") assert.ok(Number.isFinite(value));
  });
});

test("a background-tab pause cannot make the next animation step jump", () => {
  const first = createCelebrationParticles(1440, 900)[0];
  const second = { ...first };
  advanceCelebrationParticle(first, 30);
  advanceCelebrationParticle(second, .04);
  assert.deepEqual(first, second);
});
