import { cookies } from "next/headers";

import { cn } from "@repo/ui/lib/utils";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import AppSidebar from "@/components/organisms/app-sidebar";
import Header from "@/components/organisms/header";
import Main from "@/components/organisms/main";
import DarkModeToggle from "@/components/atoms/dark-mode-toggle";
import DropdownAvatar from "@/components/atoms/dropdown-avatar";
import SwitchLanguage from "@/components/atoms/switch-language";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div
        id="content"
        className={cn(
          "max-w-full w-full ml-auto",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "transition-[width] ease-linear duration-200",
          "h-svh flex flex-col",
        )}
      >
        <Header>
          <div className="ml-auto flex items-center space-x-4">
            <SwitchLanguage />
            <DarkModeToggle />
            <DropdownAvatar />
          </div>
        </Header>
        <Main className="sm:p-4 p-2">{children}</Main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
