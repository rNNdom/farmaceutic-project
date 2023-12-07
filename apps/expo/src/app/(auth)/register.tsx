import { StyleSheet, TextInput } from "react-native";

import { Ionicons, SafeAreaView, Text, View } from "../../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { api, setToken } from "~/utils/api";
import { Children, useContext, useEffect, useState } from "react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { setContentAsyncStorage } from "~/components/storage";
import { UserContext } from "~/components/userContext";
import KeyboardAvoidingContainer from "~/components/KeyboardAvoidingCointainer";

type FormData = {
  name: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
};


export default function RegisterAuth() {
  const { addToken, addUser } = useContext(UserContext);
  const userRegitry = api.auth.register.useMutation();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: "",
      lastname: "",
      password: "",
      email: "",
      phone: "",
    }
  });


  const formatPhone = (phone: string) => {
    if (/^\9+?\d{8}$/.test(phone)) {
      return '+56' + phone;
    } else if (/^\+(569)+\d{8}$/.test(phone)) {
      return '+' + phone;
    } else if (/^\d{8}$/.test(phone)) {
      return '+569' + phone;
    } else {
      return phone;
    }
  };


  const onSubmit = (data: FormData) => {
    data.phone = formatPhone(data.phone);
    userRegitry.mutate(data);
  }

  useEffect(() => {
    if (userRegitry.isSuccess) {
      setToken(userRegitry.data.token);
      addToken(userRegitry.data.token);
      addUser(userRegitry.data.user);
      setContentAsyncStorage(userRegitry.data.token, "@token")
      router.replace("/(tabs)");

    }
    userRegitry.isError && console.log(userRegitry.error.message);
  }, [userRegitry.isSuccess, userRegitry.isError]);






  return (

    <KeyboardAvoidingContainer children={Children} style={undefined}>
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            color: "#1969a3",
            fontSize: 26,
            fontWeight: "bold",
            paddingVertical: 18,
          }}
        >
          Crear una cuenta
        </Text>




        <View
          style={{
            gap: 15,
          }}
        >
          <View
            style={{
              gap: 10,
            }}
          >
            <Text>Nombres</Text>
            <View style={styles.input}>
              <Ionicons name="ios-person-outline" size={20} />
              <Controller
                control={control}
                name="name"
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    placeholder="John"
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                  />

                )}
                rules={{
                  required: "Nombre es requerido",
                  minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Nombre debe tener menos de 20 caracteres",
                  },
                }}
              />
            </View>
            {errors.name ? <Text style={{ color: 'red' }}>{errors.name.message}</Text> : null}
          </View>
          <View
            style={{
              gap: 10,
            }}
          >
            <Text>Apellidos</Text>
            <View style={styles.input}>
              <Ionicons name="ios-person-outline" size={20} />
              <Controller
                control={control}
                name="lastname"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    placeholder="Doe"
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                  />
                )}
                rules={{
                  required: "Apellido es requerido",
                  minLength: {
                    value: 4,
                    message: "Apellido debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Apellido debe tener menos de 20 caracteres",
                  },
                }}
              />
            </View>
            {errors.lastname ? <Text style={{ color: 'red' }}>{errors.lastname.message}</Text> : null}
          </View>
          <View
            style={{
              gap: 10,
            }}
          >
            <Text>Correo</Text>
            <View style={styles.input}>
              <Ionicons name="ios-person-outline" size={20} />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    placeholder="Correo Electronico"
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                  />
                )}
                rules={{
                  required: "Email es requerido",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email invalido",
                  },
                }}
              />
            </View>
            {errors.email ? <Text style={{ color: 'red' }}>{errors.email.message}</Text> : null}
          </View>
          <View
            style={{
              gap: 10,
            }}
          >
            <Text>Telefono</Text>
            <View style={styles.input}>
              <Ionicons name="ios-person-outline" size={20} />
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    placeholder="(+56) 912345678"
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                  />
                )}
                rules={{
                  required: "Telefono es requerido",
                  minLength: {
                    value: 8,
                    message: "Telefono debe tener al menos 8 caracteres",
                  },
                  maxLength: {
                    value: 11,
                    message: "Telefono debe tener menos de 11 caracteres",
                  },
                  pattern: {
                    value: /^\d{8,11}$/,
                    message: "Telefono invalido",
                  },
                }}
              />
            </View>
            {errors.phone ? <Text style={{ color: 'red' }}>{errors.phone.message}</Text> : null}
          </View>
          <View
            style={{
              gap: 10,
            }}
          >
            <Text>Contraseña</Text>
            <View style={styles.input}>
              <Ionicons name="lock-closed-outline" size={20} />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    placeholder="Contraseña"
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                    secureTextEntry
                  />
                )}
                rules={{
                  required: "Contraseña es requerida",
                  minLength: {
                    value: 8,
                    message: "Contraseña debe tener al menos 8 caracteres",
                  },
                }}
              />
            </View>
            {errors.password ? <Text style={{ color: 'red' }}>{errors.password.message}</Text> : null}
          </View>
        </View>

        <View
          style={{
            height: 35,
          }}
        ></View>
        <View
          style={{
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[styles.btnPrincipal, styles.btncolorprincipal]}
          >
            <Text style={{ color: "white" }}>Registrarse</Text>
          </TouchableOpacity>
          {userRegitry.isError && (
            <Text style={{ color: "red" }}>{userRegitry.error.message}</Text>
          )}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "#E5E5E5",
                }}
              />
              <Text style={{ textAlign: "center", opacity: 0.6 }}>
                Ya tienes una cuenta?
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "#E5E5E5",
                }}
              />
            </View>

            <TouchableOpacity
              style={[styles.btnPrincipal, styles.btncolorsecundario]}
            >
              <Link href="/(auth)/login" replace={true}>
                <Text
                  style={{
                    color: "#1969a3",
                  }}
                >
                  Iniciar Sesion
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    // backgroundColor: "#E5E5E5",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // justifyContent: "space-between",
  },
  btnPrincipal: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  btncolorprincipal: {
    backgroundColor: "#1969a3",
  },
  btncolorsecundario: {
    borderColor: "#1969a3",
    borderWidth: 1,
  },
  icon: {
    width: 26,
    height: 26,
  },
  optionlogin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderColor: "#1969a3",
    borderWidth: 1,
    width: "50%",
  },
});
