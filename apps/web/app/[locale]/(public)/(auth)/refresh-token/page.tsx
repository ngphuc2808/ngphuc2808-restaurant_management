import { Metadata } from "next";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

import RefreshToken from "@/app/[locale]/(public)/(auth)/refresh-token/refresh-token";

export const metadata: Metadata = {
  title: "Refresh token redirect",
  description: "Refresh token redirect",
  robots: {
    index: false,
  },
};

const RefreshTokenPage = () => {
  return (
    <Suspense
      fallback={<LoaderCircle size={28} className="animate-spin m-auto" />}
    >
      <RefreshToken />
    </Suspense>
  );
};

export default RefreshTokenPage;
