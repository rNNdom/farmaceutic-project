import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { OrderDetails, Profile, User } from "~/utils/interface";
import { getOrderDet, getProfile, getUser } from "~/utils/service";
import { Text, View } from "../../components/Themed";

export default function ProductOnDelivery(item: any) {
  const _item = item.item;
  const [orderdet, setOrderdet] = useState<OrderDetails>();
  const [customer, setCustomer] = useState<
    { customer: User | undefined; prof: Profile | undefined } | undefined
  >();

  useEffect(() => {
    const fetchOrderdet = async () => {
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
    fetchOrderdet();
  }, [_item]);

  const image = require("~/assets/carrousel-test/Ibuprofeno_10.png");
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={image} style={styles.image} />
        <View style={styles.column}>
          <View>
            <View>
              {/* <Text style={styles.colorcustom}>{_item.brand}</Text> */}
              <Text style={[styles.colorcustom, styles.title]}>
                Prioridad: {orderdet?.priority}
              </Text>
              {orderdet?.order_recipe && (
                <Text style={[styles.colorcustom, styles.title]}>
                  Requiere receta
                </Text>
              )}
              <Text style={styles.date}>{orderdet?.order_det_start_date}</Text>
              <Text style={[styles.title]}>{customer?.prof?.prf_name} {customer?.prof?.prf_lastname}</Text>
              <Text style={styles.address}>{orderdet?.order_location}</Text>
              {customer?.customer?.usr_vip && <Text style={styles.vip}>Cliente VIP</Text>}
            </View>
          </View>
          <Text style={styles.money}>{formatMoney(orderdet?.order_det_total)}</Text>
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
  );
}

function formatMoney(number: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(number);
}

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
});
