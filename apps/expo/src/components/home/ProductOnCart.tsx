import { Image, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";

export default function ProductOnCart(item: any) {
  const _item = item.item;
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 8,
      }}
    >
      <Image source={_item.image} style={styles.image} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginHorizontal: 10,
          flex: 1,
          paddingVertical: 15,
        }}
      >
        <View>
          <View>
            <Text style={styles.colorcustom}>{_item.brand}</Text>
            <Text style={[styles.colorcustom, styles.title]}>{_item.name}</Text>
          </View>
        </View>

        <Text style={styles.money}>{formatMoney(_item.price)}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Text style={styles.margin}>Cantidad: {_item.onCartQuantity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 20,
    fontWeight: "bold",
  },
  margin: {
    margin: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});

function formatMoney(number: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(number);
}
