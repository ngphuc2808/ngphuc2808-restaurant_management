type Props = {
  children: React.ReactNode;
};

const EmptyLayout = async ({ children }: Props) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      {children}
    </div>
  );
};

export default EmptyLayout;
