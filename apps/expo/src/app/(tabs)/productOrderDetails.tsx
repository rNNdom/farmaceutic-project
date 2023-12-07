import React, { useContext, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "../../components/Themed";

import { OrderDetails, ProductOrderDetail } from "~/utils/interface";
import { api } from "~/utils/api";
import Loading from "~/components/loading";
import Header from "~/components/Header";
import OrderProductDetail from "~/components/home/OrderDetail";
import { formatMoney } from "~/utils/formats";
import OrderDetailCard from "~/components/OrderDetailCard";
import { CustomColors, CustomStyles } from "~/styles/CustomStyles";
import { UserContext } from "~/components/userContext";
import { useRouter } from "expo-router";



interface CartItemProps {
  prodDet: ProductOrderDetail[]
  orderDet: OrderDetails
}

const EmptyComponent = () => {
  return (
    <View className="items-center justify-center flex-1 bg-transparent">
      <Text className="text-xl font-medium m-3">No hay productos en el detalle</Text>
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
  const _item = useRoute().params as any;
  const router = useRouter();
  const { user } = useContext(UserContext);
  const utils = api.useUtils();
  const updateOrder = api.orders.updateOrder.useMutation();
  const getProducts = api.orders.getProdDetails.useQuery({
    id: Number(_item.order_det_id)
  })
  const prodDet = getProducts.data?.map((item) => {
    return item
  })

  const upOrder = (_deliver: any, _status: any) => {
    updateOrder.mutate({
      idOrder: Number(_item.order_id),
      status: _status,
      idDeliver: _deliver
    })
  }

  useEffect(() => {
    if (updateOrder.isSuccess) {
      utils.orders.getAllOrdersByDeliverId.refetch()
      utils.orders.getAllOrderforDeliver.refetch()
      utils.orders.getLastDeliverOrder.refetch()
      router.back()
    }
    updateOrder.isError && console.log(updateOrder.error.message)

  }, [updateOrder.isSuccess, updateOrder.isError])

  console.log(_item)

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
              {_item.usr_role === "DELIVER" && _item.order_status !== "DELIVERED" && (
                <>
                  <View className="flex-row justify-center items-center py-2 px-2">
                    <TouchableOpacity
                      className="bg-transparent border-2 rounded-md px-5 py-2 justify-center m-1"
                      style={CustomStyles.cancelButton}
                      onPress={() => upOrder(null, "PENDING")}
                    >
                      <Text style={{ color: CustomColors.White }}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-transparent border-2 rounded-md px-5 py-2 justify-center"
                      style={CustomStyles.detailButtton}
                      onPress={() => upOrder(user?.usr_id, "DELIVERED")}
                    >
                      <Text style={CustomStyles.buttontext}>Entregar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}