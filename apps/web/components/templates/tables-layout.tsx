type Props = {
  children: React.ReactNode;
};

const TablesLayout = ({ children }: Props) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      {children}
    </div>
  );
};

export default TablesLayout;
