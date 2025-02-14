import TablesLayout from "@/components/templates/tables-layout";

const Tables = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <TablesLayout>{children}</TablesLayout>;
};

export default Tables;
