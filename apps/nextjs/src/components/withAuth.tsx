"use client";

import React, { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";

import { isAdmin, isLogged } from "~/atoms";
import { api } from "~/utils/api";

function withAuth (Component: React.ComponentType) {
  return function AuthComponent (props: any) {
    const getSession = api.auth.getSession.useQuery();

    const [session] = useAtom(isLogged);
    const isRoleAdmin = getSession.data?.user.role === "ADMIN";
    const setState = useSetAtom(isAdmin);



    useLayoutEffect(() => {
      if (getSession.isSuccess) {
        setState(isRoleAdmin);
      }
      if (!session) {
        redirect("/auth/sign-in");
      }
    }, [getSession.isSuccess]);

    if (!session) return null;
    if (getSession.isSuccess && !isRoleAdmin) {
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
    return <Component {...props} />;
  };
}

export default withAuth;
