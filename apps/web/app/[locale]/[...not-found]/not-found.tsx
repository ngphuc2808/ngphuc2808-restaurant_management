"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";

const Notfound = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Card className="p-8 text-center shadow-md">
        <h1 className="text-3xl font-bold mb-4">404</h1>
        <h3 className="text-xl font-semibold mb-2">Không tìm thấy trang</h3>
        <p className="text-gray-500 mb-6">Không tìm thấy</p>
        <Button
          onClick={() => router.push("/")}
          className="flex items-center justify-center gap-2 m-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay về
        </Button>
      </Card>
    </div>
  );
};

export default Notfound;
