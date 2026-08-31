import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "ตะกร้าของฉัน | TIC Clinic",
  description: "เลือกและตรวจสอบคอร์ส TIC Clinic ก่อนดำเนินการสั่งซื้อแบบทดลอง",
};

export default function CartPage() {
  return <CartPageClient />;
}
