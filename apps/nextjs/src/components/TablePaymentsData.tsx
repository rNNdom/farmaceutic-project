"use client";

import React from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { TableDataPagination } from "./TableDataPagination";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
interface Payment {
  item: string;
  amount: number;
  deliveredTo: string;
  date: string;
  status: "pending" | "processing" | "accepted" | "failed";
}

export const payments: Payment[] = [
  {
    item: "Nougat - Paste / Cream",
    amount: 231,
    deliveredTo: "Massimo",
    date: "4/27/2023",
    status: "pending",
  },
  {
    item: "Pepper - Cayenne",
    amount: 976,
    deliveredTo: "Julissa",
    date: "7/24/2023",
    status: "pending",
  },
  {
    item: "Fond - Neutral",
    amount: 675,
    deliveredTo: "Meridith",
    date: "5/6/2023",
    status: "pending",
  },
  {
    item: "Wine - White, Ej",
    amount: 128,
    deliveredTo: "Consuela",
    date: "3/15/2023",
    status: "pending",
  },
  {
    item: "Star Fruit",
    amount: 624,
    deliveredTo: "Somerset",
    date: "5/11/2023",
    status: "pending",
  },
  {
    item: "Wine - Blue Nun Qualitatswein",
    amount: 149,
    deliveredTo: "Padraic",
    date: "9/10/2023",
    status: "pending",
  },
  {
    item: "Longos - Grilled Veg Sandwiches",
    amount: 751,
    deliveredTo: "Erhard",
    date: "5/16/2023",
    status: "pending",
  },
  {
    item: "Sauce - Soy Low Sodium - 3.87l",
    amount: 109,
    deliveredTo: "Eugenio",
    date: "6/7/2023",
    status: "pending",
  },
  {
    item: "Lamb Leg - Bone - In Nz",
    amount: 199,
    deliveredTo: "Cary",
    date: "4/30/2023",
    status: "pending",
  },
  {
    item: "Seedlings - Mix, Organic",
    amount: 344,
    deliveredTo: "Lea",
    date: "6/26/2023",
    status: "pending",
  },
  {
    item: "Nougat - Paste / Cream",
    amount: 231,
    deliveredTo: "Massimo",
    date: "4/27/2023",
    status: "pending",
  },
  {
    item: "Nougat - Paste / Cream",
    amount: 231,
    deliveredTo: "Massimo",
    date: "4/27/2023",
    status: "pending",
  },
];
export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: () => <></>,
    cell: () => <></>,
  },
  {
    accessorKey: "item",
    header: () => <p className="text-black">Producto</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("item")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <span className="flex w-full items-center justify-center text-black">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Precio
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </span>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CLP",
      }).format(amount);

      return (
        <div className="text-muted-foreground flex items-center justify-center font-medium">
          {formatted}
        </div>
      );
    },
  },

  {
    accessorKey: "deliveredTo",
    header: () => <p className="text-black">Entregado a</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {row.getValue("deliveredTo")}
      </div>
    ),
  },

  {
    accessorKey: "date",
    header: () => <p className="text-black">Fecha</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {row.getValue("date")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <span className="flex w-full items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Estado
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </span>
      );
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return (
        <div
          className="flex items-center justify-center rounded-full
        bg-yellow-100 p-1 font-medium uppercase text-amber-700"
        >
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      //const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <span className="h-4 w-4">···</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalle del pedido</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
function TablePaymentsData<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

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

  return (
    <>
      <div className="rounded-md border">
        <Table>
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
        </Table>
      </div>
      <TableDataPagination table={table} />
    </>
  );
}

export default TablePaymentsData;
