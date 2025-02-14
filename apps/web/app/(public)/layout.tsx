import GlobalLayout from "@/components/templates/global-layout";

const Public = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <GlobalLayout>{children}</GlobalLayout>;
};

export default Public;
