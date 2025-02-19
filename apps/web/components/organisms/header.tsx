"use client";

import { Separator } from "@repo/ui/components/separator";
import { SidebarTrigger } from "@repo/ui/components/sidebar";
import SwitchLanguage from "@/components/atoms/switch-language";
import DarkModeToggle from "@/components/atoms/dark-mode-toggle";
import DropdownAvatar from "@/components/atoms/dropdown-avatar";

const Header = () => {
  return (
    <header
      className={
        "flex items-center gap-3 sm:gap-4 bg-background p-4 w-full h-16 shadow"
      }
    >
      <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
      <Separator orientation="vertical" className="h-6" />
      <div className="ml-auto flex items-center space-x-4">
        <SwitchLanguage />
        <DarkModeToggle />
        <DropdownAvatar />
      </div>
    </header>
  );
};

export default Header;
