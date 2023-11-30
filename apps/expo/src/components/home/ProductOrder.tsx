import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Order } from "~/utils/interface";
import { Ionicons, Text, View } from "../Themed";
import { api } from "~/utils/api";
import { CustomColors, CustomStyles, getStatusColor } from "~/styles/CustomStyles";
import { formatDate, formatMoney, formatStatus } from "~/utils/formats";
import ViewDate from "../ViewDate";
import ViewIconCard from "../ViewIconCard";




export default function ProductOrder({ setIsDeleted, ...item }) {
  const [showText, setShowText] = useState(false);
  const deleteOrders = api.orders.deleteOrders.useMutation();
  const order = item as Order;
  const customer = order.user;
  const orderdet = order.OrderDetail.at(0);
  const delivery = order.delivery_user;
  const aux = {
    ...orderdet,
    order_date_of_ord: order.order_date_of_ord,
    order_location: order.order_location,
    order_status: order.order_status,
    prf_lastname: delivery ? delivery.profile?.prf_lastname : null,
    prf_name: delivery ? delivery.profile?.prf_name : null,
    prf_phone: delivery ? delivery.profile?.prf_phone : null,
    prf_email: delivery ? delivery.usr_email : null,
  }

  const options = formatDate()

  const handlePress = () => {
    setShowText(!showText);
  };

  const getRecipeText = (isrecipe: boolean) => {
    if (isrecipe) {
      return "Con receta";
    }
    return "Sin receta";
  };

  const deleteOrder = () => {
    deleteOrders.mutate({
      id: order.order_id
    })

  }

  useEffect(() => {
    if (deleteOrders.isSuccess) {
      setIsDeleted(true)
    }
    deleteOrders.isError && console.log(deleteOrders.error.message)

  }, [deleteOrders.isSuccess, deleteOrders.isError])



  return (
    <Link
      href={{
        pathname: "/(tabs)/productOrderDetails",
        params: {
          ...aux,
        }
      }}
      asChild
    >
      <TouchableOpacity className="flex-row mx-1 my-2 px-1 shadow-sm rounded-xl" style={CustomStyles.card} >
        <View className="flex-1 rounded-xl">
          <View className="rounded-xl bg-transparent">
            <TouchableOpacity
              className="absolute top-0 right-0 w-9 h-9 rounded-full z-10 justify-center items-center"
              onPress={handlePress}

            >
              <View style={getCircleStyle(orderdet?.order_det_recipe)} />
              {showText && (
                <Text className="absolute top-0 -right-1 w-32 h-5">
                  {getRecipeText(orderdet?.order_det_recipe)}
                </Text>
              )}
            </TouchableOpacity>
            <Text className="font-bold uppercase text-xl ml-2"
              style={{ color: getStatusColor(order.order_status) }}>
              {formatStatus(order.order_status)}
            </Text>
            <ViewIconCard data={[order.order_date_of_ord.toLocaleDateString(options.localDate, options.options)]} icon="calendar-sharp" />
            <ViewIconCard data={[order.order_date_of_ord.toLocaleTimeString(options.localDate)]} icon="time-sharp" />
          </View>

          {delivery && (
            <>
              <ViewIconCard data={[delivery.profile?.prf_name, delivery.profile?.prf_lastname]} icon="person-outline" />
            </>
          )}

          <ViewIconCard data={[order.order_location]} icon="map-outline" />

          {customer.usr_vip && (
            <View className="flex-row ml-1" >
              <View className="mr-2">
                <Ionicons
                  name="flash-outline"
                  size={26}
                  style={{
                    opacity: 0.3,
                  }}
                />
              </View>
              <Text style={CustomStyles.isVip} >Cliente VIP</Text>
            </View>
          )}


          <View className="flex-row ml-1 bg-transparent" >
            <View className="mr-2">
              <Ionicons
                name="cash-outline"
                size={26}
                style={{
                  opacity: 0.3,
                }}
              />
            </View>
            <Text style={CustomStyles.textMoney}>
              {formatMoney(orderdet?.order_det_total)}
            </Text>
          </View>

          <View className="flex-row mt-2 px-5 py-2 bg-transparent">
            {/* <Link href={{
              pathname: "/(tabs)/productOrderDetails",
              params: { ...aux },
            }}
              asChild>
              <TouchableOpacity style={CustomStyles.detailButtton}>
                <Text style={{ color: CustomColors.White }} >Detalles</Text>
              </TouchableOpacity>
            </Link> */}
            {order.order_status === "PENDING" && (
              <TouchableOpacity onPress={deleteOrder} style={CustomStyles.cancelButton}>
                <Text style={{ color: CustomColors.White }}>Cancelar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}



const getCircleStyle = (recipe: boolean) => {
  if (recipe) {
    return CustomStyles.redcicle;
  }
  return CustomStyles.greencicle;
};

const cicle = {
  position: "absolute",
  top: 0,
  right: 0,
  width: 20,
  height: 20,
  borderRadius: 10,
};

const colors = {
  custom: "#1969a3",
  green: "green",
  detailsButton: "#2c7379",
  acceptButton: "#f0a62f",
  white: "white",
  red: ""
};
