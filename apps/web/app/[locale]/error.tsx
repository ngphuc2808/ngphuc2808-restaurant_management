"use client";

import { RefreshCcw } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Card className="p-8 text-center shadow-md">
        <h1 className="text-3xl font-bold mb-4">500</h1>
        <h3 className="text-xl font-semibold mb-2">Lỗi</h3>
        <p className="text-gray-500 mb-6">Hệ thống có vấn đề</p>
        <Button
          onClick={reset}
          className="flex items-center justify-center gap-2 m-auto"
        >
          <RefreshCcw className="w-5 h-5" />
          Tải lại
        </Button>
      </Card>
    </div>
  );
};

export default Error;
