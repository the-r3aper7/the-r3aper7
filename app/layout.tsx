import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { cookies } from "next/headers";
import { incrementWebsiteViews } from "@/lib/actions/websiteViews";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sai Srikar Dumpeti",
  description: "Hi There!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesList = await cookies();

  if (cookiesList.get("visited")?.value !== "true") {
    await incrementWebsiteViews();
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="16x16" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
