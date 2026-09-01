export type CatalogItem = {
  id: string;
  tag: string;
  title: string;
  shortTitle: string;
  detail: string;
  price: number;
  image: string;
  category: "ปรับรูปหน้า" | "ยกกระชับ" | "ดูแลผิว" | "ดริปวิตามิน" | "เลเซอร์" | "ดูแลรูปร่าง";
  featured?: boolean;
};

export const catalog: CatalogItem[] = [
  { id: "lip-filler", tag: "Popular", title: "ฟิลเลอร์ปาก", shortTitle: "Lip Filler", detail: "โปรแกรมฟิลเลอร์ปาก ราคาเริ่มต้นต่อ 1 cc", price: 3999, image: "/images/promotions/lip-filler.jpg", category: "ปรับรูปหน้า", featured: true },
  { id: "hifu-lift", tag: "Lift & Firm", title: "HIFU ยกกระชับ", shortTitle: "HIFU", detail: "โปรแกรมยกกระชับ ราคาเริ่มต้น 100 Shots", price: 3999, image: "/images/promotions/hifu-lift.jpg", category: "ยกกระชับ", featured: true },
  { id: "botox-program", tag: "Signature", title: "Botox ลดกราม–ริ้วรอย", shortTitle: "Botox", detail: "โปรแกรมโบท็อกซ์หลายตัวเลือก ราคาเริ่มต้น", price: 2599, image: "/images/promotions/botox-program.jpg", category: "ปรับรูปหน้า", featured: true },
  { id: "premium-skin", tag: "Healthy Glow", title: "Premium Skin", shortTitle: "Premium Skin", detail: "ดริปวิตามินสูตร Premium Skin ราคาเริ่มต้น 1 กระปุก", price: 1290, image: "/images/promotions/premium-skin.jpg", category: "ดริปวิตามิน", featured: true },
  { id: "diode-laser", tag: "Smooth Skin", title: "Diode Laser", shortTitle: "Diode Laser", detail: "โปรแกรมกำจัดขนด้วย Diode Laser ราคาเริ่มต้น", price: 599, image: "/images/promotions/diode-laser.jpg", category: "เลเซอร์", featured: true },
  { id: "acne-clear", tag: "Clear Skin", title: "Acne Clear 5 ขั้นตอน", shortTitle: "Acne Clear", detail: "โปรแกรมดูแลสิว 5 ขั้นตอน", price: 999, image: "/images/promotions/acne-clear.jpg", category: "ดูแลผิว", featured: true },
  { id: "lock-s", tag: "Body Care", title: "ล็อกหุ่น S", shortTitle: "Lock S", detail: "โปรแกรมดูแลรูปร่าง ราคาเริ่มต้น 1 ครั้ง", price: 2999, image: "/images/promotions/lock-s.jpg", category: "ดูแลรูปร่าง" },
  { id: "filler-amd", tag: "Special Set", title: "Filler AMD 3 แถม 1", shortTitle: "Filler AMD", detail: "เซ็ตฟิลเลอร์ AMD ตามเงื่อนไขในโปรโมชั่น", price: 8999, image: "/images/promotions/filler-amd.jpg", category: "ปรับรูปหน้า" },
  { id: "vitamin-drip", tag: "Starter", title: "Vitamin Drip", shortTitle: "Vitamin Drip", detail: "ดริปวิตามินสูตร Multi Vit C และ Skin Aura ราคาเริ่มต้น", price: 390, image: "/images/promotions/vitamin-drip.jpg", category: "ดริปวิตามิน" },
  { id: "weight-lock-s", tag: "Body Care", title: "หุ่นเพรียว ล็อกหุ่น S", shortTitle: "Weight Lock S", detail: "โปรแกรมดูแลรูปร่าง มีหลายแพ็กเกจให้เลือก", price: 2999, image: "/images/promotions/weight-lock-s.jpg", category: "ดูแลรูปร่าง" },
  { id: "bright-injection", tag: "Glow", title: "โปรแกรมฉีดหน้าใส", shortTitle: "Bright Injection", detail: "โปรแกรมฉีดหน้าใสหลายสูตร ราคาเริ่มต้น", price: 1999, image: "/images/promotions/bright-injection.jpg", category: "ดูแลผิว" },
  { id: "multi-vit-c", tag: "Vitamin", title: "Multi Vit C", shortTitle: "Multi Vit C", detail: "ดริปวิตามินสูตร Multi Vit C ราคาเริ่มต้น 1 กระปุก", price: 390, image: "/images/promotions/multi-vit-c.jpg", category: "ดริปวิตามิน" },
  { id: "skin-aura", tag: "Vitamin", title: "Skin Aura", shortTitle: "Skin Aura", detail: "ดริปวิตามินสูตร Skin Aura ราคาเริ่มต้น 1 กระปุก", price: 690, image: "/images/promotions/skin-aura.jpg", category: "ดริปวิตามิน" },
  { id: "triple-aura", tag: "Vitamin", title: "Triple Aura", shortTitle: "Triple Aura", detail: "ดริปวิตามินสูตร Triple Aura ราคาเริ่มต้น 1 กระปุก", price: 1990, image: "/images/promotions/triple-aura.jpg", category: "ดริปวิตามิน" },
  { id: "cinder", tag: "Vitamin", title: "Cinder", shortTitle: "Cinder", detail: "ดริปวิตามินสูตร Cinder ราคาเริ่มต้น 1 กระปุก", price: 2290, image: "/images/promotions/cinder.jpg", category: "ดริปวิตามิน" },
  { id: "neo-bright", tag: "Vitamin", title: "Neo Bright", shortTitle: "Neo Bright", detail: "ดริปวิตามินสูตร Neo Bright ราคาเริ่มต้น 1 กระปุก", price: 4990, image: "/images/promotions/neo-bright.jpg", category: "ดริปวิตามิน" },
  { id: "face-v-lift", tag: "V Shape", title: "ยกกระชับหน้า V View", shortTitle: "V View", detail: "โปรแกรมยกกระชับและปรับกรอบหน้า ราคาเริ่มต้น", price: 1999, image: "/images/promotions/face-v-lift.jpg", category: "ยกกระชับ" },
  { id: "acne-care", tag: "Clear Skin", title: "โปรแกรมรักษาสิว", shortTitle: "Acne Care", detail: "โปรแกรมดูแลสิว ราคาเริ่มต้น 5 ขั้นตอน", price: 999, image: "/images/promotions/acne-care.jpg", category: "ดูแลผิว" },
  { id: "mounjaro", tag: "Body Care", title: "Mounjaro", shortTitle: "Mounjaro", detail: "โปรแกรมดูแลรูปร่าง ราคาเริ่มต้น 2.5 mg", price: 15000, image: "/images/promotions/mounjaro.jpg", category: "ดูแลรูปร่าง" },
  { id: "collagen-program", tag: "Rejuvenation", title: "โปรแกรมฟื้นฟูผิวและคอลลาเจน", shortTitle: "Collagen Program", detail: "โปรแกรมฟื้นฟูผิวหลายตัวเลือก ราคาเริ่มต้น", price: 8999, image: "/images/promotions/collagen-program.jpg", category: "ดูแลผิว" },
  { id: "derma-glow", tag: "Glow", title: "Derma Glow", shortTitle: "Derma Glow", detail: "โปรแกรมดูแลผิว Derma Glow ราคาพิเศษต่อขวด", price: 2999, image: "/images/promotions/derma-glow.jpg", category: "ดูแลผิว" },
  { id: "vitran", tag: "Skin Booster", title: "VITRAN", shortTitle: "VITRAN", detail: "โปรแกรม VITRAN ราคาเริ่มต้น 1 cc", price: 8999, image: "/images/promotions/vitran.jpg", category: "ดูแลผิว" },
];

export const featuredCatalog = catalog.filter((item) => item.featured);
export const catalogById = new Map(catalog.map((item) => [item.id, item]));
export const formatBaht = (value: number) => new Intl.NumberFormat("th-TH").format(value);
