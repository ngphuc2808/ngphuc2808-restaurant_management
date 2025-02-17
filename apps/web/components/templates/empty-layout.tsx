type Props = {
  children: React.ReactNode;
};

const EmptyLayout = ({ children }: Props) => {
  return (
    <html>
      <div className="fixed inset-0 flex justify-center items-center">
        {children}
      </div>
    </html>
  );
};

export default EmptyLayout;
