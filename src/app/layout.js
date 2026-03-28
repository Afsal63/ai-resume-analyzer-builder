import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Resume Analyzer & Builder",
  description: "Build and analyze your resume using advanced AI directly in the browser.",
};

import { Navbar } from "@/components/layout/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="layout-wrapper" style={{ paddingTop: '80px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
