import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import useProductRepositories from "~/hooks/useProductRepositories";
import ListCatHeader from "./ListCatHeader";
import ProductShort from "./Product";

export default function ListProducts() {
  const { productrepo, loading } = useProductRepositories(null);

  const types = [
    {
      name: "colonias",
      key: "colonias",
    },
    {
      name: "corporal",
      key: "corporal",
    },
    {
      name: "Cosmetica Natural",
      key: "cosmetica-natural",
    },
    {
      name: "Cuidado Capilar",
      key: "cuidado-capilar",
    },
    {
      name: "Cuidado Facial",
      key: "cuidado-facial",
    },
  ];

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={productrepo}
          ListHeaderComponent={
            <>
              <ListCatHeader data={types} />
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
