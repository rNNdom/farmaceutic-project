import { StyleSheet, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { useContext } from "react";
import { CartContext } from "../../components/context";
import { Text, View } from "../../components/Themed";
import { FlatList } from "react-native-gesture-handler";
import ProductOnCart from "../../components/home/ProductOnCart";

const EmptyComponent = () => {
  return (
    <View style={styles.empty}>
      <Text style={{ fontSize: 20, fontWeight: "500", margin: 10 }}>
        No hay productos en el carrito.
      </Text>
    </View>
  );
};

const CartItem = (data: any) => {
  const total = data.data.reduce((acc: any, item: any) => {
    return acc + item.price * item.quantity;
  }, 0);
  return (
    <>
      <FlatList
        data={data.data}
        renderItem={({ item }) => <ProductOnCart item={item} />}
        keyExtractor={(item: any) => item._id.toString()}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500", margin: 10 }}>
          Total: {formatMoney(total)}
        </Text>
        <TouchableOpacity onPress={data.emptyCart} style={styles.vaciar}>
          <Text style={{ color: "red" }}>Vaciar Carrito</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => {}} style={styles.pay}>
        <Text style={{ color: "white" }}>Pagar</Text>
      </TouchableOpacity>
    </>
  );
};

export default function CatalogoScreen() {
  const { cart, emptyCart } = useContext(CartContext);

  return (
    <>
      <Header />
      {cart.length === 0 ? (
        <EmptyComponent />
      ) : (
        <CartItem data={cart} emptyCart={emptyCart} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pay: {
    backgroundColor: "#1969a3",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "transparent",
  },
  vaciar: {
    padding: 10,
    borderRadius: 8,
    alignItems: "flex-end",
  },
});

function formatMoney(number: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(number);
}
