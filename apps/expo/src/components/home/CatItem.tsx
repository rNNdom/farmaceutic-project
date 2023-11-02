import * as React from "react";
import { Text, View } from "../../components/Themed";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function CatItem(item: any) {
  const _item = item.item;
  return (
    <TouchableOpacity>
      <View style={styles.main}>
        <Image source={_item.image} style={styles.image} />
        <Text style={styles.text}>{_item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CatItem;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "80%",
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
  text: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
});
