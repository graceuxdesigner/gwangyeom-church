import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "광염교회 - 대한예수교장로회",
  description: "세상의 빛과 소금이 되는 광염교회입니다. 경기도 의왕시 원골로 23",
  openGraph: {
    title: "광염교회 - 대한예수교장로회",
    description: "세상의 빛과 소금이 되는 광염교회입니다. 경기도 의왕시 원골로 23",
    siteName: "광염교회",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
