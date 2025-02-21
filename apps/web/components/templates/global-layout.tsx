import Main from "@/components/organisms/main";
import Footer from "@/components/organisms/footer";
import GlobalHeader from "@/components/organisms/global-header";

type Props = {
  children: React.ReactNode;
};

const GlobalLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen w-full flex-col relative">
      <GlobalHeader />
      <Main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </Main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
