"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Ene",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Abr",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Ago",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dic",
    value: Math.floor(Math.random() * 5000) + 1000,
  },
];

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

export function Overview() {
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
        <Bar dataKey="value" barSize={27} fill="#7dd3fc" />
        <Tooltip content={ToolTipContent} />
      </BarChart>
    </ResponsiveContainer>
  );
}
