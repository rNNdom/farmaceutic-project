"use client";

import React, { useLayoutEffect } from "react";
import { useAtom } from "jotai";

import { api } from "~/utils/api";
import { isLogged } from "~/atoms";
import Loading from "./Loading";
import { Sidebar } from "./Sidebar";

function LayoutComponent ({ children }: { children: React.ReactNode }) {
  const checkSession = api.auth.checkSession.useMutation();
  const getSession = api.auth.getSession.useQuery();

  const [value] = useAtom(isLogged);
  useLayoutEffect(() => {
    if (value) {
      checkSession.mutate();
    }
  }, [value]);
  const validateSession = checkSession.isSuccess && getSession.data?.user.role !== "ADMIN";
  if (validateSession) {
    return (
      <div className="flex h-screen w-screen ">
        <main className="flex-grow overflow-auto">
          <div className="flex justify-center items-center h-full">
            <div className="text-3xl font-bold text-gray-500">
              You are not authorized to access this page
            </div>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="flex h-screen w-screen ">
      {
        <>
          {!value || validateSession &&
            <section className="">
              <Sidebar />
            </section>}
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
