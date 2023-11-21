import { useContext } from "react";
import { StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

import useUserRepositories from "~/hooks/useUserRepositories";
import { Ionicons, SafeAreaView, Text, View } from "../components/Themed";
import { CartContext } from "./context";

export default function Header(_props: any) {
  const { cart, quantity } = useContext(CartContext);
  const { user } = useUserRepositories(2);
  const isLogged = true;
  const isRepartidor = user?.usr_role;
  const showSearch = _props.showSearch && isRepartidor == 1;

  const ruta = isLogged
    ? isRepartidor === 2
      ? "/(repartidor)/profile"
      : "/(tabs)/profile"
    : "/(auth)/login";

  const cartRuta = isRepartidor === 2 ? "/(repartidor)/cart" : "/(tabs)/cart";
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {isRepartidor == 1 && (
          <Link href="/(tabs)/diplayer">
            <TouchableOpacity>
              <Ionicons name="ios-menu" size={28} />
            </TouchableOpacity>
          </Link>
        )}

        <Link href="/(tabs)">
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Farmacia
          </Text>
        </Link>
        <View style={styles.options}>
          <Link
            href={{
              pathname: ruta,
              params: { ...user },
            }}
            asChild
          >
            <TouchableOpacity
              style={{
                paddingTop: 5,
              }}
            >
              <Ionicons name="ios-person-circle-outline" size={26} />
            </TouchableOpacity>
          </Link>
          {isRepartidor == 1 && (
            <Link href={cartRuta}>
              <TouchableOpacity
                style={{
                  paddingRight: 10,
                  paddingTop: 5,
                }}
              >
                <Ionicons name="ios-cart-outline" size={26} />
                {cart.length > 0 && (
                  <Text style={styles.text}>
                    {quantity < 99 ? quantity : "9+"}
                  </Text>
                )}
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>
      {showSearch && (
        <View style={styles.input}>
          <TextInput placeholder="Buscar" maxLength={40} />
          <Ionicons name="ios-search-outline" size={20} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 32,
    backgroundColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#1969a3",
    color: "#fff",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 50,
    fontSize: 10,
    // minWidth: 16,
    textAlign: "center",
  },
});
