export type CatalogItem = {
  id: string;
  tag: string;
  title: string;
  shortTitle: string;
  detail: string;
  price: number;
  position: string;
  category: "ปรับรูปหน้า" | "ดูแลผิว" | "ยกกระชับ";
};

export const catalog: CatalogItem[] = [
  { id: "wrinkle-botox", tag: "Signature", title: "โบท็อกซ์ริ้วรอย", shortTitle: "Botox", detail: "ลดริ้วรอย คืนความอ่อนเยาว์", price: 2990, position: "16%", category: "ปรับรูปหน้า" },
  { id: "face-filler", tag: "Popular", title: "ฟิลเลอร์ปรับรูปหน้า", shortTitle: "Filler", detail: "ปรับรูปหน้า ดูมีมิติอย่างเป็นธรรมชาติ", price: 6990, position: "24%", category: "ปรับรูปหน้า" },
  { id: "bright-laser", tag: "Brightening", title: "เลเซอร์หน้าใส", shortTitle: "Laser", detail: "ผิวกระจ่างใส ลดฝ้า จุดด่างดำ", price: 3990, position: "34%", category: "ดูแลผิว" },
  { id: "ultherapy-lift", tag: "Lift & Firm", title: "ยกกระชับ Ultherapy", shortTitle: "Ultherapy", detail: "ยกกระชับผิว ไม่ต้องผ่าตัด", price: 39900, position: "12%", category: "ยกกระชับ" },
  { id: "skin-booster", tag: "Healthy Glow", title: "Skin Booster", shortTitle: "Skin Booster", detail: "ผิวชุ่มชื้น ฉ่ำวาว สุขภาพดี", price: 4990, position: "28%", category: "ดูแลผิว" },
];

export const catalogById = new Map(catalog.map((item) => [item.id, item]));
export const formatBaht = (value: number) => new Intl.NumberFormat("th-TH").format(value);
