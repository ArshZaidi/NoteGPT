import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AppStoreProvider } from "@/lib/store/AppStore";
import { ModalsProvider } from "@/components/layout/ModalsProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0c" },
  ],
};

/**
 * Runs before React hydrates so the correct theme is applied instantly.
 * Prevents flash-of-wrong-theme.
 */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('notegpt.theme') || 'system';
    var d = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (d) document.documentElement.classList.add('dark');
  } catch(e){}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${displaySerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AppStoreProvider>
            <AuthProvider>
              <ModalsProvider>
                <SmoothScroll>
                  <ToastProvider>{children}</ToastProvider>
                </SmoothScroll>
              </ModalsProvider>
            </AuthProvider>
          </AppStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}