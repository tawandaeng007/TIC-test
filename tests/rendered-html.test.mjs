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
    assert.match(html, /CLINIC/);
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
  }
});
