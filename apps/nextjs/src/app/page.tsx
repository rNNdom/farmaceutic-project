"use client";

import { lazy, Suspense } from "react";

import Loading from "~/components/Loading";
import withAuth from "~/components/withAuth";
import { Tabs, TabsContent } from "../components/ui/tabs";

const GraphicsDetail = lazy(() => import("~/components/GraphicsDetail"));
const Payments = lazy(() => import("~/components/Payments"));

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
              <Suspense fallback={<Loading />}>
                <GraphicsDetail />
                <Payments />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
export default withAuth(DashboardPage);
