import { Inter } from "next/font/google";

import "~/styles/globals.css";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/nextjs";
import { LayoutPanelLeft, Users } from "lucide-react";

import { Sidebar } from "~/components/Sidebar";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const NavItems = [
  {
    key: "dashboard",
    label: (
      <>
        <LayoutPanelLeft size={20} strokeWidth={1.75} />
        Panel General
      </>
    ),
    ref: "/",
  },
  {
    key: "delivers",
    label: (
      <>
        <Users size={20} strokeWidth={1.75} />
        Trabajadores
      </>
    ),
    ref: "/delivery",
  },
  {
    key: "account",
    label: (
      <>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-9 w-9 ",
              userButtonBox: "pl-2 pr-2 pt-2 pb-2",
            },
          }}
        />
      </>
    ),
  },
];

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={["font-sans", fontSans.variable].join(" ")}>
          <SignedIn>
            <div className="flex h-screen w-screen ">
              <section className="w-72 border-r">
                <Sidebar navItems={NavItems} />
              </section>
              <main className="flex-grow overflow-auto ">{props.children}</main>
            </div>
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
