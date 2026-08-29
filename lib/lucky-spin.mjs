// Display values confirmed by the clinic; weights remain independent of value.
// Weights are per-spin probabilities, not a guaranteed distribution or stock count.
export const prizes = Object.freeze([
  { id: "gold", name: "ทอง 25 สตางค์", lines: ["ทอง", "25 สตางค์"], weight: 0, valueBaht: 17900 },
  { id: "chanel", name: "ฉีดหน้าใส Chanel", lines: ["ฉีดหน้าใส", "Chanel"], weight: 5, valueBaht: 4999 },
  { id: "botox", name: "Botox (Korea) 50U", lines: ["Botox (Korea)", "50U"], weight: 3, valueBaht: 3599 },
  { id: "mono", name: "ร้อยไหม Mono 10 เส้น", lines: ["ร้อยไหม Mono", "10 เส้น"], weight: 3, valueBaht: 3999 },
  { id: "hifu", name: "Hifu 50 Shots", lines: ["Hifu", "50 Shots"], weight: 5, valueBaht: 2999 },
  { id: "spoon", name: "Golden Spoon Tm.", lines: ["Golden", "Spoon Tm."], weight: 10, valueBaht: 2999 },
  { id: "g8", name: "G8 (10 mins)", lines: ["G8", "(10 mins)"], weight: 8, valueBaht: 999 },
  { id: "laser", name: "Laser รักแร้", lines: ["Laser", "รักแร้"], weight: 15, valueBaht: 999 },
  { id: "biolight", name: "BioLight (5 mins)", lines: ["BioLight", "(5 mins)"], weight: 31, valueBaht: 1599 },
  { id: "mask", name: "Tm. Mask", lines: ["Tm. Mask"], weight: 20, valueBaht: 1599 },
].map((prize) => Object.freeze(prize)));

export const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);

/** Round layout coordinates to stable CSS values across server/browser math engines.
 * @param {number} index @param {number} count @param {number} radius */
export function wheelPosition(index, count, radius) {
  const angle = index * 2 * Math.PI / count;
  return {
    left: `${Number((50 + radius * Math.sin(angle)).toFixed(4))}%`,
    top: `${Number((50 - radius * Math.cos(angle)).toFixed(4))}%`,
  };
}

/** Map one of the 100 equally likely integer tickets to its exact reward. @param {number} ticket */
export function prizeIndexForTicket(ticket) {
  if (!Number.isInteger(ticket) || ticket < 0 || ticket >= totalWeight) throw new RangeError("Invalid reward ticket");
  let boundary = 0;
  return prizes.findIndex((prize) => (boundary += prize.weight) > ticket);
}

/** Rejection sampling avoids modulo bias. @param {number} max @param {Crypto} source */
export function randomBelow(max, source = globalThis.crypto) {
  if (!Number.isSafeInteger(max) || max < 1 || max > 2 ** 32) throw new RangeError("Invalid random bound");
  const values = new Uint32Array(1);
  const limit = Math.floor(2 ** 32 / max) * max;
  do { source.getRandomValues(values); } while (values[0] >= limit);
  return values[0] % max;
}

/** The pointer is at twelve o'clock; index 0 starts centered beneath it.
 * @param {number} current @param {number} index @param {number} jitter */
export function landingRotation(current, index, jitter = 0) {
  if (!Number.isFinite(current) || !Number.isInteger(index) || index < 0 || index >= prizes.length || !Number.isFinite(jitter) || Math.abs(jitter) > 8) throw new RangeError("Invalid wheel landing");
  const normalize = (/** @type {number} */ angle) => ((angle % 360) + 360) % 360;
  return current + 360 * 6 + normalize(normalize(-index * 36 + jitter) - normalize(current));
}

/** @param {number} rotation */
export function indexAtPointer(rotation) {
  return Math.round((((-rotation % 360) + 360) % 360) / 36) % prizes.length;
}
