import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AppStoreProvider } from "@/lib/store/AppStore";
import { ModalsProvider } from "@/components/layout/ModalsProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteGPT — Personal Academic OS",
  description:
    "An AI-powered academic operating system for notes, assignments, deadlines, and study.",
  applicationName: "NoteGPT",
  appleWebApp: {
    capable: true,
    title: "NoteGPT",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf9f5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${displaySerif.variable}`}>
      <body className="antialiased">
        <AppStoreProvider>
          <ModalsProvider>
            <SmoothScroll>
              <ToastProvider>{children}</ToastProvider>
            </SmoothScroll>
          </ModalsProvider>
        </AppStoreProvider>
      </body>
    </html>
  );
}