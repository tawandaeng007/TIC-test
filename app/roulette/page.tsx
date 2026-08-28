import type { Metadata, Viewport } from "next";
import LuckySpin from "./LuckySpin";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#edf5ff",
};

export const metadata: Metadata = {
  title: "TIC Lucky Spin | ของขวัญพิเศษจาก TIC Clinic",
  description: "สิทธิ์พิเศษสำหรับคุณ หมุนรับของขวัญแทนคำขอบคุณจาก TIC Clinic",
  openGraph: {
    title: "TIC Lucky Spin",
    description: "สิทธิ์พิเศษสำหรับคุณ หมุนรับของขวัญแทนคำขอบคุณจาก TIC Clinic",
    url: "https://tawandaeng007.github.io/TIC-test/roulette/",
    siteName: "TIC Clinic",
    locale: "th_TH",
    type: "website",
    images: [{ url: "https://tawandaeng007.github.io/TIC-test/og.png", width: 1731, height: 909, alt: "TIC Lucky Spin — A little luck, with love." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TIC Lucky Spin",
    description: "สิทธิ์พิเศษสำหรับคุณ หมุนรับของขวัญแทนคำขอบคุณจาก TIC Clinic",
    images: ["https://tawandaeng007.github.io/TIC-test/og.png"],
  },
};

export default function RoulettePage() {
  return <LuckySpin />;
}
