import assert from "node:assert/strict";
import test from "node:test";
import { prizes, totalWeight, prizeIndexForTicket, randomBelow, landingRotation, indexAtPointer, wheelPosition } from "../lib/lucky-spin.mjs";

test("confirmed rewards use exactly the current 100-ticket allocation", () => {
  assert.equal(totalWeight, 100);
  assert.deepEqual(prizes.map((p) => p.name), ["ทอง 25 สตางค์", "ฉีดหน้าใส Chanel", "Botox (Korea) 50U", "ร้อยไหม Mono 10 เส้น", "Hifu 50 Shots", "Golden Spoon Tm.", "G8 (10 mins)", "Laser รักแร้", "BioLight (5 mins)", "Tm. Mask"]);
  const counts = Array(10).fill(0);
  for (let ticket = 0; ticket < 100; ticket++) counts[prizeIndexForTicket(ticket)]++;
  assert.deepEqual(counts, [0, 5, 3, 3, 5, 10, 8, 15, 31, 20]);
  assert.deepEqual(prizes.map((p) => p.valueBaht), [17900, 4999, 3599, 3999, 2999, 2999, 999, 999, 1599, 1599]);
});

test("every weighted interval includes its first and last ticket", () => {
  let first = 0;
  prizes.forEach((p, index) => {
    if (p.weight === 0) return;
    assert.equal(prizeIndexForTicket(first), index);
    assert.equal(prizeIndexForTicket(first + p.weight - 1), index);
    first += p.weight;
  });
  for (const invalid of [-1, 100, .5, NaN, Infinity]) assert.throws(() => prizeIndexForTicket(invalid), RangeError);
});

test("crypto rejection sampling discards biased tail without changing reward weights", () => {
  const draws = [4294967295, 4294967200, 4294967199];
  let calls = 0;
  const mockCrypto = { getRandomValues: (array) => { array[0] = draws[calls++]; return array; } };
  assert.equal(randomBelow(100, mockCrypto), 99);
  assert.equal(calls, 3);
  assert.equal(randomBelow(100, { getRandomValues: (a) => { a[0] = 0; return a; } }), 0);
  for (const max of [0, -1, NaN, 1.2, 2 ** 32 + 1]) assert.throws(() => randomBelow(max), RangeError);
});

test("all ten prizes land correctly at every permitted jitter, including consecutive spins", () => {
  for (const start of [0, 1, 35, 359.5, 2345, 125673.25]) {
    let current = start;
    for (let repeat = 0; repeat < 10; repeat++) {
      for (let index = 0; index < 10; index++) {
        for (let jitter = -8; jitter <= 8; jitter++) {
          const next = landingRotation(current, index, jitter);
          assert.ok(next >= current + 2160);
          assert.ok(next < current + 2520);
          assert.equal(indexAtPointer(next), index);
          current = next;
        }
      }
    }
  }
});

test("landing rejects out-of-wheel prizes and unsafe offsets", () => {
  for (const index of [-1, 10, .5, NaN]) assert.throws(() => landingRotation(0, index), RangeError);
  for (const offset of [-9, 9, NaN]) assert.throws(() => landingRotation(0, 0, offset), RangeError);
});

test("drawing never changes weights or consumes a fixed prize quota", () => {
  const original = prizes.map((p) => p.weight);
  for (let i = 0; i < 500; i++) assert.equal(prizeIndexForTicket(0), 1);
  assert.deepEqual(prizes.map((p) => p.weight), original);
});

test("wheel coordinates have stable precision for server/client hydration", () => {
  assert.deepEqual(wheelPosition(0, 10, 33), { left: "50%", top: "17%" });
  assert.deepEqual(wheelPosition(6, 10, 33), { left: "30.6031%", top: "76.6976%" });
  for (let i = 0; i < 20; i++) {
    for (const coordinate of Object.values(wheelPosition(i, 20, 48.05))) {
      assert.match(coordinate, /^\d+(\.\d{1,4})?%$/);
      assert.ok(parseFloat(coordinate) > 0 && parseFloat(coordinate) < 100);
    }
  }
});
