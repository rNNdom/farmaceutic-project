import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import Header from "../../components/Header";
import { Ionicons, Text, View } from "../../components/Themed";

export default function Profile() {
  const name = "Juan Perez";
  const status = "En camino";
  const date = "12/12/2021";
  const image = require("~/assets/carrousel-test/Ibuprofeno_10.png");
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

      <View style={styles.card}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Ultimo pedido:
        </Text>
        <View
          style={[
            styles.container,
            {
              gap: 18,
            },
          ]}
        >
          <View>
            <Image source={image} style={styles.image} />
          </View>
          <View>
            <Text
              style={[
                {
                  fontWeight: "500",
                },
                styles.colorcustom,
                styles.title,
              ]}
            >
              {status}
            </Text>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
              Realizado {date}
            </Text>
            <TouchableOpacity style={[styles.container, styles.ordercard]}>
              <Text
                style={{
                  color: "#fff",
                }}
              >
                Hacer seguimiento
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={22}
                style={{
                  color: "#fff",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingVertical: 12,
        }}
      >
        <View style={styles.separator} />
        <Link href="/(tabs)/myOrders" asChild style={styles.settingcard}>
          <TouchableOpacity style={[styles.container, styles.settingcard]}>
            <View
              style={[
                styles.container,
                {
                  gap: 12,
                },
              ]}
            >
              <Ionicons
                name="cart-outline"
                size={26}
                style={styles.colorcustom}
              />
              <Text style={[styles.settingtext, styles.colorcustom]}>
                Mis Pedidos
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={26}
                style={{
                  opacity: 0.3,
                }}
              />
            </View>
          </TouchableOpacity>
        </Link>
        <View style={styles.separator} />
        <Link href="/(tabs)/myProfile">
          <TouchableOpacity style={[styles.container, styles.settingcard]}>
            <View
              style={[
                styles.container,
                {
                  gap: 12,
                },
              ]}
            >
              <Ionicons
                name="person-outline"
                size={24}
                style={styles.colorcustom}
              />
              <Text style={[styles.settingtext, styles.colorcustom]}>
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
        </Link>
        <View style={styles.separator} />
        <Link href="/(tabs)/myProfile">
          <TouchableOpacity style={[styles.container, styles.settingcard]}>
            <View style={[styles.container, { gap: 12 }]}>
              <Ionicons
                name="home-outline"
                size={26}
                style={styles.colorcustom}
              />
              <Text style={[styles.settingtext, styles.colorcustom]}>
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
        </Link>
        <View style={styles.separator} />
        <Link href="/(tabs)/myProfile">
          <TouchableOpacity style={[styles.container, styles.settingcard]}>
            <View style={[styles.container, { gap: 12 }]}>
              <Ionicons
                name="help-circle-outline"
                size={26}
                style={styles.colorcustom}
              />
              <Text style={[styles.settingtext, styles.colorcustom]}>
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
        </Link>
        <View style={styles.separator} />
        <TouchableOpacity style={[styles.container, styles.settingcard]}>
          <View style={[styles.container, { gap: 12 }]}>
            <Ionicons
              name="log-out-outline"
              size={26}
              style={{
                color: "#ff0000",
              }}
            />
            <Text style={[styles.container, { gap: 19, color: "#ff0000" }]}>
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
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  ordercard: {
    gap: 12,
    paddingVertical: 8,
    backgroundColor: "#1969a3ba",
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  settingcard: {
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  settingtext: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
});
