import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F1" },
    { media: "(prefers-color-scheme: dark)", color: "#191923" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Facility Management & Security Services Hyderabad`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.legalName} - Facility Management & Security Services Provider in Hyderabad with valid PSARA Licence.`,
  keywords: [
    "Facility Management",
    "Security Services",
    "PSARA Licensed",
    "Housekeeping Services",
    "Manpower Management",
    "Hyderabad",
    "STRICON",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} | Facility Management & Security Services Hyderabad`,
    description: `${siteConfig.legalName} - Facility Management & Security Services Provider in Hyderabad with valid PSARA Licence.`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 800,
        height: 600,
        alt: `${siteConfig.name} Shield Emblem`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Facility Management & Security Services Hyderabad`,
    description: `${siteConfig.legalName} - Facility Management & Security Services Provider in Hyderabad with valid PSARA Licence.`,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/images/logo/symbol.jpg",
    apple: "/images/logo/symbol.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-[var(--color-primary-foreground)] focus:rounded-md focus:shadow-md focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
