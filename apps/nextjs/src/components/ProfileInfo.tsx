"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { setToken } from "~/app/providers";
import { api } from "~/utils/api";
import { profileFormData } from "~/utils/lists";
import Loading from "./Loading";
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
  oldpass: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
  newpass: z.string().min(8, "La contraseña debe tener al menos 8 caracteres.").optional().or(z.literal('')),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 caracteres."),
});

export default function ProfileInfo () {
  const userSession = api.auth.getSession.useQuery();
  const getProfile = api.profile.getProfile.useQuery({
    id: Number(userSession.data?.user.id),
  });
  const updateProfile = api.profile.updateProfile.useMutation()
  const [disabled, setDisabled] = React.useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: getProfile.data?.prf_name ?? "",
      lastname: getProfile.data?.prf_lastname ?? "",
      email: getProfile.data?.usr_email ?? "",
      oldpass: "",
      newpass: "",
      phone: getProfile.data?.prf_phone ?? "",
    },
  });
  React.useEffect(() => {
    if (getProfile.isSuccess) {
      form.reset({
        name: getProfile.data?.prf_name,
        lastname: getProfile.data?.prf_lastname,
        email: getProfile.data?.usr_email,
        phone: getProfile.data?.prf_phone,
      });
    }
  }, [getProfile.data]);
  function onSubmit (values: z.infer<typeof formSchema>) {
    updateProfile.mutate({
      id: Number(userSession.data?.user.id),
      name: values.name,
      lastname: values.lastname,
      email: values.email,
      oldpass: values.oldpass,
      newpass: values.newpass ? values.newpass : values.oldpass,
      phone: values.phone,
    })
  }
  return (
    <div className="grid w-full items-center gap-4">
      {getProfile.isLoading || !getProfile.isSuccess ? (
        <Loading />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
            {profileFormData.map((data) => {
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
                  type="submit"
                  className="bg-sky-400"
                  onClick={() => setDisabled(!disabled)}
                >
                  Editar
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-sky-400"
                  onClick={() => setDisabled(!disabled)}
                >
                  Guardar
                </Button>
              )}
              {updateProfile.isError && (
                <p className="text-red-500 ">{updateProfile.error.message}</p>
              )}
              {updateProfile.isSuccess && (
                <p className="text-green-500 ">Perfil actualizado</p>
              )}
              {updateProfile.isLoading && <Loading />}
              <Button
                type="button"
                className="bg-sky-400"
                onClick={() => {
                  setToken("");
                  sessionStorage.clear();
                  window.location.reload();
                }}
              >
                Cerrar Sesión
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
