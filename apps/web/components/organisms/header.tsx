"use client";

import { cn } from "@repo/ui/lib/utils";
import { Separator } from "@repo/ui/components/separator";
import { SidebarTrigger } from "@repo/ui/components/sidebar";

type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => {
  return (
    <header
      className={cn(
        "flex items-center gap-3 sm:gap-4 bg-background p-4 w-full h-16 shadow",
      )}
    >
      <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
      <Separator orientation="vertical" className="h-6" />
      {children}
    </header>
  );
};

export default Header;
