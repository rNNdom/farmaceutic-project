import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "../../components/Themed";

import { OrderDetails, ProductOrderDetail } from "~/utils/interface";
import { api } from "~/utils/api";
import Loading from "~/components/loading";
import Header from "~/components/Header";
import OrderProductDetail from "~/components/home/OrderDetail";


interface CartItemProps {
  prodDet: ProductOrderDetail[]
  orderDet: OrderDetails
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



const CartItem = ({ prodDet, orderDet }: CartItemProps) => {
  return (
    <>
      <FlatList
        data={prodDet}
        renderItem={({ item }) => <OrderProductDetail item={item.Product} quantity={item.quantity} />}
        keyExtractor={(item: any) => item.prod_id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {formatMoney(orderDet.order_det_total)}</Text>
      </View>
    </>
  );
};


export default function OrderDetail() {
  const _item = useRoute().params as OrderDetails;
  const getProducts = api.orders.getProdDetails.useQuery({
    id: Number(_item.order_det_id)
  })
  const prodDet = getProducts.data?.map((item) => {
    return item
  })

  return (
    <>
      <Header />
      {getProducts.isLoading ? (
        <Loading />
      ) : (
        <>
          {prodDet.length === 0 ? (
            <EmptyComponent />
          ) : (
            <CartItem prodDet={prodDet} orderDet={_item} />
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  home: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  current: {
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#000",
    marginHorizontal: 18,
    marginVertical: 8,
    opacity: 0.5,
  },
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
    flexDirection: "column",
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
