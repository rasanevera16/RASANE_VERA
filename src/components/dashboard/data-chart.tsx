"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { GraphData } from "@/server/data/summary";
import { CustomTooltip } from "./custom-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrencyWithFormatterNumber } from "@/lib/utils";

interface DataChartProps {
  data: GraphData[];
}

export const DataChart = ({ data }: DataChartProps) => {
  return (
    <Card className="rounded-xl border-2 border-gray-100 px-3 py-2 shadow-sm">
      <div className="flex flex-col">
        <CardHeader className="space-y-0 p-0">
          <CardTitle className="line-clamp-1 text-base font-semibold text-primary">
            Ringkasan Pendapatan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-3">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={data}
              margin={{
                right: 15,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                axisLine={false}
                tickLine={false}
                dataKey="name"
                fontSize={10}
                tickMargin={10}
              />

              <YAxis
                stroke="#888888"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  formatCurrencyWithFormatterNumber(value)
                }
                tickMargin={10}
              />

              <Tooltip
                content={({ active, payload }) => (
                  <CustomTooltip active={active} payload={payload} />
                )}
              />

              <Bar
                dataKey="total"
                fill="#3d82f6"
                className="drop-shadow-sm"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </div>
    </Card>
  );
};
