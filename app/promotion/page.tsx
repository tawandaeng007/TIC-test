import type { Metadata } from "next";
import ClinicSite from "../ClinicSite";

export const metadata: Metadata = {
  title: "โปรโมชั่น | TIC Clinic",
  description: "สิทธิพิเศษและโปรแกรมแนะนำล่าสุดจาก TIC Clinic",
};

export default function PromotionPage() {
  return <ClinicSite page="promotion" />;
}
