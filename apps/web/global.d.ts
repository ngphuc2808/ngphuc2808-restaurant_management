type QueryResponseType<T> = {
  status: number;
  payload: T;
};

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

type NavLink = BaseNavItem & {
  url: string;
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroupType {
  title: string;
  items: NavItem[];
}

interface SidebarData {
  user: User;
  navGroups: NavGroupType[];
}
