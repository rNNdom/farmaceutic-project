import { StyleSheet, TextInput } from "react-native";

import { Ionicons, SafeAreaView, Text, View } from "../../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { api, setToken } from "~/utils/api";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { setContentAsyncStorage } from "~/components/storage";
import { UserContext } from "~/components/userContext";
import Header from "~/components/Header";

type FormData = {
  name: string;
  lastname: string;
  oldpassword: string;
  newpassword: string;
  email: string;
  phone: string;
};

const EditProfile = () => {
  const { profile, updateProfile, addUser } = useContext(UserContext);
  const upProfile = api.profile.updateProfile.useMutation();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: profile?.prf_name,
      lastname: profile?.prf_lastname,
      oldpassword: "",
      newpassword: "",
      email: profile?.usr_email,
      phone: profile?.prf_phone,
    }
  });

  const onSubmit = (data: FormData) => {
    data.phone = formatPhone(data.phone);
    upProfile.mutate({
      email: data.email,
      name: data.name,
      lastname: data.lastname,
      phone: data.phone,
      id: Number(profile?.prf_id),
      newpass: data.newpassword,
      oldpass: data.oldpassword,
    })
  }



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

  useEffect(() => {
    if (upProfile.isSuccess) {
      console.log(upProfile.data)
      updateProfile({
        email: upProfile.data.user.usr_email,
        name: upProfile.data.profile.prf_name,
        lastname: upProfile.data.profile.prf_lastname,
        phone: upProfile.data.profile.prf_phone,
        pass: upProfile.data.user.usr_pass,
      })
      setContentAsyncStorage(upProfile.data.user, "@user")
      addUser(upProfile.data.user);
    }
    upProfile.isError && console.log(upProfile.error.message);
  }, [upProfile.isSuccess, upProfile.isError, profile]);




  return (
    <>
      <Header />

      <SafeAreaView style={styles.container}>
        <Text
          style={{
            color: "#1969a3",
            fontSize: 26,
            fontWeight: "bold",
            paddingVertical: 18,
          }}
        >
          My Perfil
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
                    placeholder={profile?.prf_name}
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                  />

                )}
                rules={{
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
                    placeholder={profile?.prf_lastname}
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                  />
                )}
                rules={{
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
                    placeholder={profile?.usr_email}
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                  />
                )}
                rules={{
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
                    placeholder={profile?.prf_phone}
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                  />
                )}
                rules={{
                  minLength: {
                    value: 8,
                    message: "Telefono debe tener al menos 8 caracteres",
                  },
                  maxLength: {
                    value: 12,
                    message: "Telefono debe tener menos de 12 caracteres",
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
            <Text>Contraseña actual</Text>
            <View style={styles.input}>
              <Ionicons name="lock-closed-outline" size={20} />
              <Controller
                control={control}
                name="oldpassword"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    placeholder="************"
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                    secureTextEntry
                  />
                )}
                rules={{
                  minLength: {
                    value: 8,
                    message: "Contraseña debe tener al menos 8 caracteres",
                  },
                }}
              />
            </View>
            {errors.oldpassword ? <Text style={{ color: 'red' }}>{errors.oldpassword.message}</Text> : null}
          </View>
          <View
            style={{
              gap: 10,
            }}
          >
            <Text>Contraseña nueva</Text>
            <View style={styles.input}>
              <Ionicons name="lock-closed-outline" size={20} />
              <Controller
                control={control}
                name="newpassword"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    placeholder="************"
                    style={{
                      flex: 1,
                    }}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                    secureTextEntry
                  />
                )}
                rules={{
                  minLength: {
                    value: 8,
                    message: "Contraseña debe tener al menos 8 caracteres",
                  },
                }}
              />
            </View>
            {errors.newpassword ? <Text style={{ color: 'red' }}>{errors.newpassword.message}</Text> : null}
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
            <Text style={{ color: "white" }}>Guardar</Text>
          </TouchableOpacity>
          {upProfile.isError && (
            <Text style={{ color: "red" }}>{upProfile.error.message}</Text>
          )}
          <View>

          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default EditProfile;


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