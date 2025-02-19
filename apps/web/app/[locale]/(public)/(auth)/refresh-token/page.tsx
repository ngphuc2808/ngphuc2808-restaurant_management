import { Metadata } from "next";

import RefreshToken from "@/app/[locale]/(public)/(auth)/refresh-token/refresh-token";

export const metadata: Metadata = {
  title: "Refresh token redirect",
  description: "Refresh token redirect",
  robots: {
    index: false,
  },
};

const RefreshTokenPage = () => {
  return <RefreshToken />;
};

export default RefreshTokenPage;
