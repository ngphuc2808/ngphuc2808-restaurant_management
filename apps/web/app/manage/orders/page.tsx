import React from "react";
import { LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import OrderTable from "@/app/manage/orders/order-table";

const AccountsPage = () => {
  return (
    <div className="space-y-2">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Đơn hàng</CardTitle>
          <CardDescription>Quản lý đơn hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <React.Suspense
            fallback={
              <LoaderCircle size={28} className="animate-spin m-auto" />
            }
          >
            <OrderTable />
          </React.Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
