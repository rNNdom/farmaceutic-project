import { NotionLogoIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { isAdmin, isLogged } from "~/atoms";
import { SidebarOptions } from "./SidebarOptions";
import { useState } from "react";
import { PanelRightClose, PanelRightOpen, SidebarOpen } from "lucide-react";

export type NavItems = {
  key: string;
  label: JSX.Element;
  ref?: string;
}[][number];

export function Sidebar () {
  const [showSidebar, setShowSidebar] = useState(true);
  const [value] = useAtom(isLogged);
  const [admin] = useAtom(isAdmin);
  if (!value || !admin) return null;

  return (
    <>
      {!showSidebar && <div className={`p-2 absolute flex items-center justify-center pt-5 transition-all duration-300 `}>
        <PanelRightClose width={20} height={20} />
      </div>}
      <div
        className={`transition-all duration-300 ${showSidebar ? "w-72" : "w-10 opacity-0 "} overflow-hidden bg-white border-gray-200`}
      >
        <div className={`flex flex-row border-b px-3 py-4 items-center ${!showSidebar && "opacity-0"}`}>
          <NotionLogoIcon width={20} height={20} />
          <h2 className=" px-4 text-lg font-semibold tracking-tight flex-grow whitespace-nowrap">
            Farmaceutic App
          </h2>
          <button className={`duration-300 transition-all ${!showSidebar ? "absolute" : ""}`} onClick={() => setShowSidebar(!showSidebar)}>
            <PanelRightOpen width={20} height={20} />
          </button>
        </div>
        <div className="h-full px-3 pt-10">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight whitespace-nowrap ">
            Panel de trabajo
          </h2>
          <SidebarOptions />
        </div>
      </div>
    </>
  );
}
