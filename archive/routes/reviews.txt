import type { Metadata } from "next";
import ClinicSite from "../ClinicSite";

export const metadata: Metadata = {
  title: "รีวิวจากผู้ใช้บริการ | TIC Clinic",
  description: "ประสบการณ์จริงจากผู้ที่ไว้วางใจให้ TIC Clinic ดูแล",
};

export default function ReviewsPage() {
  return <ClinicSite page="reviews" />;
}
