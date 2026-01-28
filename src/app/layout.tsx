import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Topbar from "@/components/topbar";
import Searchbar from "@/components/searchbar";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
// Step 1: CartProvider ko import karein
import { CartProvider } from "@/context/CartContext";

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
  title: "RD Organic Hair Oil",
  description: "Pure and Natural Hair Care Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Step 2: Poore layout ko CartProvider ke andar wrap karein */}
        <CartProvider>
          <Topbar />
          <Searchbar />
          <Navbar />
          <main className="max-w-7xl mx-auto container">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}