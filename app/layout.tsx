import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

export const metadata: Metadata = {
  metadataBase: new URL(
    isGitHubPages
      ? "https://tawandaeng007.github.io/TIC-test/"
      : "https://tic-clinic.example",
  ),
  title: "TIC Clinic",
  description:
    "TIC Clinic — เข้าใจผิวของคุณ เริ่มต้นด้วยความรู้ที่ถูกต้อง",
  openGraph: {
    title: "TIC | ความรู้สุขภาพผิว",
    description: "การดูแลผิวในชีวิตประจำวันและข้อควรรู้ก่อนทำหัตถการ",
    siteName: "TIC Clinic",
    locale: "th_TH",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "TIC | ความรู้สุขภาพผิว",
    description: "การดูแลผิวในชีวิตประจำวันและข้อควรรู้ก่อนทำหัตถการ",
    images: [],
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        {children}
      </body>
    </html>
  );
}
