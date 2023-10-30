import { StyleSheet } from "react-native";
import { Text, View, Ionicons, SafeAreaView } from "../components/Themed";
import { Link } from "expo-router";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { CartContext } from "./context";

export default function Header(props: any) {
  console.log(props);
  const { cart } = useContext(CartContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href="/(tabs)/diplayer">
          <TouchableOpacity>
            <Ionicons name="ios-menu" size={28} />
          </TouchableOpacity>
        </Link>
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
          <Link href="/(auth)/login">
            <TouchableOpacity
              style={{
                paddingTop: 5,
              }}
            >
              <Ionicons name="ios-person-circle-outline" size={26} />
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/cart">
            <TouchableOpacity
              style={{
                paddingRight: 10,
                paddingTop: 5,
              }}
            >
              <Ionicons name="ios-cart-outline" size={26} />
              {cart.length > 0 && (
                <Text
                  style={{
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
                  }}
                >
                  {cart.length}
                </Text>
              )}
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View style={styles.input}>
        <TextInput placeholder="Buscar" maxLength={40} />
        <Ionicons name="ios-search-outline" size={20} />
      </View>
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
});
