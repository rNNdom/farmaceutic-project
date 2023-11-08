import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import _Product from "../../utils/MOCK_DATA.json";
import ListCatHeader from "./ListCatHeader";
import Product from "./Product";

export default function ListProducts() {
  const data = _Product.map((item) => {
    return {
      _id: item.prod_id,
      name: item.prod_name,
      image: item.prod_image,
      price: item.prod_price,
      brand: item.prod_brand,
      reviews: item.prod_reviews,
      reviewsCount: item.prod_reviews,
      dateExpiration: item.prod_date_expiration,
      datePackage: item.prod_date_package,
      status: item.prod_status,
      quantity: item.prod_quantity,
      description: item.prod_description,
    };
  });

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
    <FlatList
      data={data}
      ListHeaderComponent={
        <>
          <ListCatHeader data={types} />
        </>
      }
      renderItem={({ item }) => <Product item={item} />}
      keyExtractor={(item) => item._id.toString()}
    />
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
  home: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  current: {
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 18,
    marginVertical: 8,
    opacity: 0.5,
  },
});
