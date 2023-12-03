import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { NewCustomersChart } from './NewCustomersChart';
import { api } from '~/utils/api';
import { groupDatesByMonth, totalCustomersChartData } from '~/utils/utils';
function NewCustomers () {
  const users = api.user.all.useQuery();

  if (!users.data) {
    return null;
  }
  const chartData = users.data.map((user) => ({
    createdAt: new Date(user.usr_createdAt),
  }));
  const groupedDates = groupDatesByMonth(chartData, "createdAt");
  const data = totalCustomersChartData(groupedDates);
  const lastItem = data?.[data?.length - 1]?.value;
  const previousLastItem = data?.[data?.length - 2]?.value;
  const percentage = (lastItem - previousLastItem) / previousLastItem * 100;
  console.log(data)

  return (
    <Card>

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Nuevos clientes</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="text-muted-foreground h-4 w-4"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{lastItem}</div>
        <p className="text-muted-foreground text-xs">
          {percentage > 0 ? `+${percentage.toFixed(2)}%` : `-${percentage.toFixed(2)}%`} desde el mes anterior{" "}
        </p>
      </CardContent>
      <NewCustomersChart data={data} />
    </Card>
  )
}

export default NewCustomers