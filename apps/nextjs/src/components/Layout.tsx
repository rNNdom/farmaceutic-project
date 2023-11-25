"use client";

import React, { useLayoutEffect } from "react";
import { useAtom } from "jotai";

import { api } from "~/utils/api";
import { isLogged } from "~/atoms";
import Loading from "./Loading";
import { Sidebar } from "./Sidebar";

function LayoutComponent ({ children }: { children: React.ReactNode }) {
  const checkSession = api.auth.checkSession.useMutation();
  const [value] = useAtom(isLogged);
  useLayoutEffect(() => {
    if (value) {
      checkSession.mutate();
    }
  }, [value]);

  return (
    <div className="flex min-h-screen w-screen ">
      {
        <>
          <section className="border-r">
            <Sidebar />
          </section>
          {checkSession.isLoading && value ? (
            <main className="flex-grow overflow-auto">
              <Loading />
            </main>
          ) : (
            <main className="flex-grow overflow-auto">{children}</main>
          )}
        </>
      }
    </div>
  );
}

export default LayoutComponent;
