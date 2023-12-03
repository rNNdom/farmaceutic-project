"use client";

import type { SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import { TableDataPagination } from "./TableDataPagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { api } from "~/utils/api";
import { columns } from "~/utils/lists";
import Loading from "../Loading";


export interface Payment {
  order_id: number;
  order_det_total: number;
  user_name: string;
  delivery_user_name: string;
  order_status: string;
  order_late: string;
  order_time: Date;
}

function TablePaymentsData () {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const orders = api.orders.getOrdersForTable.useQuery(undefined, {
    refetchInterval () {
      return 30000;
    },
  });
  const data = orders.data ?? [];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  if (orders.isLoading) return <Loading />

  return (
    <>
      <div className="rounded-md border">
        <Table>
          {orders.isLoading ? <Loading /> :
            <>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </>}

        </Table>
      </div>
      <TableDataPagination table={table} />
    </>
  );
}

export default TablePaymentsData;
