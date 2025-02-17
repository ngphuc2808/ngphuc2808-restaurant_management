import { Metadata } from "next";
import React from "react";

import Oauth from "@/app/[locale]/(public)/(auth)/login/oauth/oauth";

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
