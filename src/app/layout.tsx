import type { Metadata, Viewport } from "next";
import "@fontsource-variable/pixelify-sans";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import { profile } from "@/data/profile";
import { siteUrl } from "@/data/site";

const title = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title,
  description: profile.tagline,
  authors: [{ name: profile.name }],
  openGraph: {
    title,
    description: profile.tagline,
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary",
    title,
    description: profile.tagline,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7fd0ff" },
    { media: "(prefers-color-scheme: dark)", color: "#14103a" },
  ],
};

/**
 * Dijalankan sebelum hidrasi supaya tema dan layar pembuka tidak berkedip:
 * tema diambil dari pilihan tersimpan atau pengaturan OS, dan layar pembuka
 * langsung disembunyikan kalau sesi ini sudah pernah menekan "Mulai main".
 */
const initScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('pg:theme');if(t!=='day'&&t!=='night'){t=matchMedia('(prefers-color-scheme: dark)').matches?'night':'day'}d.dataset.theme=t;if(sessionStorage.getItem('pg:booted')==='1'){d.dataset.booted='true'}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-theme="day" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <noscript>
          <style>{`.boot{display:none!important}[data-enter="pre"] [data-hero]{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
