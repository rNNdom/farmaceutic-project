import { StyleSheet, TextInput } from "react-native";

import { Ionicons, SafeAreaView, Text, View } from "../../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

export default function RegisterAuth() {
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
          <Text>Nombres y Apellidos</Text>
          <View style={styles.input}>
            <Ionicons name="ios-person-outline" size={20} />
            <TextInput
              placeholder="Nombres y Apellidos"
              maxLength={40}
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
          <Text>Correo</Text>
          <View style={styles.input}>
            <Ionicons name="ios-person-outline" size={20} />
            <TextInput
              placeholder="Correo Elec"
              maxLength={40}
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
              placeholder="Contraseña"
              maxLength={40}
              style={{
                flex: 1,
              }}
            />
          </View>
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
          style={[styles.btnPrincipal, styles.btncolorprincipal]}
        >
          <Text style={{ color: "white" }}>Registrarse</Text>
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
