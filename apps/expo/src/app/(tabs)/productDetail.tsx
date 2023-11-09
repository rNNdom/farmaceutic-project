import { useContext, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";
import { useRoute } from "@react-navigation/native";

import { CartContext } from "~/components/context";
import Header from "~/components/Header";
import { formatMoney, Product } from "~/components/home/Product";
import { Text, View } from "../../components/Themed";

export default function ProductDetail() {
  const _item = useRoute().params as Product;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  function handleAddToCart() {
    addToCart(_item, quantity);
  }
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <Header />
      <ScrollView
        style={{
          paddingHorizontal: 12,
        }}
      >
        <Image
          source={_item.image}
          style={{ width: "100%", height: 200, marginVertical: 50 }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={[styles.title, styles.colorcustom]}>{_item.name}</Text>
            <Text
              style={[
                styles.colorcustom,
                {
                  fontSize: 20,
                  fontWeight: "400",
                  opacity: 0.7,
                },
              ]}
            >
              {_item.brand}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
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
        <View
          style={{
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginVertical: 20,
            }}
          >
            {formatMoney(_item.price)}
          </Text>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                marginBottom: 8,
              }}
            >
              Cantidad
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 30,
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  style={{
                    backgroundColor: "#cececece",
                    opacity: quantity > 1 ? 1 : 0.3,
                    paddingHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 24,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 20,
                    fontWeight: "500",
                  }}
                >
                  {quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (quantity < _item.quantity) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  style={{
                    backgroundColor: "#cececece",
                    paddingHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                    opacity: quantity < _item.quantity ? 1 : 0.3,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#1969a3",
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              marginVertical: 12,
              height: "auto",
            }}
            onPress={handleAddToCart}
          >
            <Text style={{ color: "#fff" }}>Agregar al carrito</Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              marginBottom: 8,
            }}
          >
            Descripcion
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginBottom: 8,
              opacity: 0.7,
            }}
          >
            {_item.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  colorcustom: {
    color: "#1969a3",
  },
});
