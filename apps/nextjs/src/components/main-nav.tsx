"use client";
import Link from "next/link";

import { cn } from "../utils/utils";

const NavItems = [
  {
    key: "dashboard",
    label: "Panel General",
    ref: "/",
  },
  {
    key: "delivers",
    label: "Repartidores",
    ref: "/delivery",
  },
];
export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "flex flex-col items-start space-y-4 pt-10 text-slate-600",
        className,
      )}
      {...props}
    >
      {NavItems.map((item) => (
        <>
          <Link
            href={item.ref}
            key={item.key}
            className="block px-2 py-1 text-lg "
          >
            {item.label}
          </Link>
        </>
      ))}
    </nav>
  );
}
