import { Image, StyleSheet, Touchable, TouchableOpacity } from "react-native";

import { Text, View } from "../../components/Themed";

export default function ProductOnDelivery(item: any) {
  const _item = item.item;
  const image = require("../../assets/carrousel-test/ibu.png");
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          marginVertical: 5,
          borderRadius: 8,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={image} style={styles.image} />
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
              {/* <Text style={styles.colorcustom}>{_item.brand}</Text> */}
              <Text style={[styles.colorcustom, styles.title]}>
                Prioridad: {_item.priority}
              </Text>
              {_item.require_recipe && (
                <Text style={[styles.colorcustom, styles.title]}>
                  Requiere receta
                </Text>
              )}
              <Text
                style={{
                  opacity: 0.5,
                  fontSize: 12,
                }}
              >
                {_item.date}
              </Text>
              <Text style={[styles.title]}>{_item.name_client}</Text>
              <Text style={{ fontSize: 14 }}>{_item.address}</Text>
              {_item.is_vip && (
                <Text
                  style={{
                    color: "green",
                    fontWeight: "500",
                  }}
                >
                  Cliente VIP
                </Text>
              )}
            </View>
          </View>

          <Text style={styles.money}>{formatMoney(_item.total)}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          gap: 12,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            paddingVertical: 12,
            backgroundColor: "#2c7379",
            flex: 1,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white" }}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            paddingVertical: 12,
            backgroundColor: "#f0a62f",
            flex: 1,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white" }}>Aceptar</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: "500",
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
