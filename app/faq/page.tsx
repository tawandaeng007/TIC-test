import type { Metadata } from "next";
import ClinicSite from "../ClinicSite";

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย | TIC Clinic",
  description: "ข้อมูลการเตรียมตัว การดูแลหลังบริการ ที่จอดรถ การชำระเงิน และการผ่อนชำระ",
};

export default function FaqPage() {
  return <ClinicSite page="faq" />;
}
