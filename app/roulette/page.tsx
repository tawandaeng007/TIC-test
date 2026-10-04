import type { Metadata, Viewport } from "next";
import HalloweenSpin from "../halloween-spin/HalloweenSpin";

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
    url: "https://tawandaeng007.github.io/TIC-test/roulette/",
    siteName: "TIC Clinic",
    locale: "th_TH",
    type: "website",
    images: [{ url: "https://tawandaeng007.github.io/TIC-test/og.png", width: 1731, height: 909, alt: "TIC Lucky Spin — A little luck, with love." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TIC Lucky Spin Halloween",
    description: "สิทธิ์พิเศษสำหรับคุณ หมุนรับของขวัญแทนคำขอบคุณจาก TIC Clinic",
    images: ["https://tawandaeng007.github.io/TIC-test/og.png"],
  },
};

export default function RoulettePage() {
  return <>
    <link rel="stylesheet" precedence="default" href="https://fonts.googleapis.com/css2?family=Creepster&family=Knewave&family=Mitr:wght@300;400;500;600&display=swap" />
    <HalloweenSpin />
  </>;
}
