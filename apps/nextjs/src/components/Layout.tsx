"use client";

import React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { LayoutPanelLeft, Users } from "lucide-react";

import { api } from "~/utils/api";
import LogIn from "./LogIn";
import { Sidebar } from "./Sidebar";

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
    label: <>User</>,
  },
];
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const publicRoutes = ["/auth"];

function LayoutComponent({ children }: { children: React.ReactNode }) {
  const checkSession = api.auth.checkSession.useMutation();
  const [setState, useSetState] = React.useState(false);
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);

  React.useEffect(() => {
    if (setState) {
      checkSession.mutate();
      useSetState((setState) => !setState);
    }
  }, [setState]);

  return (
    <body className={["font-sans", fontSans.variable].join(" ")}>
      {checkSession.isSuccess || isPublicRoute ? (
        <div className="flex h-screen w-screen ">
          {checkSession.isSuccess ? (
            <section className="w-72 border-r">
              <Sidebar navItems={NavItems} />
            </section>
          ) : null}
          <main className="flex-grow overflow-auto">{children}</main>
        </div>
      ) : (
        <div className="flex h-screen w-screen ">
          <main className="flex flex-grow items-center justify-center overflow-auto ">
            <LogIn setUseState={useSetState} />
          </main>
        </div>
      )}
    </body>
  );
}

export default LayoutComponent;
