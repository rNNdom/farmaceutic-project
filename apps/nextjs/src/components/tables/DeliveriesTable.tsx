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
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { api } from "~/utils/api";
import { $Enums } from "@acme/db";
import Loading from "../Loading";

interface Dealers {
  usr_status: string;
  prf_name: string;
  prf_phone: string;
  totalOrders: number;
}



export const columns: ColumnDef<Dealers>[] = [
  {
    id: "select",
    header: () => <></>,
    cell: () => <></>,
  },
  {
    accessorKey: "prf_name",
    header: () => <p className="text-black">Trabajador</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {row.getValue("prf_name")}
      </div>
    ),
  },
  {
    accessorKey: "totalOrders",
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
        {row.getValue("totalOrders")}
      </div>
    ),
  },
  {
    accessorKey: "usr_status",
    header: () => (
      <div className="flex items-center justify-center font-medium text-black">
        Estado
      </div>
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("usr_status");

      return (
        <div className="flex items-center justify-center rounded-full bg-yellow-100 p-1 font-medium uppercase text-amber-700">
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "prf_phone",
    header: () => (
      <div className="flex items-center justify-center font-medium text-black">
        Contacto
      </div>
    ),
    cell: ({ row }) => {
      const contact: string = row.getValue("prf_phone");

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

export function DeliveriesTable () {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const fetchData = api.user.getDeliversData.useQuery();
  const data = fetchData.data ?? [];

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
          placeholder="Filtrar por nombre..."
          value={(table.getColumn("prf_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("prf_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          {fetchData.isLoading ? <Loading /> :
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
    </div>
  );
}
