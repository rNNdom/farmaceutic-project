import { SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { Order } from "~/utils/interface";
import { Ionicons, Text, View } from "../../components/Themed";
import { api } from "~/utils/api";
import { UserContext } from "../userContext";

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

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'PENDING':
        return 'yellow';
      case 'DELIVERING':
        return '#1969a3'; // colorcustom
      case 'DELIVERED':
        return 'green';
      case 'CANCELED':
        return 'red';
      default:
        return '#1969a3'; // colorcustom
    }
  };

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
        <View style={styles.container}>
          <View style={styles.row}>
            <Image source={image} style={styles.image} />
            <View style={styles.column}>
              <View>
                <View>
                  <TouchableOpacity
                    onPress={handlePress}
                    style={styles.pressableArea}
                  >
                    <View style={getCircleStyle(priority)} />
                    {showText && (
                      <Text style={styles.priorityText}>
                        {getPriorityText(priority)}
                      </Text>
                    )}
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.settingtext,
                      {
                        fontWeight: "500",
                        gap: 12,
                        color: getStatusColor(order.order_status),
                      }
                    ]}
                  >
                    {order.order_status}
                  </Text>
                  {orderdet?.order_det_recipe && (
                    <Text style={[styles.colorcustom, styles.title]}>
                      Requiere receta
                    </Text>
                  )}
                  <View style={[
                    {
                      gap: 12,
                      flexDirection: "row",
                    },
                  ]}>
                    <View >
                      <Ionicons
                        name="calendar-sharp"
                        size={15}
                        style={{
                          opacity: 0.3,
                        }}
                      />
                    </View>
                    <Text
                      style={styles.date}
                    >
                      {order.order_date_of_ord.toLocaleDateString("es-419", options)}
                    </Text>
                  </View>
                  <View style={[
                    {
                      gap: 12,
                      flexDirection: "row",
                    },
                  ]}>
                    <View >
                      <Ionicons
                        name="time-sharp"
                        size={15}
                        style={{
                          opacity: 0.3,
                        }}
                      />
                    </View>
                    <Text
                      style={styles.date}
                    >
                      {order.order_date_of_ord.toLocaleTimeString("es-419")}
                    </Text>
                  </View>
                  <Text style={[styles.title]}>
                    {customer.profile.prf_name} {customer.profile.prf_lastname}
                  </Text>
                  <Text style={styles.address}>{order.order_location}</Text>
                  {customer.usr_vip && (
                    <Text style={styles.vip}>Cliente VIP</Text>
                  )}
                </View>
              </View>
              <Text style={styles.money}>
                {formatMoney(Number(orderdet?.order_det_total))}
              </Text>
              <View style={[styles.buttonRow, styles.margin]}>
                <Link href={{
                  pathname: "/(repartidor)/productOnDeliveryDetails",
                  params: { ...orderdet, ...customer }
                }} asChild
                >
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.buttonText}>Detalles</Text>
                  </TouchableOpacity>
                </Link>

                <TouchableOpacity onPress={upOrder} style={styles.acceptButton}>
                  <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

function formatMoney(number: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(number);
}

const getCircleStyle = (priority: number) => {
  switch (priority) {
    case 0:
      return styles.greencicle;
    case 1:
      return styles.yellowcicle;
    case 2:
      return styles.orangecicle;
    case 3:
      return styles.redcicle;
    default:
      return styles.greencicle;
  }
};

const cicle = {
  position: "absolute",
  top: 0,
  right: 0,
  width: 20,
  height: 20,
  borderRadius: 10,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    alignContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    alignContent: "center",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 10,
    flex: 1,
    paddingVertical: 15,
  },
  image: {
    width: 120,
    height: 120,
  },
  colorcustom: {
    color: "#1969a3",
  },
  money: {
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  margin: {
    margin: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  date: {
    opacity: 0.5,
    fontSize: 12,
  },
  address: {
    fontSize: 14,
  },
  vip: {
    color: "green",
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    gap: 12,
    alignContent: "center",
    alignItems: "center",
  },
  detailsButton: {
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#2c7379",
    flex: 1,
    borderRadius: 8,
  },
  settingtext: {
    fontSize: 18,
    fontWeight: "400",
  },
  acceptButton: {
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#f0a62f",
    flex: 1,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
  },
  redcicle: {
    ...cicle,
    backgroundColor: "red",
  },
  greencicle: {
    ...cicle,
    backgroundColor: "green",
  },
  yellowcicle: {
    ...cicle,
    backgroundColor: "yellow",
  },
  orangecicle: {
    ...cicle,
    backgroundColor: "orange",
  },
  pressableArea: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 25, // Ajusta estos valores según tus necesidades
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  priorityText: {
    position: "absolute",
    top: -20,
    right: -5, // Ajusta estos valores según tus necesidades
    width: 120,
    height: 20,
    backgroundColor: "withe",
    color: "black",
  },
});
