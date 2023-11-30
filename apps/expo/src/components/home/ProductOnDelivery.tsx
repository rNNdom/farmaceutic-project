import { SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { Order } from "~/utils/interface";
import { Ionicons, Text, View } from "../../components/Themed";
import { api } from "~/utils/api";
import { UserContext } from "../userContext";
import { CustomColors, CustomStyles, getCircleStyle, getStatusColor } from "~/styles/CustomStyles";
import { formatDate, formatMoney } from "~/utils/formats";

export const calculatePriority = (isVip: boolean, orderDate: Date) => {
  if (isVip) {
    return 3;
  }

  const now = new Date();
  const differenceInMinutes =
    (now.getTime() - orderDate.getTime()) / (1000 * 60);

  if (differenceInMinutes < 7) {
    return 0;
  } else if (differenceInMinutes < 15) {
    return 1;
  } else if (differenceInMinutes < 30) {
    return 2;
  } else {
    return 3;
  }
};

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
    updateOrder.mutate({
      idDeliver: Number(user?.usr_id),
      idOrder: Number(order.order_id),
      status: 'DELIVERING'
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
        pathname: "/(repartidor)/productOnDeliveryDetails",
        params: { ...orderdet, ...customer }
      }}
      asChild
    >
      <TouchableOpacity>
        <View className="flex-row mx-1 my-1 rounded-md content-center">
          <View className="flex-row mx-1 my-1 rounded-md content-center items-center">
            <Image source={image} className="w-28 h-28" />
            <View className="flex-col justify-between mx-3 my-4 flex-auto">
              <View>
                <View>
                  <TouchableOpacity
                    onPress={handlePress}
                    className="absolute top-0 right-0 w-6 h-6 justify-center items-center z-10">
                    <View style={getCircleStyle(priority)} />
                    {showText && (
                      <Text className="absolute -top-5 -right-1 w-32 h-5" style={CustomStyles.priorityText}>
                        {getPriorityText(priority)}
                      </Text>
                    )}
                  </TouchableOpacity>
                  <Text className="text-xl font-bold"
                    style={{ color: getStatusColor(order.order_status), }}
                  >
                    {order.order_status}
                  </Text>
                  {orderdet?.order_det_recipe && (
                    <Text className="text-sm font-medium" style={CustomStyles.recipeTetx}>
                      Requiere receta
                    </Text>
                  )}
                  <View className="gap-3 flex-row mt-1">
                    <View >
                      <Ionicons
                        name="calendar-sharp"
                        size={15}
                        style={{
                          opacity: 0.3,
                        }}
                      />
                    </View>
                    <Text className="opacity-50 text-xs">
                      {order.order_date_of_ord.toLocaleDateString(options.localDate, options.options)}
                    </Text>
                  </View>
                  <View className="gap-3 mt-1 mb-auto flex-row">
                    <View >
                      <Ionicons
                        name="time-sharp"
                        size={15}
                        style={{
                          opacity: 0.3,
                        }}
                      />
                    </View>
                    <Text className="opacity-50 text-xs">
                      {order.order_date_of_ord.toLocaleTimeString(options.localDate)}
                    </Text>
                  </View>
                  <Text className="text-lg font-medium" style={CustomStyles.textBrand}>
                    {customer.profile.prf_name} {customer.profile.prf_lastname}
                  </Text>
                  <Text className="text-xs font-bold">{order.order_location}</Text>
                  {customer.usr_vip && (
                    <Text style={CustomStyles.isVip}>Cliente VIP</Text>
                  )}
                </View>
              </View>
              <Text style={CustomStyles.textMoney}>
                {formatMoney(Number(orderdet?.order_det_total))}
              </Text>
              <View className="flex-row justify-between mx-1 gap-3 mt-2 content-center items-center flex-initial">
                <Link href={{
                  pathname: "/(repartidor)/productOnDeliveryDetails",
                  params: { ...orderdet, ...customer }
                }} asChild
                >
                  <TouchableOpacity style={CustomStyles.detailButtton}>
                    <Text style={CustomStyles.buttontext}>Detalles</Text>
                  </TouchableOpacity>
                </Link>

                <TouchableOpacity onPress={upOrder} style={CustomStyles.cancelButton}>
                  <Text style={CustomStyles.buttontext}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}




const cicle = {
  position: "absolute",
  top: 0,
  right: 0,
  width: 20,
  height: 20,
  borderRadius: 10,
};

