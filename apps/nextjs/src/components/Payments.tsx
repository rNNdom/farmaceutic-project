import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import TablePaymentsData from "./TablePaymentsData";

function Payments () {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card className="col-span-3">
        <CardHeader className="px-8 pt-8">
          <CardTitle>Reporte detallado</CardTitle>
          <CardDescription>Se vendieron 200 productos este mes</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <TablePaymentsData />
        </CardContent>
      </Card>
    </div>
  );
}

export default Payments;
