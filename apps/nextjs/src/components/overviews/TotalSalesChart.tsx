// Import necessary libraries and components
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


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
export function TotalSalesChart ({ data }: Readonly<{
  data: {
    name: string;
    value: any;
  }[]
}>) {


  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data}>
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
        <Bar dataKey="value" barSize={35} fill="#7dd3fc" />
        <Tooltip content={ToolTipContent} />
      </BarChart>
    </ResponsiveContainer>
  );
}
