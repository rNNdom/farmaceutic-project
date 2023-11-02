import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import Header from "~/components/Header";
import { Product } from "~/components/home/Product";
import { Text, View } from "../../components/Themed";

export default function ProductDetail() {
  const _item = useRoute().params as Product;

  // if (!_item) {
  //   return <Text>Invalid product</Text>;
  // }

  return (
    <View>
      <Header />
      <Text style={styles.title}>{_item.name}</Text>
      <Text>{_item.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
