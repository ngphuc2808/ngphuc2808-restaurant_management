import React from "react";
import { LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import DishTable from "@/app/manage/dishes/dish-table";

const DishesPage = () => {
  return (
    <div className="space-y-2">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Món ăn</CardTitle>
          <CardDescription>Quản lý món ăn</CardDescription>
        </CardHeader>
        <CardContent>
          <React.Suspense
            fallback={
              <LoaderCircle size={28} className="animate-spin m-auto" />
            }
          >
            <DishTable />
          </React.Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default DishesPage;
