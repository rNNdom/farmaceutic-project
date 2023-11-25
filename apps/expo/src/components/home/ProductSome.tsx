import * as React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import {
  Pressable,
  Text as ThemedText,
  View as ThemedView,
  View,
} from "../../components/Themed";
import { Products } from "~/utils/interface";

const ProductViewer = (_props: Products) => {
  const _item = _props;
  return (
    <Link
      href={{
        pathname: "/(tabs)/productDetail",
        params: _item,
      }}
      asChild
    >
      <TouchableOpacity>
        <ThemedView style={styles.main}>
          <Image source={{ uri: _item.prod_image }} style={styles.image} />
          <View style={styles.containertext}>
            <Text
              style={[styles.textBrand]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {_item.prod_brand}
            </Text>
            <Text style={[styles.text]} numberOfLines={1} ellipsizeMode="tail">
              {_item.prod_name}
            </Text>
          </View>
        </ThemedView>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductViewer;

const styles = StyleSheet.create({
  image: {
    backgroundColor: "#fff",
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  main: {
    height: 250,
    marginHorizontal: 12,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  containertext: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 20,
    justifyContent: "flex-end",
  },

  text: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#1969a3",
    textAlign: "justify",
    paddingLeft: 5,
    paddingBottom: 10,
    width: "100%",
    flexShrink: 1, // Añade esta línea
  },
  textBrand: {
    fontSize: 10,
    textTransform: "uppercase",
    fontStyle: "italic",
    color: "#000",
    textAlign: "justify",
    paddingLeft: 5,
    width: "100%",
  },
});
