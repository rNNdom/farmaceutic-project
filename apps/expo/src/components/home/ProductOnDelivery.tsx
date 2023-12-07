import { useContext, useEffect, useMemo, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Order } from "~/utils/interface";
import { Ionicons, Text, View } from "../../components/Themed";
import { api } from "~/utils/api";
import { UserContext } from "../userContext";
import { CustomStyles, getCircleStyle, getStatusColor } from "~/styles/CustomStyles";
import { calculatePriority, formatDate, formatMoney, formatStatus } from "~/utils/formats";
import ViewIconCard from "../ViewIconCard";



const getPriorityText = (priority: number) => {
  switch (priority) {
    case 0:
      return "Baja prioridad";
    case 1:
      return "Media prioridad";
    case 2:
      return "Alta prioridad";
    case 3:
      return "Prioridad máxima";
    default:
      return "";
  }
};

export default function ProductOnDelivery({ setIsChange, ...item }) {
  const [showText, setShowText] = useState(false);
  const { user } = useContext(UserContext);
  const order = item as Order;
  const updateOrder = api.orders.updateOrder.useMutation();
  const customer = order.user;
  const orderdet = order.OrderDetail.at(0);
  const aux = {
    ...orderdet,
    order_id: order.order_id,
    order_date_of_ord: order.order_date_of_ord,
    order_location: order.order_location,
    order_status: order.order_status,
    prf_lastname: customer ? customer.profile?.prf_lastname : null,
    prf_name: customer ? customer.profile?.prf_name : null,
    prf_phone: customer ? customer.profile?.prf_phone : null,
    prf_email: customer ? customer.usr_email : null,
    usr_role: user?.usr_role,
  }


  const handlePress = () => {
    setShowText(!showText);
  };

  const priority = useMemo(
    () =>
      calculatePriority(
        customer.usr_vip,
        new Date(order.order_date_of_ord),
      ),
    [customer, item],
  );

  const options = formatDate();



  const upOrder = () => {
    let nextStatus: "PENDING" | "DELIVERING" | "DELIVERED" | "CANCELED";

    // Cambiar el estado en función del estado actual
    switch (order.order_status) {
      case "PENDING":
        nextStatus = "DELIVERING";
        break;
      case "DELIVERING":
        nextStatus = "DELIVERED";
        break;
      case "DELIVERED":
        nextStatus = "CANCELED";
        break;
      case "CANCELED":
        nextStatus = "PENDING";
        break;
      default:
        nextStatus = "PENDING";
    }

    updateOrder.mutate({
      idDeliver: Number(user?.usr_id),
      idOrder: Number(order.order_id),
      status: nextStatus
    })
  }

  useEffect(() => {
    if (updateOrder.isSuccess) {
      setIsChange(true)
    }
    updateOrder.isError && console.log(updateOrder.error.message)

  }, [updateOrder.isSuccess, updateOrder.isError, priority])


  const image = require("~/assets/carrousel-test/default-user.png");
  return (
    <Link
      href={{
        pathname: "/(tabs)/productOrderDetails",
        params: { ...aux }
      }}
      asChild
    >
      <TouchableOpacity className="flex-row mx-1 my-2 px-1 shadow-sm rounded-xl" style={CustomStyles.card}>
        <View className="flex-1 rounded-xl">
          <View className="rounded-xl bg-transparent flex-row content-center items-center">
            <Image source={image} className="w-28 h-28" />
            <View className="flex-col justify-between mx-2 my-3 pr-3 flex-1 bg-transparent">
              <TouchableOpacity className="absolute top-0 right-0 w-9 h-9 rounded-full z-10 justify-center items-center"
                onPress={handlePress}
              >
                <View style={getCircleStyle(priority)} />
                {showText && (
                  <Text className="absolute -top-3 right-4 w-32 h-5">
                    {getPriorityText(priority)}
                  </Text>
                )}
              </TouchableOpacity>
              <Text className="font-bold uppercase text-xl ml-2" style={{ color: getStatusColor(order.order_status) }}>
                {formatStatus(order.order_status)}
              </Text>
              {orderdet?.order_det_recipe && (
                <Text className="text-sm font-medium pl-2" style={CustomStyles.recipeTetx}>
                  Requiere receta
                </Text>
              )}

              <ViewIconCard data={[order.order_date_of_ord.toLocaleDateString(options.localDate, options.options)]} icon="calendar-sharp" />
              <ViewIconCard data={[order.order_date_of_ord.toLocaleTimeString(options.localDate)]} icon="time-sharp" />
              <ViewIconCard data={[customer.profile.prf_name, customer.profile.prf_lastname]} icon="person-outline" />
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
                <View className="mr-2 bg-transparent">
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
            </View>

          </View>
          {order.order_status === 'PENDING' && (
            <View className="flex-row px-5 py-2 bg-transparent">
              <TouchableOpacity onPress={upOrder} style={CustomStyles.detailButtton}>
                <Text style={CustomStyles.buttontext}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </TouchableOpacity >
    </Link >
  );
}


