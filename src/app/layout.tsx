import './globals.css';

import type { Metadata } from 'next';
import Script from 'next/script';

import RootProvider from '@/providers/root';

export const metadata: Metadata = {
  title: 'DSE00 Exam - 一站式操卷工具',
  description: '準備 DSE 考試的操卷網站',
  icons: ['/favicon.ico'],
};

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* Google Analytics Script */}
        <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
      </head>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
