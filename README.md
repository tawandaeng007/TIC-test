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

โปรเจกต์นี้ใช้ vinext และสร้างผลลัพธ์สำหรับ Cloudflare Workers ได้จากคำสั่ง
`npm run build` หากต้องการเผยแพร่เป็นเว็บไซต์ ควรเชื่อม GitHub repository
กับโฮสต์ที่รองรับ Node.js หรือ Cloudflare Workers แทนการใช้ GitHub Pages แบบไฟล์สถิติโดยตรง
