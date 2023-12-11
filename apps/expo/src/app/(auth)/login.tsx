import { TextInput, } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, useRouter } from "expo-router";
import { Ionicons, SafeAreaView, Text, View } from "../../components/Themed";
import { useContext, useEffect, useState } from "react";
import { api, setToken } from "~/utils/api";
import { setContentAsyncStorage } from "~/components/storage";
import { UserContext } from "~/components/userContext";
import { CustomColors, CustomStyles } from "~/styles/CustomStyles";



export default function LoginAuth() {
  const router = useRouter();
  const { addUser, addToken } = useContext(UserContext);
  const userLogin = api.auth.login.useMutation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    userLogin.mutate({
      email: email,
      pass: password,
    })
  }


  useEffect(() => {
    if (userLogin.isSuccess) {
      addToken(userLogin.data.token);
      setToken(userLogin.data.token);
      setContentAsyncStorage(userLogin.data.token, "@token")
      setContentAsyncStorage(userLogin.data.user, "@user")
      addUser(userLogin.data.user);
      router.replace("/(tabs)");

    }
    userLogin.isError && console.log(userLogin.error.message);
  }, [userLogin.isSuccess, userLogin.isError]);




  return (
    <SafeAreaView className="flex-1 py-1">
      <View className="items-start px-2 mb-3 mx-3 py-3">
        <Text className="text-3xl font-bold" style={{ color: CustomColors.Bice_blue }}>
          Iniciar Sesion
        </Text>
        <Text className="text-xl font-bold opacity-70" style={{ color: CustomColors.Bice_blue }}>
          Bienvenido
        </Text>
      </View>

      <View className="flex-col gap-3 mx-3 py-3 mb-3 ">
        <Text className="text-sm font-medium">Correo</Text>
        <View className="flex-row border-2 border-gray-200 gap-3 justify-stretch ">
          <Ionicons name="ios-person-outline" size={20} />
          <TextInput className="pb-2"
            placeholder="Correo Electronico"
            onChangeText={(text) => setEmail(text)} />
        </View>
      </View>

      <View className="flex-col gap-3 mx-3 py-3 mb-3 ">
        <Text className="text-sm font-medium">Contraseña</Text>
        <View className="flex-row border-2 border-gray-200 gap-3 justify-stretch ">
          <Ionicons name="lock-closed-outline" size={20} />
          <TextInput className="pb-2"
            placeholder="Contraseña"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
      </View>

      <View className="items-end mx-3">
        <Text className="font-medium" style={{ color: CustomColors.Bice_blue }}>Olvidaste tu contraseña?</Text>
      </View>

      <View className="mt-2 px-5 py-2 bg-transparent">
        <TouchableOpacity style={CustomStyles.loginButtton}
          onPress={onSubmit}>
          <Text className="text-white font-medium">Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-center gap-3 my-3">
        <View className="flex-1 h-px bg-gray-400 opacity-50" />
        <Text className="text-center opacity-60">
          Eres nuevo cliente?
        </Text>
        <View className="flex-1 h-px bg-gray-400 opacity-50" />
      </View>

      <View className="mt-2 px-5 py-2 bg-transparent">
        <TouchableOpacity style={CustomStyles.singUpButtton} >
          <Link href="/(auth)/register" replace={true}>
            <Text className="font-medium border-opacity-50">
              Crear Cuenta
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
