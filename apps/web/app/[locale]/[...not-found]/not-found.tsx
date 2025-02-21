"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

import { useRouter } from "@/i18n/routing";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";

const Notfound = () => {
  const router = useRouter();

  const t = useTranslations("NotFound");
  const tAll = useTranslations("All");

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Card className="p-8 text-center shadow-md">
        <h1 className="text-3xl font-bold mb-4">404</h1>
        <h3 className="text-xl font-semibold mb-2">{t("title")}</h3>
        <p className="text-gray-500 mb-6">{t("description")}</p>
        <Button
          onClick={() => router.push("/")}
          className="flex items-center justify-center gap-2 m-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          {tAll("back")}
        </Button>
      </Card>
    </div>
  );
};

export default Notfound;
