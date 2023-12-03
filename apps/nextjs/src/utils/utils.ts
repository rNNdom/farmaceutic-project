import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupDatesByMonth = (data: any, key: string) => {
  const groupedDates = {};

  data.forEach((item: any) => {
    const date = new Date(item[key]);
    const monthYear = `${date.getUTCMonth() + 1}-${date.getUTCFullYear()}`;

    if (!groupedDates[monthYear]) {
      groupedDates[monthYear] = [];
    }

    groupedDates[monthYear].push(item);
  });

  return groupedDates;
};
const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
export const totalCustomersChartData = (data: any) => {
  
  const chartData = months.map((month, index) => {
    const monthYear = `${index + 1}-${new Date().getUTCFullYear()}`;
    const monthDates = data[monthYear] || [];
    const value = monthDates.length;
    return {
      name: month,
      value: value,
    };
  });
  return chartData;
};

export const totalSalesChartData = (groupedDates: any) => {
 
  const data = months.map((month, index) => {
    const monthYear = `${index + 1}-${new Date().getUTCFullYear()}`;
    const monthDates = groupedDates[monthYear] || [];
    const value = monthDates.reduce(
      (total, order) => total + order.OrderDetail[0].order_det_total,
      0,
    );

    return {
      name: month,
      value: value,
    };
  });

  return data;
};
