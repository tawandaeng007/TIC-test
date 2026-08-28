// Optional browser regression check. Use an installed Playwright package, or
// pass its ESM URL through PLAYWRIGHT_MODULE. Test WebKit, not only Chromium.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const engines = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const target = process.env.WHEEL_TEST_URL || "http://127.0.0.1:3005/TIC-test/roulette/";
const sizes = [[320,568],[360,780],[375,812],[390,844],[402,874],[430,932],[568,320],[768,1024],[820,1180],[1024,768],[1180,820],[1440,900]];
const output = "work/wheel-layout";
await mkdir(output, { recursive:true });
const reports = [];

function geometry() {
  const wheel = document.querySelector('[style*="--rotation"]');
  const rim = wheel.parentElement;
  const hub = rim.querySelector('button');
  const measure = element => {
    const style = getComputedStyle(element), rect = element.getBoundingClientRect();
    return { width:parseFloat(style.width), height:parseFloat(style.height), left:rect.left, right:rect.right, cx:(rect.left+rect.right)/2, cy:(rect.top+rect.bottom)/2, visibleWidth:rect.width, visibleHeight:rect.height };
  };
  return { viewport:innerWidth, scrollWidth:document.documentElement.scrollWidth, wheel:measure(wheel), rim:measure(rim), hub:measure(hub) };
}

function check(sample, label) {
  for(const name of ['rim','wheel','hub']) {
    const r = sample[name];
    assert.ok(Math.abs(r.width-r.height) < 1, `${label}: ${name} stretched ${r.width} x ${r.height}`);
    assert.ok(Math.abs(r.visibleWidth-r.visibleHeight) < 1, `${label}: ${name} distorted during rotation`);
    assert.ok(Math.abs(r.cx-sample.rim.cx) < 1 && Math.abs(r.cy-sample.rim.cy) < 1, `${label}: ${name} off center`);
  }
  assert.ok(sample.scrollWidth <= sample.viewport+1, `${label}: horizontal overflow`);
  assert.ok(sample.rim.left >= -1 && sample.rim.right <= sample.viewport+1, `${label}: rim clipped`);
}

for(const name of (process.env.WHEEL_TEST_ENGINES || 'webkit,chromium').split(',')) {
  const browser = await engines[name].launch({ headless:true, ...(name==='chromium' && process.env.CHROMIUM_CHANNEL ? {channel:process.env.CHROMIUM_CHANNEL} : {}) });
  try {
    const page = await browser.newPage({viewport:{width:402,height:874},deviceScaleFactor:2,isMobile:true,hasTouch:true});
    const errors=[];
    page.on('pageerror', error=>errors.push(error.message));
    await page.goto(target,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const idle=[];
    for(const [width,height] of sizes) {
      await page.setViewportSize({width,height});
      const sample=await page.evaluate(geometry);
      check(sample, `${name} ${width}x${height}`);
      idle.push(sample);
    }
    await page.setViewportSize({width:402,height:874});
    await page.getByRole('region',{name:'วงล้อของรางวัล TIC Lucky Spin'}).screenshot({path:`${output}/${name}-phone.png`,animations:'disabled'});
    await page.getByRole('button',{name:'หมุนรับโชค',exact:true}).first().click();
    const samples=[];
    // Measure repeatedly until the actual animation completes.
    for(let i=0;i<100;i++) {
      if(i===8) await page.setViewportSize({width:320,height:568});
      if(i===20) await page.setViewportSize({width:768,height:1024});
      if(i===32) await page.setViewportSize({width:874,height:402});
      const sample=await page.evaluate(geometry);
      check(sample, `${name} spin frame ${i}`);
      samples.push(sample);
      if(await page.locator('dialog[open]').count()) break;
      await new Promise(resolve=>setTimeout(resolve,80));
    }
    assert.ok(samples.length>10, `${name}: need measurements during the real animation`);
    await page.locator('dialog[open]').waitFor({timeout:10000});
    await page.getByRole('button',{name:'เรียบร้อย',exact:true}).click();
    await page.locator('dialog[open]').waitFor({state:'hidden'});
    check(await page.evaluate(geometry), `${name} after result`);
    assert.deepEqual(errors,[],`${name}: browser errors`);
    reports.push({engine:name,version:browser.version(),idle,animationSamples:samples.length});
    console.log(`PASS ${name}: ${sizes.length} sizes; ${samples.length} real spin samples; resize while spinning; rim/disc/hub square and centered`);
  } finally { await browser.close(); }
}
await writeFile(`${output}/report.json`,JSON.stringify({target,reports},null,2));
