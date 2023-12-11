import React from 'react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
type ChartProps = {
  data: {
    name: string;
    value: any;
  }[]

  ToolTipContent: (props: any) => JSX.Element | undefined
}
function Chart ({ data, ToolTipContent }: Readonly<ChartProps>
) {
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
  )
}

export default Chart