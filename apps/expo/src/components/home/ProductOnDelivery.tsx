import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../../components/Themed";

export default function ProductOnDelivery(item: any) {
  const _item = item.item;
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
                Prioridad: {_item.priority}
              </Text>
              {_item.require_recipe && (
                <Text style={[styles.colorcustom, styles.title]}>
                  Requiere receta
                </Text>
              )}
              <Text style={styles.date}>{_item.date}</Text>
              <Text style={[styles.title]}>{_item.name_client}</Text>
              <Text style={styles.address}>{_item.address}</Text>
              {_item.is_vip && <Text style={styles.vip}>Cliente VIP</Text>}
            </View>
          </View>
          <Text style={styles.money}>{formatMoney(_item.total)}</Text>
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
