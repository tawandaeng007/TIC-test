import type { Metadata } from "next";
import ClinicSite from "../ClinicSite";

export const metadata: Metadata = {
  title: "ตารางแพทย์และนัดหมาย | TIC Clinic",
  description: "ตรวจสอบเวลารับนัดหมายและติดต่อทีม TIC Clinic เพื่อยืนยันแพทย์และคิวบริการ",
};

export default function SchedulePage() {
  return <ClinicSite page="schedule" />;
}
