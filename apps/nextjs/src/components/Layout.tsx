"use client";

import React, { useLayoutEffect } from "react";
import { useAtom } from "jotai";

import { api } from "~/utils/api";
import { isLogged } from "~/atoms";
import { Sidebar } from "./Sidebar";

function LayoutComponent({ children }: { children: React.ReactNode }) {
  const checkSession = api.auth.checkSession.useMutation();
  const [value] = useAtom(isLogged);
  useLayoutEffect(() => {
    const token = sessionStorage.getItem("@token");
    console.log("desde layout", token);
    if (value || token) {
      checkSession.mutate();
    }
  }, [value]);

  return (
    <div className="flex h-screen w-screen ">
      {checkSession.isLoading ? null : (
        <>
          <section className="">
            <Sidebar />
          </section>
          <main className="flex-grow overflow-auto">{children}</main>
        </>
      )}
    </div>
  );
}

export default LayoutComponent;
