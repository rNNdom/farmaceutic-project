import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import LayoutComponent from "~/components/Layout";
import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <TRPCReactProvider headers={headers()}>
        <body className={["font-sans", fontSans.variable].join(" ")}>
          <LayoutComponent {...props} />
        </body>
      </TRPCReactProvider>
    </html>
  );
}
