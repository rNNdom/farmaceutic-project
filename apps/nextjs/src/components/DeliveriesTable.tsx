"use client";

import * as React from "react";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const data: Payment[] = [
  {
    name: "Luis",
    sales: 316,
    status: "Reparto",
    number: "+56964897165",
  },
  {
    name: "Esteban",
    sales: 242,
    status: "Reparto",
    number: "+56964897165",
  },
  {
    name: "Vicente",
    sales: 837,
    status: "Reparto",
    number: "+56964897165",
  },
  {
    name: "Diego",
    sales: 874,
    status: "Reparto",
    number: "+56964897165",
  },
  {
    name: "Juan",
    sales: 721,
    status: "Reparto",
    number: "+56964897165",
  },
];

export interface Payment {
  name: string;
  sales: number;
  status: "Reparto" | "Descanso" | "Disponible";
  number: string;
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: () => <></>,
    cell: () => <></>,
  },
  {
    accessorKey: "name",
    header: () => <p className="text-black">Trabajador</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "sales",
    header: ({ column }) => {
      return (
        <span className="flex w-full items-center justify-center text-black">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ventas (N°)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </span>
      );
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground flex items-center justify-center font-medium">
        {row.getValue("sales")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center justify-center font-medium text-black">
        Estado
      </div>
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return (
        <div className="flex items-center justify-center rounded-full bg-yellow-100 p-1 font-medium uppercase text-amber-700">
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "number",
    header: () => (
      <div className="flex items-center justify-center font-medium text-black">
        Contacto
      </div>
    ),
    cell: ({ row }) => {
      const contact: string = row.getValue("number");

      return (
        <div className="text-muted-foreground flex items-center justify-center font-medium">
          {contact}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex items-center justify-center">
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
              <DropdownMenuItem>Ver detalles del repartidor</DropdownMenuItem>
              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function DeliveriesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="rounded-md">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter por nombre..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
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
      <div className="flex items-center justify-center space-x-2 py-4">
        <TableDataPagination table={table} />
      </div>
    </div>
  );
}
