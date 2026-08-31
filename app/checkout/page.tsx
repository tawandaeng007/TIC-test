import type { Metadata } from "next";
import CheckoutPageClient from "./CheckoutPageClient";

export const metadata: Metadata = {
  title: "สรุปและชำระเงิน | TIC Clinic",
  description: "กรอกข้อมูลลูกค้าและทดลองขั้นตอนสรุปคำสั่งซื้อ TIC Clinic",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
