import { Metadata } from "next";

import Oauth from "@/app/(public)/(auth)/login/oauth/oauth";

export const metadata: Metadata = {
  title: "Google Login Redirect",
  description: "Google Login Redirect",
  robots: {
    index: false,
  },
};

const OAuthPage = () => {
  return <Oauth />;
};

export default OAuthPage;
