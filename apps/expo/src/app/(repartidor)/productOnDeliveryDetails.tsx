import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "../../components/Themed";

import { OrderDetails, ProductOrderDetail } from "~/utils/interface";
import { api } from "~/utils/api";
import Loading from "~/components/loading";
import Header from "~/components/Header";
import OrderProductDetail from "~/components/home/OrderDetail";
import { formatMoney } from "~/utils/formats";
import OrderDetailCard from "~/components/OrderDetailCard";


interface CartItemProps {
  prodDet: ProductOrderDetail[]
  orderDet: OrderDetails
}

const EmptyComponent = () => {
  return (
    <View className="items-center content-center flex-1 bg-transparent">
      <Text className="text-xl font-medium m-3">No hay productos en el carrito.</Text>
    </View>
  );
};



const CartItem = ({ prodDet, orderDet }: CartItemProps) => {
  return (
    <>
      <FlatList
        data={prodDet}
        renderItem={({ item }) => <OrderProductDetail item={item.Product} quantity={item.quantity} />}
        keyExtractor={(item: any) => item.prod_id}
      />
      <View className="rounded-md flex-col justify-between items-center mx-3 my-3">
        <Text className="text-xl font-medium m-3">Total: {formatMoney(orderDet.order_det_total)}</Text>
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
            <>
              <OrderDetailCard {..._item} />
              <CartItem prodDet={prodDet} orderDet={_item} />
            </>
          )}
        </>
      )}
    </>
  );
}


