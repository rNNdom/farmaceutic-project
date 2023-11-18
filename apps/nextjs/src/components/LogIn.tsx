

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { api } from "~/utils/api";
import { setToken } from "~/app/providers";
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
  email: z.string().email("El correo electrónico no es válido."),
  pass: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});
type LoginProps = {
  setUseState: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function LogIn({ setUseState }: LoginProps) {
  const userLogin = api.auth.login.useMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      pass: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    userLogin.mutate(values);
  }
  useEffect(() => {
    if (userLogin.isSuccess) {
      setToken(userLogin.data.token);
      setUseState(true);
    }
    userLogin.isError && console.log(userLogin.error.message);
  }, [userLogin.isSuccess, userLogin.isError]);

  const handleButtonClick = () => {
    router.push("/auth");
  };
  return (
    <Card className="w-1/3 p-10">
      <Form {...form}>
        <div className="grid w-full items-center gap-4">
          <h1 className="flex justify-center text-xl font-semibold">
            Inicio de Sesión
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
                      <FormLabel>
                        {key === "email" ? "Correo electrónico" : "Contraseña"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={key === "pass" ? "password" : "text"}
                          placeholder={
                            key === "email"
                              ? "example@example.com"
                              : "Escriba aquí su contraseña..."
                          }
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
                Iniciar sesión
              </Button>
              {userLogin.isError && (
                <p className="text-red-500 ">{userLogin.error.message}</p>
              )}
            </div>
          </form>

          <div className="flex flex-col justify-between gap-3 pt-10">
            <p className="flex justify-center">¿No tiene cuenta?</p>
            <a
              className="flex cursor-pointer justify-center text-sky-400"
              onClick={handleButtonClick}
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </Form>
    </Card>
  );
}