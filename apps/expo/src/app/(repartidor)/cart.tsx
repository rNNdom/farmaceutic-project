import { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import ProductOnDelivery from "~/components/home/ProductOnDelivery";
import { CartContext } from "../../components/context";
import Header from "../../components/Header";
import ProductOnCart from "../../components/home/ProductOnCart";
import { Text, View } from "../../components/Themed";

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
      keyExtractor={(item: any) => item._id.toString()}
    />
  );
};

export default function CatalogoScreen() {
  const fakedata = [
    {
      _id: 1,
      priority: 1,
      require_recipe: true,
      date: "2021-06-01T00:00:00.000Z",
      name_client: "Juan Perez",
      address: "Calle falsa 123",
      is_vip: false,
      total: 10000,
    },
    {
      _id: 2,
      priority: 1,
      require_recipe: false,
      date: "2021-06-01T00:00:00.000Z",
      name_client: "Juan sad",
      address: "Calle falsa 123",
      is_vip: false,
      total: 10000,
    },
    {
      _id: 3,
      priority: 1,
      require_recipe: false,
      date: "2021-06-01T00:00:00.000Z",
      name_client: "Juan asdasd",
      address: "Calle falsa 123",
      is_vip: false,
      total: 10000,
    },
    {
      _id: 4,
      priority: 1,
      require_recipe: false,
      date: "2021-06-01T00:00:00.000Z",
      name_client: "Juan ssss",
      address: "Calle falsa 123",
      is_vip: true,
      total: 10000,
    },
    {
      _id: 5,
      priority: 1,
      require_recipe: false,
      date: "2021-06-01T00:00:00.000Z",
      name_client: "Juan ssss",
      address: "Calle falsa 123",
      is_vip: true,
      total: 10000,
    },
    {
      _id: 6,
      priority: 1,
      require_recipe: false,
      date: "2021-06-01T00:00:00.000Z",
      name_client: "Juan ssss",
      address: "Calle falsa 123",
      is_vip: true,
      total: 10000,
    },
  ];

  return (
    <>
      <Header showSearch />
      {fakedata.length === 0 ? (
        <EmptyComponent />
      ) : (
        <CartItem data={fakedata} />
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
