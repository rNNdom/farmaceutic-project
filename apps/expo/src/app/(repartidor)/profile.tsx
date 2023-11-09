import { Image, StyleSheet, TouchableOpacity } from "react-native";

import Header from "../../components/Header";
import { Ionicons, Text, View } from "../../components/Themed";

export default function Profile() {
  const name = "Huacho ql loco repartidor";
  const status = "En camino";
  const date = "12/12/2021";
  const image = require("../../assets/carrousel-test/ibu.png");
  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <Header />
      <View
        style={{
          paddingHorizontal: 12,
          paddingTop: 8,
          paddingBottom: 18,
        }}
      >
        <Text style={[styles.title, styles.colorcustom]}>Hola, {name}</Text>
      </View>

      <View
        style={{
          flex: 1,
          paddingVertical: 12,
        }}
      >
        <View style={styles.separator} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{
              gap: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="cart-outline"
              size={26}
              style={styles.colorcustom}
            />
            <Text
              style={[
                {
                  fontSize: 18,
                  fontWeight: "400",
                  textAlign: "center",
                },
                styles.colorcustom,
              ]}
            >
              Mis Pedidos
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={26}
            style={{
              opacity: 0.3,
            }}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{
              gap: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="person-outline"
              size={24}
              style={styles.colorcustom}
            />
            <Text
              style={[
                {
                  fontSize: 18,
                  fontWeight: "400",
                  textAlign: "center",
                },
                styles.colorcustom,
              ]}
            >
              Mis Datos
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={26}
            style={{
              opacity: 0.3,
            }}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{
              gap: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="home-outline"
              size={26}
              style={styles.colorcustom}
            />
            <Text
              style={[
                {
                  fontSize: 18,
                  fontWeight: "400",
                  textAlign: "center",
                },
                styles.colorcustom,
              ]}
            >
              Mis Direcciones
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={26}
            style={{
              opacity: 0.3,
            }}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{
              gap: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="help-circle-outline"
              size={26}
              style={styles.colorcustom}
            />
            <Text
              style={[
                {
                  fontSize: 18,
                  fontWeight: "400",
                  textAlign: "center",
                },
                styles.colorcustom,
              ]}
            >
              Ayuda
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={26}
            style={{
              opacity: 0.3,
            }}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{
              gap: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="log-out-outline"
              size={26}
              style={{
                color: "#ff0000",
              }}
            />
            <Text
              style={[
                {
                  fontSize: 18,
                  fontWeight: "400",
                  textAlign: "center",
                  color: "#ff0000",
                },
              ]}
            >
              Cerrar Sesion
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={26}
            style={{
              opacity: 0.3,
            }}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "500",
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#1969a3",
  },
  home: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  current: {
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 18,
    marginVertical: 8,
    opacity: 0.5,
  },
  colorcustom: {
    color: "#1969a3",
  },
  image: {
    width: 150,
    height: 150,
  },
});
