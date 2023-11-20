"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  lastname: z.string().min(3, "El apellido debe tener al menos 3 caracteres."),
  email: z.string().email("El correo electrónico no es válido."),
  pass: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 caracteres."),
});

export default function ProfileInfo() {
  const userSession = api.auth.getSession.useQuery();
  const getProfile = api.profile.getProfile.useQuery({
    id: Number(userSession.data?.user.id),
  });
  const [disabled, setDisabled] = React.useState(true);
  const formData = [
    {
      value: getProfile.data?.prf_name,
      name: "prf_name",
      labelName: "Nombre",
      type: "text",
    },
    {
      value: getProfile.data?.prf_lastname,
      name: "prf_lastname",
      labelName: "Apellido",
      type: "text",
    },
    {
      value: getProfile.data?.usr_email,
      name: "usr_email",
      labelName: "Correo electrónico",
      type: "email",
    },
    {
      value: getProfile.data?.usr_pass,
      name: "usr_pass",
      labelName: "Contraseña",
      type: "password",
    },
    {
      value: getProfile.data?.prf_phone,
      name: "prf_phone",
      labelName: "Teléfono",
      type: "text",
    },
  ];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      pass: "",
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <div className="grid w-full items-center gap-4">
        <h1 className="flex justify-center text-xl font-semibold">
          Información de perfil
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
          {formData.map((data) => {
            return (
              <FormField
                key={data.name}
                control={form.control}
                name={data.name as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{data.labelName}</FormLabel>
                    <FormControl>
                      <Input type={data.type} {...field} disabled={disabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <div className="flex justify-between pt-10">
            {disabled ? (
              <Button
                type="button"
                className="bg-sky-400"
                onClick={() => setDisabled(!disabled)}
              >
                Editar
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-sky-400"
                onClick={() => setDisabled(!disabled)}
              >
                Guardar
              </Button>
            )}
            <Button className="bg-sky-400">Cerrar Sesión</Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
