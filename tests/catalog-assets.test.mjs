import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";

test("promotion catalog has unique products with local artwork", async () => {
  const source = await readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8");
  const ids = [...source.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);
  const images = [...source.matchAll(/image: "(\/images\/promotions\/[^"]+)"/g)].map((match) => match[1]);

  assert.equal(ids.length, 22);
  assert.equal(new Set(ids).size, ids.length, "product ids must be unique");
  assert.equal(images.length, ids.length);
  assert.equal(new Set(images).size, images.length, "promotion artwork must not be duplicated");
  for (const image of images) await access(new URL(`../public${image}`, import.meta.url));
});

test("promotion artwork uses a complete mobile 4:5 presentation", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const showcase = await readFile(new URL("../components/PromotionShowcase.tsx", import.meta.url), "utf8");

  assert.match(styles, /\.promotion-product-image\s*\{[\s\S]*?aspect-ratio:\s*4\s*\/\s*5/);
  assert.match(styles, /\.promotion-product-image::before/);
  assert.match(styles, /\.promotion-product-image img,[\s\S]*?object-fit:\s*contain/);
  assert.match(showcase, /--promotion-art/);
});
