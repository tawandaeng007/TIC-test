import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, access } from "node:fs/promises";
const root = new URL("../docs/", import.meta.url);
async function files(dir) {
  const entries = await readdir(dir, {withFileTypes:true});
  const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? files(new URL(entry.name+"/",dir)) : [new URL(entry.name,dir)]));
  return nested.flat();
}
test("all published routes and payloads exclude restricted content", async()=>{
  for(const file of await files(root)) {
    if(!/\.(html|txt|js)$/.test(file.pathname))continue;
    const html=await readFile(file,"utf8");
    assert.doesNotMatch(html,/ใส่ตะกร้า|เพิ่มลงตะกร้า|จองคิว|ซื้อ.*แถม|ราคาเริ่มต้น|หมุนรับโชค|TIC Lucky Spin|VIDEO INTERVIEW|17,900|4,999/,file.pathname);
    assert.doesNotMatch(html,/images\/(?:promotions|reviews)\//,file.pathname);
  }
});
test("direct legacy links are closed and price/review image URLs are absent",async()=>{
  for(const route of ["cart","checkout","promotion","reviews","results","roulette"]){
    const html=await readFile(new URL(route+"/index.html",root),"utf8");
    assert.match(html,/หน้านี้ยังไม่เปิดใช้งาน/);
    assert.doesNotMatch(html,/<form|<dialog/);
  }
  for(const asset of ["images/promotions","images/reviews","og.png"]){
    await assert.rejects(access(new URL(asset,root)));
  }
});
test("article detail links exist and cite real source pages",async()=>{
  const dirs=await readdir(new URL("articles/",root),{withFileTypes:true});
  let count=0;
  for(const dir of dirs.filter(d=>d.isDirectory()&&!d.name.startsWith("__"))){
    const html=await readFile(new URL("articles/"+dir.name+"/index.html",root),"utf8");
    assert.match(html,/แหล่งข้อมูล/);
    assert.match(html,/https:\/\/www\.(aad\.org|fda\.gov)/);
    count++;
  }
  assert.equal(count,8);
});
