import type { Metadata } from "next";
import CheckoutPageClient from "./CheckoutPageClient";

export const metadata: Metadata = {
  title: "สรุปและชำระเงิน | TIC Clinic",
  description: "กรอกข้อมูลผู้รับบริการและตรวจสอบรายการโปรแกรม TIC Clinic",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
