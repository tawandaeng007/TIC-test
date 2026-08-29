# TIC Clinic Website

เว็บไซต์คลินิกความงามแบบหลายหน้า รองรับเดสก์ท็อป แท็บเล็ต และมือถือ

## Pages

- `/` หน้าแรก
- `/about` เกี่ยวกับเรา
- `/services` บริการ
- `/promotion` โปรโมชั่น
- `/reviews` รีวิว
- `/results` ผลลัพธ์
- `/contact` ติดต่อและนัดหมาย
- `/roulette` TIC Lucky Spin — หน้ากิจกรรมแยกจากเว็บคลินิก

## TIC Lucky Spin

รายละเอียดของรางวัลอยู่ใน `lib/lucky-spin.mjs` แก้ `valueBaht` เพื่อเปลี่ยนมูลค่า
ขณะนี้ทุกชิ้นใส่ค่าชั่วคราว 100 บาทตามที่ตกลงไว้ ไม่ใช่ราคาจริงที่คลินิกยืนยัน

ระบบสุ่มใช้ `crypto.getRandomValues` และ rejection sampling โดยน้ำหนักทั้ง 10 รายการ
คือ 0, 5, 3, 3, 5, 10, 8, 15, 31, 20 ตามลำดับ รวม 100
ทอง 25 สตางค์ยังแสดงในวงล้อและรายการรางวัล แต่ตั้งน้ำหนักเป็น 0 จึงไม่สามารถสุ่มออกได้
เป็นโอกาสอิสระต่อครั้ง ไม่ใช่โควตาของรางวัลและไม่รับประกันจำนวนครั้งที่ออก
วงล้อแสดงช่องเท่ากันเพื่อจัดวางชื่อ แต่เลือกผลด้วยน้ำหนักก่อนคำนวณจุดหยุด
ไม่แสดงโอกาสบนหน้าเว็บ วงล้อ รายการรางวัล หรือหน้าผลรางวัล

การให้สิทธิ์หมุนและตรวจรับรางวัลให้คลินิกจัดการเองนอกเว็บ
หน้านี้ไม่มีระบบล็อกอิน โควตา บันทึกผู้รับ หรือหลักฐานการรับรางวัลจากเซิร์ฟเวอร์
น้ำหนักและผลอยู่ฝั่งเบราว์เซอร์ จึงตรวจดูและดัดแปลงได้โดยผู้ใช้ที่มีความรู้
การซ่อนเปอร์เซ็นต์จากหน้าเว็บไม่ใช่การเก็บเป็นความลับหรือป้องกันการโกง
เหมาะกับการให้ลูกค้ากดบนเครื่องที่พนักงานดูแล ไม่ใช่การยืนยันรางวัลจากลิงก์สาธารณะ

ทดสอบการสุ่มและการหยุด: `npm run test:spin`
ทดสอบรวมการแสดงผลหน้าเว็บ: `npm test`

หน้า Lucky Spin ปรับโครงสร้างสำหรับมือถือและ iPad ทั้งแนวตั้ง/แนวนอน
มีพื้นที่เผื่อรอยบากและแถบ Home, ปุ่มแตะอย่างน้อย 44px และการ์ดผลรางวัลเลื่อนได้บนจอเตี้ย
ทดสอบขนาดจอจำลอง 320–1440px รวม iPad Split View, หมุนจอระหว่างสุ่ม และ reduced motion
การทดสอบจอจำลองไม่ใช่การทดสอบ Safari บนอุปกรณ์ Apple จริง

ตรวจปัญหาวงล้อยืดด้วย `node scripts/check-wheel-layout.mjs` (ต้องมี Playwright
และ WebKit/Chromium สำหรับทดสอบ หรือกำหนด `PLAYWRIGHT_MODULE` เป็น ESM URL ของแพ็กเกจที่ติดตั้งไว้)
กำหนด `WHEEL_TEST_URL` เพื่อทดสอบเว็บปลายทาง และ `CHROMIUM_CHANNEL` หากใช้ Chrome/Edge
ชุดนี้วัดกรอบ จานหมุน และปุ่มกลางทั้งตอนหยุดและระหว่างหมุนพร้อมเปลี่ยนขนาดจอ

ภาพแชร์ลิงก์อยู่ที่ `public/og.png` สร้างด้วย built-in imagegen
จาก brief: premium landscape TIC CLINIC / TIC Lucky Spin / A little luck, with love.;
royal-blue, icy-white, gold; glass bubbles, silky backdrop, ten blank wheel sections;
no prize images, prices, percentages, people or browser chrome.

## Development

ต้องใช้ Node.js `22.13.0` ขึ้นไป

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000` ในเบราว์เซอร์

## Verify the production build

```bash
npm run build
npm test
```

## Upload to GitHub

สร้าง repository เปล่าบน GitHub แล้วรัน:

```bash
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

## GitHub Pages

โปรเจกต์สร้างเว็บไซต์แบบ static สำหรับ GitHub Pages ลงในโฟลเดอร์ `docs`

```bash
npm run build:pages
```

จากนั้น commit และ push โฟลเดอร์ `docs` ขึ้นสาขา `main` และตั้งค่า GitHub Pages
ให้เผยแพร่จาก `main /docs`
