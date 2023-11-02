import * as React from "react";
import { Text, View } from "../../components/Themed";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
function ProductViewer(item: any) {
  const _item = item.item;
  return (
    <TouchableOpacity>
      <View style={styles.main}>
        <Image source={_item.image} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

export default ProductViewer;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  main: {
    width: "100%",
    height: 175,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    // mayusculas
    textTransform: "uppercase",
  },
});
