import { StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";

import { Ionicons, SafeAreaView, Text, View } from "../../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { api } from "~/utils/api";
import React, { Children, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { setContentAsyncStorage } from "~/components/storage";
import { UserContext } from "~/components/userContext";
import Header from "~/components/Header";
import KeyboardAvoidingContainer from "~/components/KeyboardAvoidingCointainer";
import { formatPhone } from "~/utils/formats";
import { CustomColors, CustomStyles } from "~/styles/CustomStyles";

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

  useEffect(() => {
    if (upProfile.isSuccess) {
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
      <KeyboardAvoidingContainer children={Children} style={undefined}>

        <Text className="text-2xl font-bold py-5"
          style={{
            color: CustomColors.Bice_blue,
          }}
        >
          Mi Perfil
        </Text>
        <View className="gap-4">
          <View className="gap-3 mr-2">
            <Text>Nombres</Text>
            <View style={CustomStyles.inputContainer}>
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
            {errors.name ? <Text style={{ color: CustomColors.Persian_red }}>{errors.name.message}</Text> : null}
          </View>
          <View className="gap-3 m-2">
            <Text>Apellidos</Text>
            <View style={CustomStyles.inputContainer}>
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
            {errors.lastname ? <Text style={{ color: CustomColors.Persian_red }}>{errors.lastname.message}</Text> : null}
          </View>
          <View className="gap-3 m-2">
            <Text>Correo</Text>
            <View style={CustomStyles.inputContainer}>
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
            {errors.email ? <Text style={{ color: CustomColors.Persian_red }}>{errors.email.message}</Text> : null}
          </View>
          <View className="gap-3 m-2">
            <Text>Telefono</Text>
            <View style={CustomStyles.inputContainer}>
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
                    value: /^\+?\d{8,11}$/,
                    message: "Telefono invalido",
                  },
                }}
              />
            </View>
            {errors.phone ? <Text style={{ color: CustomColors.Persian_red }}>{errors.phone.message}</Text> : null}
          </View>
          <View className="gap-3 m-2">
            <Text>Contraseña actual</Text>
            <View style={CustomStyles.inputContainer}>
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
            {errors.oldpassword ? <Text style={{ color: CustomColors.Persian_red }}>{errors.oldpassword.message}</Text> : null}
          </View>
          <View className="gap-3 m-2">
            <Text>Contraseña nueva</Text>
            <View style={CustomStyles.inputContainer}>
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
            {errors.newpassword ? <Text style={{ color: CustomColors.Persian_red }}>{errors.newpassword.message}</Text> : null}
          </View>
        </View>

        <View className="h-9"></View>
        <View className="gap-3">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="p-3 rounded-md flex-row items-center gap-3 justify-center"
            style={{ backgroundColor: CustomColors.United_nations_blue }}
          >
            <Text className="mb-3" style={{ color: CustomColors.White }}>Guardar</Text>
          </TouchableOpacity>
          <View className="justify-center items-center py-3">
            {upProfile.isError && (
              <Text style={{ color: CustomColors.Persian_red }}>{upProfile.error.message}</Text>
            )}

          </View>
        </View>

      </KeyboardAvoidingContainer>
    </>
  );
};

export default EditProfile;
