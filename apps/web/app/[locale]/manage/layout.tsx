import AdminLayout from "@/components/templates/admin-layout";

const Manage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default Manage;
