import React from "react";

import { LoaderCircle } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense
      fallback={<LoaderCircle size={28} className="animate-spin m-auto" />}
    >
      {children}
    </React.Suspense>
  );
};

export default Layout;
