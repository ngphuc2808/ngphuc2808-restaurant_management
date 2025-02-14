"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarRail,
  SidebarFooter,
} from "@repo/ui/components/sidebar";
import { menuItems } from "@/constants";
import NavGroup from "@/components/molecules/nav-group";
import NavUser from "@/components/molecules/nav-user";
import { useAccountMe } from "@/queries/useAccount";

const AppSidebar = () => {
  const accountProfile = useAccountMe();
  const account = accountProfile.data?.payload.data;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row justify-center">
        Logo
      </SidebarHeader>
      <SidebarContent>
        {menuItems.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={account!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
