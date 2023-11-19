"use client";

import React from "react";

import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ProfileInfo() {
  const userSession = api.auth.getSession.useQuery();
  const getProfile = api.profile.getProfile.useQuery({
    id: Number(userSession.data?.user.id),
  });
  const formData = [
    { value: getProfile.data?.prf_name, name: "Nombre", type: "text" },
    { value: getProfile.data?.prf_lastname, name: "Apellido", type: "text" },
    {
      value: getProfile.data?.usr_email,
      name: "Correo electrónico",
      type: "email",
    },
    { value: getProfile.data?.usr_pass, name: "Contraseña", type: "password" },
    { value: getProfile.data?.prf_phone, name: "Teléfono", type: "text" },
  ];
  console.log(formData);
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Nombres</Label>
          <Input id="name" placeholder="John Doe..." />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Apellidos</Label>
          <Input id="name" placeholder="Gootren Gooher..." />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Correo electrónico</Label>
          <Input id="name" placeholder="example@example.com" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Contraseña</Label>
          <Input
            id="name"
            placeholder="Escriba su contraseña aquí..."
            type="password"
          />
        </div>

        <div className="flex justify-between pt-10">
          <Button className="bg-sky-400">Editar</Button>
          <Button className="bg-sky-400">Cerrar Sesión</Button>
        </div>
      </div>
    </form>
  );
}
