import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import DashboardMain from "@/app/manage/dashboard/dashboard-main";

const Dashboard = () => {
  return (
    <div className="space-y-2">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Phân tích các chỉ số</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardMain />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
