import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ListCatHeader from "./ListCatHeader";
import ProductShort from "./Product";
import { api } from "~/utils/api";
import Loading from "../loading";

export default function ListProducts() {
  const getProduct = api.product.getAllProducts.useQuery();

  const uniqueCategories = Array.from(new Set(getProduct.data?.map(product => product.prod_category)));


  return (
    <>
      {getProduct.isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={getProduct.data}
          ListHeaderComponent={
            <>
              <ListCatHeader data={uniqueCategories} />
            </>
          }
          renderItem={({ item }) => <ProductShort {...item} />}
          keyExtractor={(item) => item.prod_id.toString()}
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
