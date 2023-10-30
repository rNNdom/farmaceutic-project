import { StyleSheet, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import StarRating from "react-native-star-rating-widget";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { CartContext } from "../context";

export default function Product(item: any) {
  const { addToCart } = useContext(CartContext);

  function handleAddToCart() {
    addToCart(item.item);
  }

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
          paddingVertical: 14,
        }}
      >
        <View>
          <View>
            <Text style={styles.colorcustom}>{_item.brand}</Text>
            <Text style={[styles.colorcustom, styles.title]}>{_item.name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <StarRating
              rating={_item.reviews}
              onChange={() => {}}
              starSize={20}
              starStyle={{ marginHorizontal: 0 }}
            />
            <Text>{_item.reviewsCount}</Text>
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
        <TouchableOpacity
          style={{
            backgroundColor: "#1969a3",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: "center",
            margin: 10,
          }}
          onPress={handleAddToCart}
        >
          <Text style={{ color: "#fff" }}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
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
});

function formatMoney(number: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(number);
}
