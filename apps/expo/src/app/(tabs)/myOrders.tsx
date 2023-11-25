import { FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import Header from "~/components/Header";
import ProductOrder from "~/components/home/ProductOrder";
import { Text, View } from "../../components/Themed";
import { api } from "~/utils/api";
import {  useEffect, useState } from "react";
import Loading from "~/components/loading";

export default function MyOrders() {
  const _item = useRoute().params as any;
  const [isDeleted, setIsDeleted] = useState(false)
  const getOrdert = api.orders.getAllOrder.useQuery({
    idCustomer: Number(_item.usr_id),
  })

  useEffect(() => {
    if (isDeleted) {
      getOrdert.refetch()
      setIsDeleted(false)
    }
  }, [getOrdert.isSuccess, getOrdert.isError, isDeleted, getOrdert.dataUpdatedAt])

  return (
    <>
      <Header showSearch />
      {getOrdert.isLoading ? (
        <Loading />
      ) : (
        <>
          {getOrdert.data?.length === 0 ? (
            <EmptyComponent />
          ) : (
            <CartItem setIsDeleted={setIsDeleted} data={getOrdert.data} />
          )}
        </>
      )}
    </>
  );
}

const CartItem = ({data, setIsDeleted}) => {
  return (
    <FlatList
      data={data}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{
        paddingBottom: 25,
      }}
      renderItem={({ item }) => <ProductOrder setIsDeleted={setIsDeleted} {...item} />}
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
