import "~/styles/globals.css";

import { headers } from "next/headers";

import LayoutComponent from "~/components/Layout";
import { TRPCReactProvider } from "./providers";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <TRPCReactProvider headers={headers()}>
        <LayoutComponent {...props} />
      </TRPCReactProvider>
    </html>
  );
}
