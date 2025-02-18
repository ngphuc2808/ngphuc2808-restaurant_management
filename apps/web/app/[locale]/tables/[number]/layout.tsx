import EmptyLayout from "@/components/templates/empty-layout";

const Tables = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <EmptyLayout>{children}</EmptyLayout>;
};

export default Tables;
