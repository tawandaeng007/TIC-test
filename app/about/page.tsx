import type { Metadata } from "next";
import ClinicSite from "../ClinicSite";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | TIC Clinic",
  description: "รู้จักแนวทางการดูแล มาตรฐาน และทีมงานของ TIC Clinic",
};

export default function AboutPage() {
  return <ClinicSite page="about" />;
}
