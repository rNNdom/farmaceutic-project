"use client";

import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
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
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
  email: z.string().email("El correo electrónico no es válido."),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 caracteres."),
});

export default function SignUp() {
  const router = useRouter();
  const getSession = api.auth.getSession.useQuery();
  const userLogin = api.auth.register.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      password: "",
      email: "",
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    userLogin.mutate(values);
  }
  const parseFormValues = (key: string): string => {
    const formValueMap: Record<string, string> = {
      name: "Nombres",
      lastname: "Apellidos",
      password: "Contraseña",
      email: "Correo electrónico",
      phone: "Teléfono",
    };

    return formValueMap[key] || "";
  };

  useEffect(() => {
    userLogin.isSuccess && router.push("/");
  }, [userLogin.isSuccess, userLogin.isError]);

  if (getSession.isSuccess) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="flex w-1/3 p-10">
        <Form {...form}>
          <div className="grid w-full items-center gap-4">
            <h1 className="flex justify-center text-xl font-semibold">
              Registro
            </h1>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {Object.keys(form.getValues()).map((key) => {
                return (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{parseFormValues(key)}</FormLabel>
                        <FormControl>
                          <Input
                            type={key === "password" ? "password" : "text"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
              <div className="flex w-full flex-col items-center">
                <Button className="w-fit bg-sky-400" type="submit">
                  Crear Cuenta
                </Button>
                {userLogin.isError && (
                  <p className="text-red-500 ">{userLogin.error.message}</p>
                )}
              </div>
            </form>
          </div>
        </Form>
      </Card>
    </div>
  );
}
