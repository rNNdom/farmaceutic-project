"use client";
import Link from "next/link";
import React from "react";
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
      <div className="flex h-full flex-col space-y-6 pt-6 pr-10 pl-2">
        {navItems.map((item) => (
          <div key={item.key} className={item.key === "account" ? "pt-20" : ""}>
            {item.key === "account" ? (
              <span className="pl-3 ">{item.label} </span>
            ) : (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
