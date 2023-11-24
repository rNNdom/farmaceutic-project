import { NotionLogoIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";

import { isAdmin, isLogged } from "~/atoms";
import { SidebarOptions } from "./SidebarOptions";


export type NavItems = {
  key: string;
  label: JSX.Element;
  ref?: string;
}[][number];

export function Sidebar () {
  const [value] = useAtom(isLogged);
  const [admin] = useAtom(isAdmin);
  console.log(value, admin)
  if (!value || !admin) return null;

  return (
    <div className="w-72 space-y-4 border-r py-4">
      <div className="flex flex-row border-b px-3 py-2">
        <NotionLogoIcon width={20} height={20}></NotionLogoIcon>
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Farmaceutic App
        </h2>
      </div>
      <div className="h-full px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Panel de trabajo
        </h2>
        <SidebarOptions />
      </div>
    </div>
  );
}
