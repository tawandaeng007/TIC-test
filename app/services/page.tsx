import type { Metadata } from "next";
import ClinicSite from "../ClinicSite";

export const metadata: Metadata = {
  title: "บริการ | TIC Clinic",
  description: "โปรแกรมปรับรูปหน้า ยกกระชับ และดูแลผิวจาก TIC Clinic",
};

export default function ServicesPage() {
  return <ClinicSite page="services" />;
}
