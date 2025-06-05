import { EcommerceLayout } from "@/components/common/ecommerce-layout";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "David's Sports Store | Premium Sports Apparel",
    template: "%s | Premium Sports Apparel",
  },
  description: "Find the best sports apparel and gear at David's Sports Store. Shop now for quality products and unbeatable prices.",
  keywords: [
    "sports apparel",
    "sports gear",
    "athletic wear",
    "premium sports clothing",
    "sports accessories",
    "fitness apparel",
    "running gear",
    "team uniforms",
    "sports shoes",
    "sports equipment",
    "sportswear",
    "activewear",
    "sports fashion",
    "sports merchandise",
    "sports store",
    "David's Sports Store",
    "sports clothing",
    "sports accessories",
    "sports apparel online",
    "buy sports apparel",
    "sports apparel shop",
    "sports apparel sale",
    "sports apparel deals",
    "sports apparel discounts",
    "sports apparel collection",
    "nike apparel",
    "adidas apparel",
    "puma apparel",
    "under armour apparel",
    "reebok apparel",
    "nike",
    "adidas",
    "puma",
    "under armour",
    "reebok",
    "on cloud",
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-lt-installed="true">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EcommerceLayout>
          {children}
        </EcommerceLayout>
        <Toaster/>
      </body>
    </html>
  );
}
