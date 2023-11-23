import { Image, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

import { Ionicons, SafeAreaView, Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { api, setToken } from "~/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginAuth () {
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
      setToken(userLogin.data.token);
      AsyncStorage.setItem("@token", userLogin.data.token);
    }
    userLogin.isError && console.log(userLogin.error.message);
  }, [userLogin.isSuccess, userLogin.isError]);
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: "#1969a3",
          fontSize: 26,
          fontWeight: "bold",
          paddingVertical: 18,
        }}
      >
        Iniciar Sesion
      </Text>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <View style={styles.optionlogin}>
          <Image
            source={require("../../assets/icons/fb.png")}
            style={styles.icon}
          />
          <Text>Facebook</Text>
        </View>
        <View style={styles.optionlogin}>
          <Image
            source={require("../../assets/icons/google.png")}
            style={styles.icon}
          />
          <Text>Google</Text>
        </View>
      </View> */}
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
            backgroundColor: "#1969a3",
          }}
        />
        <Text style={{ textAlign: "center" }}>O</Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "#1969a3",
          }}
        />
      </View>
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
          <Text>Correo</Text>
          <View style={styles.input}>
            <Ionicons name="ios-person-outline" size={20} />
            <TextInput
              placeholder="Correo Electronico"
              onChangeText={(text) => setEmail(text)}
              style={{
                flex: 1,
              }}
            />
          </View>
        </View>
        <View
          style={{
            gap: 10,
          }}
        >
          <Text>Contraseña</Text>
          <View style={styles.input}>
            <Ionicons name="lock-closed-outline" size={20} />
            <TextInput
              placeholder="Contrasenia"
              onChangeText={(text) => setPassword(text)}
              style={{
                flex: 1,
              }}
              secureTextEntry
            />
          </View>
        </View>
      </View>

      <Text
        style={{
          textAlign: "right",
          color: "#1969a3",
          fontSize: 12,
          fontWeight: "500",
          paddingVertical: 12,
        }}
      >
        Olvidaste tu contraseña?
      </Text>
      <View
        style={{
          gap: 10,
        }}
      >
        <TouchableOpacity
          onPress={onSubmit}
          style={[styles.btnPrincipal, styles.btncolorprincipal]}
        >
          <Text style={{ color: "white" }}>Iniciar Sesion</Text>
        </TouchableOpacity>
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
              Eres nuevo cliente?
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
            <Link href="/(auth)/register" replace={true}>
              <Text
                style={{
                  color: "#1969a3",
                }}
              >
                Crear Cuenta
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
