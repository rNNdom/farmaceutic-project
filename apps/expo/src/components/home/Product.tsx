import { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";
import { Link } from "expo-router";

import { Pressable, Text } from "../../components/Themed";
import { CartContext } from "../context";

export interface Product {
  name: string;
  image: any;
  price: number;
  brand: string;
  reviews: number;
  reviewsCount: number;
  _id: number;
  dateExpiration: string;
  datePackage: string;
  status: string;
  quantity: number;
  description: string;
}

export interface ProductProps {
  item: Product;
}

export default function Product(item: Readonly<ProductProps>) {
  const { addToCart } = useContext(CartContext);

  function handleAddToCart() {
    addToCart(item.item);
  }

  const _item = item.item;
  return (
    <Link
      href={{
        pathname: "/(tabs)/productDetail",
        params: _item,
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <Image source={_item.image} style={styles.image} />
        <View style={styles.vewimage}>
          <View style={styles.containerdesc}>
            <View>
              <Text style={styles.colorcustom}>{_item.brand}</Text>
              <Text style={[styles.colorcustom, styles.title]}>
                {_item.name}
              </Text>
            </View>
            <View style={styles.reveiw}>
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
              width: 100,
              height: "auto",
            }}
            onPress={handleAddToCart}
          >
            <Text style={{ color: "#fff" }}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Link>
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
    width: "100%",
    height: "auto",
    display: "flex",
    flexWrap: "wrap",
  },
  containerdesc: {
    alignItems: "flex-start",
    width: "100%",
    height: "auto",
    flexDirection: "column",
    alignContent: "space-around",
    display: "flex",
  },
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    display: "flex",
  },
  vewimage: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 10,
    flex: 1,
    paddingVertical: 14,
  },
  reveiw: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

function formatMoney(number: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(number);
}
