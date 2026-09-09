import type { Metadata } from "next";
import ClinicSite from "../ClinicSite";

export const metadata: Metadata = {
  title: "ติดต่อและนัดหมาย | TIC Clinic",
  description: "ติดต่อ TIC Clinic และนัดหมายปรึกษาทีมแพทย์",
};

export default function ContactPage() {
  return <ClinicSite page="contact" />;
}
