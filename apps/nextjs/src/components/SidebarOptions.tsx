"use client";

import React from "react";
import Link from "next/link";

import { Button } from "./ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  navItems: NavItems[];
}
export type NavItems = {
  key: string;
  label: JSX.Element;
  ref?: string;
}[][number];

export const SidebarOptions = (
  { navItems }: SidebarProps = { className: "", navItems: [] },
) => {
  const [activeButton, setActiveButton] = React.useState("");

  const handleActive = (key: string) => {
    setActiveButton(key);
  };

  return (
    <div className={"h-full"}>
      <div className="flex h-full flex-col space-y-6 pl-2 pr-10 pt-6">
        {navItems.map((item) => (
          <div key={item.key}>
            <Link href={item.ref as string}>
              <Button
                variant="ghost"
                onClick={() => handleActive(item.key)}
                className={`w-full justify-start gap-2 ${
                  activeButton === item.key ? "bg-sky-300 text-white" : ""
                }`}
              >
                {item.label}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
