import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "ตะกร้าของฉัน | TIC Clinic",
  description: "เลือกและตรวจสอบโปรโมชั่นหรือโปรแกรม TIC Clinic ก่อนยืนยันรายการ",
};

export default function CartPage() {
  return <CartPageClient />;
}
