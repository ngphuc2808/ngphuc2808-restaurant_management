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

const AppSidebar = () => {
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
        <NavUser user={menuItems.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
