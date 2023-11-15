import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import ProductShort from "~/components/home/Product";
import useProductRepositories from "~/hooks/useProductRepositories";
import Header from "~/components/Header";

export default function ProductOrderDetail() {
  const _item = useRoute().params as any;

  const { productrepo, loading } = useProductRepositories(_item.data);

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={productrepo}
          ListHeaderComponent={<>
          <Header />
          </>}
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
