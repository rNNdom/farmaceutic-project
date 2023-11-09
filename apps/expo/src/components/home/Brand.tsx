import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { View } from "../../components/Themed";

function Brand(item: any) {
  const _item = item.item;
  return (
    <TouchableOpacity>
      <View style={styles.main}>
        <Image source={_item.image} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

export default Brand;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  main: {
    width: 150,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 150,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 8,
  },
});
