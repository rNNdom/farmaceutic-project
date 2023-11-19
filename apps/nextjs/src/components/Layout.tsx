"use client";

import React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { LayoutPanelLeft, User, Users } from "lucide-react";

import { api } from "~/utils/api";
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
    label: (
      <>
        <User size={25} strokeWidth={1.5} />
        Perfil
      </>
    ),
    ref: "/account",
  },
];
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const publicRoutes = ["/auth"];

function LayoutComponent({ children }: { children: React.ReactNode }) {
  const checkSession = api.auth.checkSession.useMutation();
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);

  React.useEffect(() => {
    checkSession.mutate();
  }, []);

  if (checkSession.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }
  return (
    <body className={["font-sans", fontSans.variable].join(" ")}>
      {
        <div className="flex h-screen w-screen ">
          {checkSession.isSuccess ? (
            <section className="w-72 border-r">
              <Sidebar navItems={NavItems} />
            </section>
          ) : null}
          <main className="flex-grow overflow-auto">{children}</main>
        </div>
      }
    </body>
  );
}

export default LayoutComponent;
