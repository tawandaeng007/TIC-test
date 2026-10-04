import type { Metadata, Viewport } from "next";
import HalloweenSpin from "./HalloweenSpin";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ff8a1f",
};

export const metadata: Metadata = {
  title: "TIC Lucky Spin Halloween | ของขวัญพิเศษจาก TIC Clinic",
  description: "สิทธิ์พิเศษสำหรับคุณ หมุนรับของขวัญแทนคำขอบคุณจาก TIC Clinic",
  openGraph: {
    title: "TIC Lucky Spin Halloween",
    description: "สิทธิ์พิเศษสำหรับคุณ หมุนรับของขวัญแทนคำขอบคุณจาก TIC Clinic",
    siteName: "TIC Clinic",
    locale: "th_TH",
    type: "website",
  },
};

export default function HalloweenSpinPage() {
  return <>
    {/* React hoists this stylesheet into <head>; the page still reads well on the fallback fonts. */}
    <link rel="stylesheet" precedence="default" href="https://fonts.googleapis.com/css2?family=Creepster&family=Knewave&family=Mitr:wght@300;400;500;600&display=swap" />
    <HalloweenSpin />
  </>;
}
