import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import TablePaymentsData from "./tables/TablePaymentsData";

function Payments () {
  return (
    <div className="flex gap-4">
      <Card className="flex-grow flex-col">
        <CardHeader className="px-8 pt-8">
          <CardTitle>Reporte detallado</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <TablePaymentsData />
        </CardContent>
      </Card>
    </div>
  );
}

export default Payments;
