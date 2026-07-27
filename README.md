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

## GitHub Pages

โปรเจกต์สร้างเว็บไซต์แบบ static สำหรับ GitHub Pages ลงในโฟลเดอร์ `docs`

```bash
npm run build:pages
```

จากนั้น commit และ push โฟลเดอร์ `docs` ขึ้นสาขา `main` และตั้งค่า GitHub Pages
ให้เผยแพร่จาก `main /docs`
