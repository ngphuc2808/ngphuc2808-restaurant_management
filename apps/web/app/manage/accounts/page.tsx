import React from "react";
import { LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import AccountTable from "@/app/manage/accounts/account-table";

const AccountPage = () => {
  return (
    <div className="space-y-2">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Tài khoản</CardTitle>
          <CardDescription>Quản lý tài khoản nhân viên</CardDescription>
        </CardHeader>
        <CardContent>
          <React.Suspense
            fallback={
              <LoaderCircle size={28} className="animate-spin m-auto" />
            }
          >
            <AccountTable />
          </React.Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage;
