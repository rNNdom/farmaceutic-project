import React from "react";


import TotalSales from "./TotalSales";
import NewCustomers from "./NewCustomers";

function GraphicsDetail () {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2 ">
      <TotalSales />
      <NewCustomers />
    </div>
  );
}

export default GraphicsDetail;
