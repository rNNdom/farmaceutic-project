import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import useOrderDetRepositories from "~/hooks/useOrderDetRepositories";
import useProfileRepositories from "~/hooks/useProfileRepositories";
import useUserRepositories from "~/hooks/useUserRepositories";
import { Text, View } from "../Themed";

export default function ProductOnDelivery(props: any) {
  const _item = props.data;
  const customer = props.user;
  const { orderdet } = useOrderDetRepositories(_item.order_details);
  const { user } = useUserRepositories(_item.order_delivery);
  const { profile } = useProfileRepositories(user?.usr_profile);
  return (
    <Link
      href={{
        pathname: "/(tabs)/productOrderDetails",
        params: { data: orderdet?.order_det_prod as number[] },
      }}
      asChild
    >
      <TouchableOpacity>
        <View style={[styles.container]}>
          <View style={[styles.row]}>
            <View style={[styles.column, styles.buttonRow]}>
              {customer.is_vip && <Text style={styles.vip}>Cliente VIP</Text>}
            </View>
            <View style={[styles.column, styles.buttonRow]}>
              {orderdet?.order_recipe ? (
                <View style={styles.greenCircle}></View>
              ) : (
                <View style={styles.redCircle}></View>
              )}
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={[]}>
                <Text style={[styles.title]}>Fecha</Text>
                <Text style={styles.text}>{_item.order_date_of_order}</Text>
                <View>
                  <Text style={[styles.title]}>Repartidor</Text>
                  <Text style={[styles.text]}>
                    {profile?.prf_name} {profile?.prf_lastname}
                  </Text>
                </View>
                <Text style={[styles.title]}>Direccción</Text>
                <Text style={[styles.text]}>{orderdet?.order_location}</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              {
                // position: "absolute",
                padding: 10,
                gap: 10,
                flexDirection: "row-reverse",
                alignContent: "flex-end",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                // flex: 1,
              },
            ]}
          >
            <Text style={styles.money}>
              {formatMoney(orderdet?.order_det_total as number)}
            </Text>
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

const commonContainer = {
  marginHorizontal: 10,
  marginVertical: 5,
  borderRadius: 8,
  alignItems: "center",
};

const commonButton = {
  alignItems: "center",
  paddingVertical: 12,
  flex: 1,
  borderRadius: 8,
};

const colors = {
  custom: "#1969a3",
  green: "green",
  detailsButton: "#2c7379",
  acceptButton: "#f0a62f",
  white: "white",
};

const styles = StyleSheet.create({
  container: {
    ...commonContainer,
  },
  row: {
    ...commonContainer,
    flexDirection: "row",
    alignContent: "center",
  },
  column: {
    flexDirection: "column",
    marginHorizontal: 10,
    flex: 1,
    paddingVertical: 15,
  },
  image: {
    width: 120,
    height: 120,
  },
  colorcustom: {
    color: colors.custom,
  },
  money: {
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    // color: colors.custom,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.custom,
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
    color: colors.green,
    fontWeight: "500",
  },
  buttonRow: {
    justifyContent: "space-around",
    gap: 100,
    flexDirection: "row-reverse",
  },
  buttonText: {
    color: colors.white,
  },
  greenCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  redCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});

function useProfilebyIdRepositories(order_delivery: any): { user: any } {
  throw new Error("Function not implemented.");
}
