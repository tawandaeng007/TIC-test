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

test("multi-price promotions require a selected option and keep its price in the cart", async () => {
  const variants = await readFile(new URL("../lib/catalog-variants.ts", import.meta.url), "utf8");
  const showcase = await readFile(new URL("../components/PromotionShowcase.tsx", import.meta.url), "utf8");
  const cart = await readFile(new URL("../components/CartProvider.tsx", import.meta.url), "utf8");

  assert.match(variants, /"premium-skin":[\s\S]*?"1-bottle", "1 กระปุก", 1290[\s\S]*?"6-bottles", "6 กระปุก", 4990[\s\S]*?"12-bottles", "12 กระปุก", 8990/);
  assert.match(variants, /"botox-program":[\s\S]*?"allergen-100u", "ALLERGEN \(อเมริกา\) · 100 U", 17999/);
  assert.match(showcase, /product-variant-picker/);
  assert.match(showcase, /onAdd\(selected\.id, selected\.title, selectedVariant\?\.id\)/);
  assert.match(cart, /lineKey: cartLineKey\(line\.id, variant\?\.id\)/);
  assert.match(cart, /unitPrice: variant\?\.price \?\? item\.price/);
});

test("mobile checkout action stays visible and trust cards use real icons", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const clinic = await readFile(new URL("../app/ClinicSite.tsx", import.meta.url), "utf8");
  const showcase = await readFile(new URL("../components/PromotionShowcase.tsx", import.meta.url), "utf8");

  assert.match(showcase, /checkout-button product-modal-add/);
  assert.match(styles, /@media \(max-width: 760px\)[\s\S]*?\.product-modal-add\s*\{[\s\S]*?position:\s*absolute[\s\S]*?bottom:/);
  assert.match(clinic, /ShieldCheck/);
  assert.match(clinic, /Stethoscope/);
  assert.match(clinic, /Cpu/);
  assert.match(clinic, /HeartHandshake/);
  assert.match(clinic, /cart-fly-effect/);
  assert.doesNotMatch(clinic, /icon:\s*"[✦◎◇♡]"/);
});
