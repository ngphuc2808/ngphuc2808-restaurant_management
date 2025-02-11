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

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
    </main>
  );
}
