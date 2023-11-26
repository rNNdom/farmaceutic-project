import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProductOnDelivery from "~/components/home/ProductOnDelivery";
import useOrder from "~/hooks/useOrder";
import { Text, View } from "../../components/Themed";
import useUser from "~/hooks/useUser";
import { useContext } from "react";
import { UserContext } from "~/components/userContext";
import {  api } from "~/utils/api";


const EmptyComponent = () => {
  return (
    <View style={styles.empty}>
      <Text style={{ fontSize: 20, fontWeight: "500", margin: 10 }}>
        No hay pedidos disponibles.
      </Text>
    </View>
  );
};

const CartItem = (data: any) => {
  return (
    <FlatList
      data={data.data}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{
        paddingBottom: 25,
      }}
      renderItem={({ item }) => <ProductOnDelivery item={item} />}
      keyExtractor={(item: any) => item.order_id.toString()}
    />
  );
};

export default function CatalogoScreens() {
  const { user} = useContext(UserContext);
  const { userData } = useUser(1);

  const {order} = useOrder(["all", user?.usr_id]);

  return (
    <>
      {order?.length === 0 ? (
        <EmptyComponent />
      ) : (
        <CartItem data={order} />
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