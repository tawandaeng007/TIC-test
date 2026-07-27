import type { Metadata } from "next";
import ClinicSite from "../ClinicSite";

export const metadata: Metadata = {
  title: "ผลลัพธ์การดูแล | TIC Clinic",
  description: "ผลลัพธ์ที่ดูเป็นธรรมชาติและเหมาะกับความต้องการเฉพาะบุคคล",
};

export default function ResultsPage() {
  return <ClinicSite page="results" />;
}
