import React from "react";
import { LoaderCircle } from "lucide-react";

import LoginForm from "@/app/(public)/(auth)/login/login-form";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <React.Suspense
        fallback={<LoaderCircle size={28} className="animate-spin m-auto" />}
      >
        <LoginForm />
      </React.Suspense>
    </div>
  );
};

export default LoginPage;
