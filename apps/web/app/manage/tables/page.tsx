import React from "react";
import { LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import TableTable from "@/app/manage/tables/table-table";

const TablesPage = () => {
  return (
    <div className="space-y-2">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Bàn ăn</CardTitle>
          <CardDescription>Quản lý bàn ăn</CardDescription>
        </CardHeader>
        <CardContent>
          <React.Suspense
            fallback={
              <LoaderCircle size={28} className="animate-spin m-auto" />
            }
          >
            <TableTable />
          </React.Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default TablesPage;
