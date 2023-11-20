"use client";

import React, { useLayoutEffect } from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { LayoutPanelLeft, User, Users } from "lucide-react";

import { api } from "~/utils/api";
import { token } from "~/app/providers";
import { isLogged } from "~/atoms";
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
    label: (
      <>
        <User size={20} /> Perfil
      </>
    ),
    ref: "/account",
  },
];

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

function LayoutComponent({ children }: { children: React.ReactNode }) {
  //TODO: IMPLEMENTAR UNA FORMA DE QUE EL USUARIO NO PUEDA ACCEDER A LAS RUTAS PRIVADAS SIN INICIAR SESIÓN PARA MEJORAR OPTIMIZACIÓN --- yo creo que es mejor hacer todos los componentes privados menos el create account
  const checkSession = api.auth.checkSession.useMutation();
  const [value] = useAtom(isLogged);
  useLayoutEffect(() => {
    if (value) {
      checkSession.mutate();
    }
  }, [value]);
  if (!checkSession.isSuccess) {
    return (
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <div className="flex h-screen w-screen ">
          <main className="flex-grow overflow-auto">{children}</main>
        </div>
      </body>
    );
  }
  return (
    <body className={["font-sans", fontSans.variable].join(" ")}>
      <div className="flex h-screen w-screen ">
        <section className="w-72 border-r">
          <Sidebar navItems={NavItems} />
        </section>
        <main className="flex-grow overflow-auto">{children}</main>
      </div>
    </body>
  );
}

export default LayoutComponent;
