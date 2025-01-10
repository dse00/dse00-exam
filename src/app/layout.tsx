import type { Metadata } from "next";
import "./globals.css";
import RootProvider from "@/providers/root";

export const metadata: Metadata = {
  title: "DSE00 Exam",
  description: "準備 DSE 考試的操卷網站",
  icons: ['/favicon.ico'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

