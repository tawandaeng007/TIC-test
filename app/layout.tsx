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
  title: "TIC Clinic | ดูแลความงามอย่างมั่นใจ",
  description:
    "คลินิกความงามระดับพรีเมียม ดูแลโดยแพทย์ผู้เชี่ยวชาญ ด้วยเทคโนโลยีที่ทันสมัยและผลลัพธ์ที่เป็นธรรมชาติ",
  openGraph: {
    title: "TIC Clinic | ดูแลความงามอย่างมั่นใจ",
    description: "ดูแลความงามและรับของขวัญพิเศษจาก TIC Clinic",
    siteName: "TIC Clinic",
    locale: "th_TH",
    type: "website",
    images: [{ url: "https://tawandaeng007.github.io/TIC-test/og.png", width: 1731, height: 909, alt: "TIC Clinic — TIC Lucky Spin" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TIC Clinic | ดูแลความงามอย่างมั่นใจ",
    description: "ดูแลความงามและรับของขวัญพิเศษจาก TIC Clinic",
    images: ["https://tawandaeng007.github.io/TIC-test/og.png"],
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
      <body>{children}</body>
    </html>
  );
}
