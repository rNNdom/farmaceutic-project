import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Bell, LayoutPanelLeft, User, Users } from "lucide-react";
import { Button } from "~/components/ui/button";

import { Payment } from "~/components/tables/TablePaymentsData";
import DropdownOrderActions from "~/components/DropdownOrderActions";

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

const setColor = (status: string) => {
  switch (status) {
    case "Pendiente":
      return "bg-amber-200";
    case "En camino":
      return "bg-cyan-300";
    case "Entregado":
      return "bg-green-500";
    case "Cancelado":
      return "bg-red-500";
    default:
      return "bg-yellow-400";
  }
}
const checkIfLate = (status: string) => {
  if (status === "on_time") {
    return null;
  }
  if (status === "not_vip") {
    return null;

  }
  if (status === "late") {
    return <Bell color="red" width={20} />
  }
  return null;
}
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "order_id",
    header: () => <p className="text-black">N° Orden</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("order_id")}</div>
    ),
  },
  {
    accessorKey: "order_time",
    header: ({ column }) => {
      return <Button
        variant="ghost"
        className="text-black -px-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha de orden
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {String(row.getValue("order_time")?.toLocaleString())}
      </div>
    ),
  },

  {
    accessorKey: "order_det_total",
    header: ({ column }) => {
      return (
        <span className="flex w-full items-center justify-center text-black">
          <Button
            variant="ghost"
            className="text-black"
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
    accessorKey: "usr_vip",
    header: () => <p className="text-black">Miembro</p>,
    cell: ({ row }) => (
      <div className="text-muted-foreground capitalize">
        {row.getValue("usr_vip") ? "Si" : "No"}
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
            className="text-black"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Estado
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </span>
      );
    },
    cell: ({ row }) => (
      <div
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        className={`flex items-center justify-center rounded-full p-1 font-medium uppercase text-card-foreground text-white border  ${setColor(row.getValue("order_status"))}`}
      >
        {row.getValue("order_status")}
      </div>
    )

  },

  {
    id: "actions",
    cell: ({ row }) => {

      return (
        <DropdownOrderActions id={row.original.order_id} />
      );
    },
  },
  {
    accessorKey: "order_late",
    header: () => <p className="text-black flex justify-center">Prioridad</p>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        {checkIfLate(row.getValue("order_late"))}
      </div>
    ),
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
    name: "oldpass",
    labelName: "Contraseña Actual",
    type: "password",
  },
  {
    name: "newpass",
    labelName: "Nueva Contraseña",
    type: "password",
  },
  {
    name: "phone",
    labelName: "Teléfono",
    type: "text",
  },
];
