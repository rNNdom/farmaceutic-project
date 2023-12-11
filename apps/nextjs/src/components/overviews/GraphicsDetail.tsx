import React from "react";
import TotalSales from "./TotalSales";
import NewCustomers from "./NewCustomers";

function GraphicsDetail () {
  return (
    <div className="flex-grow flex-col flex gap-10 md:flex-row">
      <div className="w-full"><TotalSales /></div>
      <div className="w-full"><NewCustomers /></div>
    </div>
  );
}

export default GraphicsDetail;
