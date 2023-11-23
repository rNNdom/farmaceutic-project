import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

import { Product } from "~/hooks/useProduct";
import { Text, View } from "../../components/Themed";

const CatItem = (data: Product) => {
  const _item = data;
  return (
    <Link
      href={{
        pathname: "/(tabs)/productDetail",
        params: data,
      }}
      asChild
    >
      <TouchableOpacity>
        <View style={styles.main}>
          <Image source={{ uri: data.prod_image }} style={styles.image} />
          <View style={styles.containertext}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {_item.prod_category}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CatItem;

const styles = StyleSheet.create({
  image: {
    backgroundColor: "#fff",
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  main: {
    width: 150,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 150,
    flexDirection: "row",
    justifyContent: "flex-end",
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
    textAlign: "center",
    paddingLeft: 5,
    paddingBottom: 10,
    width: "100%",
    flexShrink: 1,
  },
  containertext: {
    width: "100%",
    position: "relative",
    backgroundColor: "transparent",
    borderRadius: 20,
    justifyContent: "flex-end",
  },
});
