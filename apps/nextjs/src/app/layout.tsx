import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={["font-sans", fontSans.variable].join(" ")}>
          <SignedIn>
            <TRPCReactProvider headers={headers()}>
              {props.children}
            </TRPCReactProvider>
          </SignedIn>
          <SignedOut>
            <div className="flex h-screen w-screen ">
              <main className="flex flex-grow items-center justify-center overflow-auto ">
                <SignIn
                  appearance={{
                    elements: {
                      headerTitle: "text-xl font-bold ",
                    },
                  }}
                />
              </main>
            </div>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
