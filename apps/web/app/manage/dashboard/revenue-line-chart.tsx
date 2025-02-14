"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { format, parse } from "date-fns";

import { DashboardIndicatorResType } from "@/schemaValidations/indicator.schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const RevenueLineChart = ({
  chartData,
}: {
  chartData: DashboardIndicatorResType["data"]["revenueByDate"];
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Doanh thu</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                if (chartData.length < 8) {
                  return value;
                }
                if (chartData.length < 33) {
                  const date = parse(value, "dd/MM/yyyy", new Date());
                  return format(date, "dd");
                }
                return "";
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Line
              dataKey="revenue"
              name="Doanh thu"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueLineChart;
