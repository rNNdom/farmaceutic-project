import { FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import Header from "~/components/Header";
import ProductOrder from "~/components/home/ProductOrder";
import useOrderRepositories, { ORDER } from "~/hooks/useOrderRepositories";
import { Profile } from "~/hooks/useProfileRepositories";
import { Text, View } from "../../components/Themed";

export default function MyOrders() {
  const _item = useRoute().params as any;
  const { order } = useOrderRepositories(_item.usr_id);

  return (
    <>
      <Header showSearch />
      {order?.length === 0 ? (
        <EmptyComponent />
      ) : (
        <CartItem data={order} user={_item} />
      )}
    </>
  );
}

const CartItem = (data: any) => {
  return (
    <FlatList
      data={data.data}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{
        paddingBottom: 25,
      }}
      renderItem={({ item }) => <ProductOrder data={item} user={data.user} />}
      keyExtractor={(item: any) => item.order_id}
    />
  );
};

const EmptyComponent = () => {
  return (
    <View style={styles.empty}>
      <Text style={{ fontSize: 20, fontWeight: "500", margin: 10 }}>
        No hay pedidos disponibles.
      </Text>
    </View>
  );
};

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
