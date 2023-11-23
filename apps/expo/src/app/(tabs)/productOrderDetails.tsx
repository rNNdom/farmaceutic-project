import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import Header from "~/components/Header";
import ProductShort from "~/components/home/Product";
import useProduct from "~/hooks/useProduct";

export default function ProductOrderDetail() {
  const _item = useRoute().params as any;

  const { product, loading } = useProduct(_item.data);

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={product}
          ListHeaderComponent={
            <>
              <Header />
            </>
          }
          renderItem={({ item }) => <ProductShort {...item} />}
          keyExtractor={(item) => item.prod_id}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  home: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  current: {
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#000",
    marginHorizontal: 18,
    marginVertical: 8,
    opacity: 0.5,
  },
});
