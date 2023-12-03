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
import { groupDatesByMonth, totalSalesChartData } from '~/utils/utils';
function TotalSales () {

  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });
  const fetchedData = api.orders.getAllOrdersDates.useQuery();
  const ordersData = fetchedData.data ?? []

  const parsedDates = ordersData.map(item => ({
    order_date_of_ord: new Date(item.order_date_of_ord),
    OrderDetail: item.OrderDetail,
  }));
  const groupedDates = groupDatesByMonth(parsedDates, "order_date_of_ord");

  const chartData = totalSalesChartData(groupedDates);
  const lastItem = chartData?.[chartData?.length - 1]?.value;
  const previousLastItem = chartData?.[chartData?.length - 2]?.value;
  const percentage = (lastItem - previousLastItem) / previousLastItem * 100;



  return (
    <Card>
      {fetchedData.isLoading ? <Loading /> :
        <>
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
            <div className="text-2xl font-bold">{formatter.format(lastItem)}</div>
            <p className="text-muted-foreground text-xs">
              {percentage > 0 ? `+${percentage.toFixed(2)}%` : `-${percentage.toFixed(2)}%`} desde el mes anterior{" "}
            </p>
          </CardContent>
          <TotalSalesChart data={chartData} />
        </>
      }
    </Card>
  )
}

export default TotalSales