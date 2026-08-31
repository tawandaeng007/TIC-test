import assert from "node:assert/strict";
import test from "node:test";
import { readFile, access } from "node:fs/promises";

const docs = new URL("../docs/", import.meta.url);

test("exported Lucky Spin is standalone with repository-prefixed logo and local assets", async () => {
  const html = await readFile(new URL("roulette/index.html", docs), "utf8");
  assert.doesNotMatch(html, /<nav\b/);
  assert.doesNotMatch(html, /<header\b/);
  assert.doesNotMatch(html, /<footer\b/);
  assert.deepEqual([...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map((match) => match[1]), ["#rewards"]);
  assert.match(html, /src="\/TIC-test\/images\/tic-clinic-logo\.png"/);
  const assets = [...html.matchAll(/(?:src|href)="(\/TIC-test\/[^"?#]+)(?:[?#][^"]*)?"/g)].map((match) => match[1]).filter((path) => /\.(js|css|svg|png)$/.test(path));
  assert.ok(assets.length >= 3);
  for (const asset of assets) await access(new URL(asset.replace("/TIC-test/", ""), docs));
  await access(new URL(".nojekyll", docs));
  await access(new URL("og.png", docs));
  assert.deepEqual(await readFile(new URL("images/tic-clinic-logo.png", docs)), await readFile(new URL("../public/images/tic-clinic-logo.png", import.meta.url)), "export must preserve the supplied logo");
  assert.doesNotMatch(html, /(?:src|href)="\/_next\//);
  assert.match(html, /name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/);
  assert.doesNotMatch(html, /user-scalable=no|maximum-scale=1/);
});

test("home and Lucky Spin have their own titles and correct social metadata", async () => {
  for (const [file, title] of [["index.html", "TIC Clinic | ดูแลความงามอย่างมั่นใจ"], ["roulette/index.html", "TIC Lucky Spin | ของขวัญพิเศษจาก TIC Clinic"]]) {
    const html = await readFile(new URL(file, docs), "utf8");
    assert.ok(html.includes(`<title>${title}</title>`));
    assert.match(html, /property="og:image" content="https:\/\/tawandaeng007\.github\.io\/TIC-test\/og\.png"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    if (file.startsWith("roulette")) {
      assert.match(html, /property="og:title" content="TIC Lucky Spin"/);
      assert.match(html, /name="twitter:title" content="TIC Lucky Spin"/);
    }
  }
});

test("commerce pages are exported for GitHub Pages", async () => {
  for (const [file, text] of [["cart/index.html", "ตะกร้าของคุณ"], ["checkout/index.html", "ข้อมูลสำหรับรับบริการ"]]) {
    const html = await readFile(new URL(file, docs), "utf8");
    assert.match(html, new RegExp(text));
    assert.doesNotMatch(html, /name="(?:card|cardNumber|cvv|cvc|expiry)"/i);
  }
});
