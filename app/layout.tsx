import { Footer, Header } from '@/src/components';
import mermaid from 'mermaid';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../src/styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sai Srikar Dumpeti',
  description: 'personal site of sai srikar dumpeti',
};

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="16x16"></link>
      </head>
      <body className={inter.className}>
        <div className="container px-4">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
