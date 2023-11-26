import { useContext, useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CartContext } from "../../components/context";
import Header from "~/components/Header";
import ProductOnCart from "../../components/home/ProductOnCart";
import { Text, View } from "../../components/Themed";
import {api} from "~/utils/api";


interface CartItemProps {
  data: any[];
  emptyCart: () => void;
}

const EmptyComponent = () => {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No hay productos en el carrito.</Text>
    </View>
  );
};

const calculateTotal = (data: any[]) => {
  return data.reduce((acc: any, item: any) => {
    return acc + item.prod_price * item.onCartQuantity;
  }, 0);
};

const PayButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.pay}>
    <Text style={styles.payText}>Pagar</Text>
  </TouchableOpacity>
);

const CartItem = ({ data, emptyCart }: CartItemProps) => {
  const total = useMemo(() => calculateTotal(data), [data]);
  const getSesion = api.auth.checkSession.useMutation()

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => <ProductOnCart {...item} />}
        keyExtractor={(item: any) => item.prod_id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {formatMoney(total)}</Text>
        <TouchableOpacity onPress={emptyCart} style={styles.vaciar}>
          <Text style={styles.vaciarText}>Vaciar Carrito</Text>
        </TouchableOpacity>
      </View>

      <PayButton onPress={() => onSubmit(data)} />
    </>
  );
};

const onSubmit = (data: any) => {
  console.log(data);
}


export default function CatalogoScreen() {
  const { cart, emptyCart } = useContext(CartContext);
  console.log(cart);



  return (
    <>
      <Header showSearch />
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
  payText: {
    color: "white",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "transparent",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "500",
    margin: 10,
  },
  vaciar: {
    padding: 10,
    borderRadius: 8,
    alignItems: "flex-end",
  },
  vaciarText: {
    color: "red",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "500",
    margin: 10,
  },
});

function formatMoney(number: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(number);
}
