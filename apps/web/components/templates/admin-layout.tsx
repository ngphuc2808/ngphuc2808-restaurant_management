import { cn } from "@repo/ui/lib/utils";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import AppSidebar from "@/components/organisms/app-sidebar";
import Header from "@/components/organisms/header";
import Main from "@/components/organisms/main";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <SidebarProvider defaultOpen>
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
        <Header />
        <Main className="sm:p-4 p-2">{children}</Main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
