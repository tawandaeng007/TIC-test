import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", "TIC Clinic"],
  ["/about", "ความงามที่ดี เริ่มจากความเข้าใจ"],
  ["/services", "บริการที่ออกแบบเพื่อคุณ"],
  ["/promotion", "สิทธิพิเศษจาก TIC Clinic"],
  ["/reviews", "เสียงจากผู้ใช้บริการจริง"],
  ["/results", "ผลลัพธ์ที่ยังคงเป็นคุณ"],
  ["/contact", "เริ่มต้นปรึกษาเราได้วันนี้"],
  ["/roulette", "TIC Lucky Spin"],
];

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders every clinic page", async () => {
  for (const [path, expectedText] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should return 200`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    assert.match(html, new RegExp(expectedText));
    assert.match(html, /TIC/);
    assert.match(html, /clinic/i);
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
    if (path === "/") assert.match(html, /<footer\b/, "the main clinic footer remains unchanged");
  }
});

test("Lucky Spin shows names and placeholder values, never probability copy or prize images", async () => {
  const response = await render("/roulette");
  const html = await response.text();
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, "");
  assert.match(visible, /หมุนรับโชค/);
  assert.match(visible, /100/);
  assert.match(visible, /ของรางวัลไม่สามารถแลกเปลี่ยน/);
  assert.doesNotMatch(visible, /%|เปอร์เซ็นต์|probability|weight|รูเล็ต|มูลค่ารวมกว่าแสน/);
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  assert.equal(images.length, 1, "only the pointer logo remains on the main spin screen");
  assert.ok(images.every((tag) => /src="\/images\/tic-clinic-logo\.png"/.test(tag)));
  assert.doesNotMatch(html, /<nav\b/);
  assert.doesNotMatch(html, /<header\b/, "no white header bar or top logo on Lucky Spin");
  assert.doesNotMatch(html, /<footer\b/, "Lucky Spin must not render the dark clinic footer bar");
  assert.deepEqual([...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map((match) => match[1]), ["#rewards"]);
  assert.match(html, /<dialog\b/);
  assert.match(html, /data-effects="on"/);
  assert.match(html, /data-state="idle"/);
  assert.equal([...html.matchAll(/--light-phase:/g)].length, 32, "32 decorative lamps surround the wheel");
  assert.match(visible, /พักเอฟเฟกต์/);
});
