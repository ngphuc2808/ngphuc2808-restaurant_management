import { Metadata } from "next";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

import Oauth from "@/app/[locale]/(public)/(auth)/login/oauth/oauth";

export const metadata: Metadata = {
  title: "Google Login Redirect",
  description: "Google Login Redirect",
  robots: {
    index: false,
  },
};

const OAuthPage = () => {
  return (
    <Suspense
      fallback={<LoaderCircle size={28} className="animate-spin m-auto" />}
    >
      <Oauth />
    </Suspense>
  );
};

export default OAuthPage;
