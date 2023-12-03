import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { TableDataPagination } from "./TableDataPagination";
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
import { api } from '~/utils/api';
import { Input } from './ui/input';
import Loading from './Loading';
type ProductDetailProps = {
  orderId: number
}
const columns: ColumnDef<any>[] = [
  {
    accessorKey: "select",
    header: () => <></>,
    cell: () => <></>,
  },
  {
    accessorKey: "prod_id",
    header: () => <p className="text-black">ID Producto</p>,
    cell: ({ row }) => <p className="text-black">{row.getValue("prod_id")}</p>,
  },
  {
    accessorKey: "prod_name",
    header: () => {
      <p className="flex w-full items-center justify-center text-black">
        Producto
      </p>
    },
    cell: ({ row }) => {
      <p className="text-black">{row.getValue("prod_name")}</p>
    },
  },

  {
    accessorKey: "prod_price",
    header: () => <p className="text-black">Precio</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {row.getValue("prod_price")}
      </div>
    ),
  },

  {
    accessorKey: "quantity",
    header: () => <p className="text-black">Cantidad</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {row.getValue("quantity")}
      </div>
    ),
  },
  {
    accessorKey: "prod_recipe",
    header: () => <p className="text-black">Con receta</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {row.getValue("prod_recipe") ? "Si" : "No"}
      </div>
    ),
  },

];
function ProductDetails ({ orderId }: ProductDetailProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const orderDetails = api.orders.getOrderDetails.useQuery({ id: orderId });
  const data = orderDetails.data?.orderData ?? [];
  const userProfile = orderDetails.data?.profileUser ?? [];
  const deliveryProfile = orderDetails.data?.profileDelivery ?? [];


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
      {orderDetails.isLoading ? <Loading /> :
        <>
          <section className="flex-grow">
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
            {table.getRowModel().rows.length > 7 && <div className="flex items-center justify-center space-x-2 py-4">
              <TableDataPagination table={table} />
            </div>}
          </section>
          <div className="flex flex-row justify-between gap-10">
            <section className="flex flex-col">
              <div className="flex flex-col space-y-2 py-3 pt-10 ">
                <h2 className="text-xl font-semibold tracking-tight">
                  Datos del cliente
                </h2>
                {
                  userProfile.map((user, index) => (
                    <div key={index} className="flex flex-row gap-5">
                      <span><label>Nombre:</label> <Input disabled className='w-fit' defaultValue={user.prf_name} /></span>
                      <span><label>Apellido:</label> <Input disabled className='w-fit' defaultValue={user.prf_lastname} /></span>
                      <span><label>Telefono:</label> <Input disabled className='w-fit' defaultValue={user.prf_phone} /></span>
                    </div>
                  ))
                }
              </div>
              <div className="flex flex-col space-y-2 py-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Datos del Repartidor
                </h2>
                <div>
                  {deliveryProfile[0]?.profile ?
                    deliveryProfile.map((user, index) => (
                      <div key={index} className="flex flex-row gap-5">
                        <span><label>Nombre:</label> <Input disabled className='w-fit' defaultValue={user?.profile.prf_name} /></span>
                        <span><label>Apellido:</label> <Input disabled className='w-fit' defaultValue={user?.profile.prf_lastname} /></span>
                        <span><label>Telefono:</label> <Input disabled className='w-fit' defaultValue={user?.profile.prf_phone} /></span>
                      </div>
                    )) :
                    <p className="text-black">Sin repartidor asignado</p>
                  }
                </div>
              </div>
            </section>
            <div className="flex flex-col space-y-2 py-3 pt-10 flex-grow">
              <p className="font-semibold text-xl">Recetas:</p>
              <div className="rounded-md border p-20 flex-grow" />
            </div>
          </div>
        </>}

    </div>
  )
}


export default ProductDetails