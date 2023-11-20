"use client";

import React, { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { useAtom } from "jotai";

import { isLogged } from "~/atoms";

function withAuth(Component: React.ComponentType) {
  return function AuthComponent(props: any) {
    const [session] = useAtom(isLogged);
    useLayoutEffect(() => {
      if (!session) {
        redirect("/auth/sign-in");
      }
    }, []);

    if (!session) return null;

    return <Component {...props} />;
  };
}

export default withAuth;
