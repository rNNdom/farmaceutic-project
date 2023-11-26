import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Order, ProductOrderDetail } from "~/utils/interface";
import { Ionicons, Text, View } from "../Themed";
import { api } from "~/utils/api";




export default function ProductOrder({ setIsDeleted, ...item }) {
  const [showText, setShowText] = useState(false);
  const deleteOrders = api.orders.deleteOrders.useMutation();
  const order = item as Order;
  const customer = order.user;
  const orderdet = order.OrderDetail.at(0);
  const delivery = order.delivery_user;


  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };


  const handlePress = () => {
    setShowText(!showText);
  };

  const getRecipeText = (recipe: boolean) => {
    if (recipe) {
      return "Con receta";
    } else {
      return "Sin receta";
    }
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

  return (
    <Link
      href={{
        pathname: "/(tabs)/productOrderDetails",
        params: { ...orderdet },
      }}
      asChild
    >
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.column}>
              <View>
                <View>
                  <TouchableOpacity
                    onPress={handlePress}
                    style={styles.pressableArea}
                  >
                    <View style={getCircleStyle(orderdet?.order_det_recipe)} />
                    {showText && (
                      <Text style={styles.priorityText}>
                        {getRecipeText(orderdet?.order_det_recipe)}
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
                  <View style={[
                    {
                      gap: 12,
                      flexDirection: "row",
                    },
                  ]}>
                    <View >
                      <Ionicons
                        name="calendar-sharp"
                        size={26}
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
                        size={26}
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
                  {delivery && (
                    <Text style={[styles.title]}>
                      Repartidor: {delivery.profile?.prf_name} {delivery.profile?.prf_lastname}
                    </Text>
                  )}
                  <Text style={styles.address}>{order.order_location}</Text>
                  {customer.usr_vip && (
                    <Text style={styles.vip}>Cliente VIP</Text>
                  )}
                </View>
              </View>
              <Text style={styles.money}>
                {formatMoney(orderdet?.order_det_total)}
              </Text>
              <View style={styles.row}>
                <Link href={{
                  pathname: "/(tabs)/productOrderDetails",
                  params: { ...orderdet },
                }}
                  asChild>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.buttonText}>Detalles</Text>
                  </TouchableOpacity>
                </Link>
                {order.order_status === "PENDING" && (
                  <TouchableOpacity onPress={deleteOrder} style={styles.acceptButton}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                )}
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

const getCircleStyle = (recipe: boolean) => {
  if (recipe) {
    return styles.redcicle;
  } else {
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

const colors = {
  custom: "#1969a3",
  green: "green",
  detailsButton: "#2c7379",
  acceptButton: "#f0a62f",
  white: "white",
  red: ""
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
    fontWeight: "bold",
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
  acceptButton: {
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#f0a62f",
    flex: 1,
    borderRadius: 8,
  },
  settingtext: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
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
    width: 30, // Ajusta estos valores según tus necesidades
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.custom,
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


function useProfilebyIdRepositories(order_delivery: any): { user: any } {
  throw new Error("Function not implemented.");
}