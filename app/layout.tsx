import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://callink.dev"),
  title: "Callink — Turn Your Phone Number into an AI Voice Agent",
  description:
    "Callink bridges real cellular calls to Gemini Live over Bluetooth HFP, with ~800 ms response time and $0 telephony fees. No SIP trunk. No virtual number. Runs on Windows with your Android phone.",
  keywords: [
    "AI voice agent",
    "Gemini Live",
    "GSM to AI",
    "Bluetooth HFP",
    "voice gateway",
    "Windows voice AI",
    "zero cost telephony",
    "Callink",
  ],
  authors: [{ name: "Anup Thakur" }],
  creator: "Anup Thakur",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://callink.dev",
    siteName: "Callink",
    title: "Callink — Turn Your Phone Number into an AI Voice Agent",
    description:
      "Your phone number. Your AI agent. $0 telephony. Callink bridges cellular calls to Gemini Live over Bluetooth in ~800 ms.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Callink – AI Voice Gateway",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Callink — Turn Your Phone Number into an AI Voice Agent",
    description:
      "Bridge real cellular calls to Gemini Live via Bluetooth HFP. ~800 ms latency. $0 telephony fees.",
    images: ["/og-image.png"],
    creator: "@anupthakurr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Callink",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Windows 10 (19041+), Windows 11",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description:
                  "Free for personal, educational, and research use. Commercial license available.",
              },
              author: {
                "@type": "Person",
                name: "Anup Thakur",
              },
              url: "https://github.com/Anupthakurr/callink",
              description:
                "Open-source GSM-to-Gemini Live AI voice gateway. Turns your Android phone and SIM into an AI voice agent via Bluetooth HFP on Windows.",
              featureList: [
                "Bluetooth HFP/SCO bridge",
                "Gemini Live WebSocket integration",
                "Inbound auto-answer",
                "Outbound AI dialer",
                "Multilingual support",
                "Natural barge-in",
                "Dual-track stereo recording",
                "Knowledge base grounding",
                "Web dashboard",
              ],
              license: "https://mariadb.com/bsl11/",
              softwareVersion: "1.0",
              releaseNotes:
                "Business Source License 1.1 — converts to MIT on 2029-01-01",
            }),
          }}
        />
        {/* Analytics placeholder — add your Plausible/GA snippet here */}
        {/* <script defer data-domain="callink.dev" src="https://plausible.io/js/script.js"></script> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
