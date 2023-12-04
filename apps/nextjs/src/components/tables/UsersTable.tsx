"use client";

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
import * as React from "react";

import { $Enums } from "@acme/db";
import { api } from "~/utils/api";
import ChangeRoleAlert from "../ChangeRoleAlert";
import { TableDataPagination } from "./TableDataPagination";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Loading from "../Loading";


export interface User {
  usr_id: number;
  usr_email: string;
  usr_role: $Enums.Role;
  usr_vip: boolean;
}


export function UsersTable () {
  const roleMutation = api.user.updateRole.useMutation()
  const handleIsSubmit = (userId: number, payload: any) => {
    roleMutation.mutate({ id: userId, role: payload });
  }
  const utils = api.useUtils();

  const fetchData = api.user.all.useQuery();
  const data = fetchData.data ?? [];
  React.useEffect(() => {
    if (roleMutation.isSuccess) {
      utils.user.all.invalidate()
    }
  }
    , [roleMutation.isSuccess])

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: () => null,
      cell: () => null,
    },
    {
      accessorKey: "usr_id",
      header: ({ column }) => {
        return (
          <span className="flex w-full text-black">
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-px-4"
            >
              Id
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </span>
        )
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground capitalize">
          {row.getValue("usr_id")}
        </div>
      ),
    },
    {
      accessorKey: "usr_email",
      header: () => (
        <div className="flex items-center justify-center font-medium text-black">
          Email
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground flex items-center justify-center font-medium">
          {row.getValue("usr_email")}
        </div>
      ),
    },
    {
      accessorKey: "usr_role",
      header: () => (
        <div className="flex items-center justify-center font-medium text-black">
          Rol
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex text-muted-foreground items-center justify-center rounded-full p-1 font-medium uppercase">
            {row.getValue("usr_role")}
          </div>
        );
      },
    },
    {
      accessorKey: "usr_vip",
      header: () => (
        <div className="flex items-center justify-center font-medium text-black">
          Membresía
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-muted-foreground flex items-center justify-center font-medium">
            {row.getValue("usr_vip") ? "Si" : "No"}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <ChangeRoleAlert handleSubmit={handleIsSubmit} userId={row.original.usr_id} />
          </div>
        );
      },
    },
  ];

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
      <div className="flex items-center py-4 gap-10">
        <Input
          placeholder="Filtrar por correo..."
          value={(table.getColumn("usr_email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("usr_email")?.setFilterValue(event.target.value)
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
            </>
          }
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <TableDataPagination table={table} />
      </div>
    </div>
  );
}
