import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, LayoutPanelLeft, User, Users } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Payment } from "~/components/TablePaymentsData";

export const NavItems = [
  {
    key: "dashboard",
    label: (
      <>
        <LayoutPanelLeft size={20} strokeWidth={1.75} />
        Panel General
      </>
    ),
    ref: "/",
  },
  {
    key: "delivers",
    label: (
      <>
        <Users size={20} strokeWidth={1.75} />
        Trabajadores
      </>
    ),
    ref: "/delivery",
  },
  {
    key: "user-management",
    label: (
      <>
        <Users size={20} /> Administración de roles
      </>
    ),
    ref: "/user-management",
  },
  {
    key: "account",
    label: (
      <>
        <User size={20} /> Perfil
      </>
    ),
    ref: "/account",
  },

];


export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: () => <></>,
    cell: () => <></>,
  },
  {
    accessorKey: "order_id",
    header: () => <p className="text-black">N° Orden</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("order_id")}</div>
    ),
  },
  {
    accessorKey: "order_det_total",
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
      const amount = parseFloat(row.getValue("order_det_total"));
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
    accessorKey: "user_name",
    header: () => <p className="text-black">Entregado a</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {row.getValue("user_name")}
      </div>
    ),
  },

  {
    accessorKey: "delivery_user_name",
    header: () => <p className="text-black">Entregado por</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {row.getValue("delivery_user_name")}
      </div>
    ),
  },
  {
    accessorKey: "order_status",
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
      const status: string = row.getValue("order_status");

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

export const profileFormData = [
  {
    name: "name",
    labelName: "Nombre",
    type: "text",
  },
  {
    name: "lastname",
    labelName: "Apellido",
    type: "text",
  },
  {
    name: "email",
    labelName: "Correo electrónico",
    type: "email",
  },
  {
    name: "pass",
    labelName: "Contraseña",
    type: "password",
  },
  {
    name: "phone",
    labelName: "Teléfono",
    type: "text",
  },
];
