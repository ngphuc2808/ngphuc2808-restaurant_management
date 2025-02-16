import React from "react";
import { LoaderCircle } from "lucide-react";

import Oauth from "@/app/(public)/(auth)/login/oauth/oauth";

const OAuthPage = () => {
  return (
    <React.Suspense
      fallback={<LoaderCircle size={28} className="animate-spin m-auto" />}
    >
      <Oauth />
    </React.Suspense>
  );
};

export default OAuthPage;
