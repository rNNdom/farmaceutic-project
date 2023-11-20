"use client";

import { lazy, Suspense } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { columns, payments } from "~/utils/lists";
import withAuth from "~/components/withAuth";
import { Overview } from "../components/overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Tabs, TabsContent } from "../components/ui/tabs";

const TablePaymentsData = lazy(() => import("../components/TablePaymentsData"));

function DashboardPage() {
  return (
    <>
      <div className=" flex-grow flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 py-3">
            <h2 className="text-3xl font-bold tracking-tight">Vista General</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
                <Card>
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
                    <div className="text-2xl font-bold">$1.304.492</div>
                    <p className="text-muted-foreground text-xs">
                      +20.1% desde el mes anterior
                    </p>
                  </CardContent>
                  <Overview />
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Nuevos clientes
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+150</div>
                    <p className="text-muted-foreground text-xs">
                      +11% desde el mes anterior{" "}
                    </p>
                  </CardContent>
                  <Overview />
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Ventas
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
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-muted-foreground text-xs">
                      +19% from last month
                    </p>
                  </CardContent>
                  <Overview />
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card className="col-span-3">
                  <CardHeader className="px-8 pt-8">
                    <CardTitle>Reporte detallado</CardTitle>
                    <CardDescription>
                      Se vendieron 200 productos este mes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <Suspense fallback={null}>
                      <TablePaymentsData
                        columns={columns as ColumnDef<unknown, unknown>[]}
                        data={payments}
                      />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
export default withAuth(DashboardPage);
