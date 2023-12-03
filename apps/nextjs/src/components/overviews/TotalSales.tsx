"use client"
import React from 'react'
import { TotalSalesChart } from "./TotalSalesChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { api } from '~/utils/api';
import Loading from '../Loading';
function TotalSales () {
  const getTotalPerMonth = api.orders.getTotalAmmountOrders.useQuery();

  const chartData = getTotalPerMonth.data?.map(item => ({
    name: item.month,
    total: item.total,
  }));

  const lastItem = chartData?.[chartData?.length - 1]?.total;
  const previousLastItem = chartData?.[chartData?.length - 2]?.total;
  const percentage = (lastItem - previousLastItem) / previousLastItem * 100;

  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });
  return (
    <Card>
      {getTotalPerMonth.isLoading && <Loading />}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Ingresos totales
        </CardTitle>
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
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatter.format(chartData?.[chartData?.length - 1]?.total)}</div>
        <p className="text-muted-foreground text-xs">
          {percentage > 0 ? `+${percentage.toFixed(2)}%` : `-${percentage.toFixed(2)}%`} desde el mes anterior{" "}
        </p>
      </CardContent>
      <TotalSalesChart />
    </Card>
  )
}

export default TotalSales