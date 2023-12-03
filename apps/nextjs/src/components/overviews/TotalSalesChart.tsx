// Import necessary libraries and components
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "~/utils/api";
import { groupDatesByMonth, totalSalesChartData } from "~/utils/utils";



// Function to generate data in the required format


const ToolTipContent = (props: any) => {
  if (!props.active || !props.payload) return;
  const { payload } = props;
  const { value } = payload[0];
  return (
    <div className="rounded-md bg-white p-2 shadow-md">
      <div className="text-muted-foreground text-xs">Ingreso Total</div>
      <div className="text-muted-foreground text-sm font-medium">
        CLP ${value}
      </div>
    </div>
  );
};

// Main component
export function TotalSalesChart () {
  const ordersData = api.orders.getAllOrdersDates.useQuery();
  if (!ordersData.data) {
    return null;
  }

  // Parse and group dates by month
  const parsedDates = ordersData.data.map(item => ({
    order_date_of_ord: new Date(item.order_date_of_ord),
    OrderDetail: item.OrderDetail,
  }));
  const groupedDates = groupDatesByMonth(parsedDates, "order_date_of_ord");

  // Generate chart data
  const chartData = totalSalesChartData(groupedDates);

  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={8}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={8}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="value" barSize={27} fill="#7dd3fc" />
        <Tooltip content={ToolTipContent} />
      </BarChart>
    </ResponsiveContainer>
  );
}
