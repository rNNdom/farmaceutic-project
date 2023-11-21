import { SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { Text, View } from "../../components/Themed";

const calculatePriority = (customer: User | undefined, orderDate: Date) => {
  if (customer?.usr_vip) {
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

const fetchOrderdet = async (_item: { order_customer: number; order_id: number; }, setOrderdet: { (value: SetStateAction<OrderDetails | undefined>): void; (arg0: any): void; }, setCustomer: { (value: SetStateAction<{ customer: User | undefined; prof: Profile | undefined; } | undefined>): void; (arg0: { customer: any; prof: any; }): void; }) => {
  try {
    const responseuser = await getUser();
    const responseProf = await getProfile();
    const response = await getOrderDet();
    const datauser = responseuser.find(
      (item: User) => item.usr_id == _item.order_customer,
    );
    const data = response.find(
      (item: OrderDetails) => item.order_det_id === _item.order_id,
    );
    const dataProf = responseProf.find(
      (item: Profile) => item.prf_id == datauser.usr_profile,
    );
    setOrderdet(data);
    setCustomer({ customer: datauser, prof: dataProf });
  } catch (error) {
    console.error("Failed to fetch orderdet", error);
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

export default function ProductOnDelivery(item: any) {
  const _item = item.item;
  const [orderdet, setOrderdet] = useState<OrderDetails>();
  const [customer, setCustomer] = useState<
    { customer: User | undefined; prof: Profile | undefined } | undefined
  >();
  const [showText, setShowText] = useState(false);

  const handlePress = () => {
    setShowText(!showText);
  };

  const priority = useMemo(
    () =>
      calculatePriority(
        customer?.customer,
        new Date(_item?.order_date_of_order),
      ),
    [customer, _item],
  );

  useEffect(() => {
    fetchOrderdet(_item, setOrderdet, setCustomer);
  }, [_item]);

  const image = require("~/assets/carrousel-test/default-user.png");
  return (
    <Link
      href={{ pathname: "/(repartidor)/productOnDeliveryDetails" }}
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
                  {orderdet?.order_recipe && (
                    <Text style={[styles.colorcustom, styles.title]}>
                      Requiere receta
                    </Text>
                  )}
                  <Text style={styles.date}>{_item?.order_date_of_order}</Text>
                  <Text style={[styles.title]}>
                    {customer?.prof?.prf_name} {customer?.prof?.prf_lastname}
                  </Text>
                  <Text style={styles.address}>{orderdet?.order_location}</Text>
                  {customer?.customer?.usr_vip && (
                    <Text style={styles.vip}>Cliente VIP</Text>
                  )}
                </View>
              </View>
              <Text style={styles.money}>
                {formatMoney(orderdet?.order_det_total)}
              </Text>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.buttonText}>Detalles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
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
