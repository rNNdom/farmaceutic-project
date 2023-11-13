import React, {useContext, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";
import { useRoute } from "@react-navigation/native";

import { CartContext } from "~/components/context";
import Header from "~/components/Header";
import { formatMoney } from "~/components/home/Product";
import { commonStyles, componentStyles } from "~/styles/mystyle";
import { Product } from "~/hooks/useProductRepositories";
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
          source={{ uri: _item.prod_image }}
          style={componentStyles.image}
        />
        <View
          style={[
            commonStyles.container,
            {
              justifyContent: "space-between",
            },
          ]}
        >
          <View>
            <Text style={[componentStyles.title, componentStyles.colorcustom]}>
              {_item.prod_name}
            </Text>
            <Text style={[componentStyles.colorcustom, componentStyles.brand]}>
              {_item.prod_brand}
            </Text>
          </View>
          <View style={[commonStyles.container, { gap: 7 }]}>
            <StarRating
              rating={_item.prod_reviews}
              onChange={() => {}}
              starSize={20}
              starStyle={{ marginHorizontal: 0 }}
            />
            <Text>{_item.prod_reviews}</Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 16,
          }}
        >
          <Text style={componentStyles.price}>
            {formatMoney(_item.prod_price)}
          </Text>
          <View style={commonStyles.spaceBetween}>
            <Text style={[componentStyles.text, { marginBottom: 8 }]}>
              Cantidad
            </Text>
            <View
              style={[commonStyles.container, commonStyles.quantityContainer]}
            >
              <View style={[commonStyles.container, { gap: 5 }]}>
                <TouchableOpacity
                  onPress={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  style={[
                    commonStyles.container,
                    commonStyles.containerquantity,
                    {
                      opacity: quantity > 1 ? 1 : 0.3,
                    },
                  ]}
                >
                  <Text style={componentStyles.textBold}>-</Text>
                </TouchableOpacity>
                <Text style={componentStyles.textPadding}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (quantity < _item.prod_quantity) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  style={[
                    commonStyles.container,
                    commonStyles.containerquantity,
                    {
                      borderRadius: 50,
                      opacity: quantity < _item.prod_quantity ? 1 : 0.3,
                    },
                  ]}
                >
                  <Text
                    style={[
                      componentStyles.text,
                      {
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[commonStyles.button]}
            onPress={handleAddToCart}
          >
            <Text style={{ color: "#fff" }}>Agregar al carrito</Text>
          </TouchableOpacity>

          <Text style={componentStyles.descriptionTitle}>Descripcion</Text>
          <Text style={componentStyles.productDetail}>
            {_item.prod_detail} {_item.prod_tablet}
          </Text>
          <Text style={componentStyles.productDescription}>
            {_item.prod_description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
