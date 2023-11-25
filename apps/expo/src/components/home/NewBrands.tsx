import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Product } from "~/utils/interface";
import { Ionicons, Text, View } from "../../components/Themed";
import Brand from "./Brand";
import { api } from "~/utils/api";
import Loading from "../loading";

const NewBrands = () => {
  let selectedCategories: { [key: string]: boolean } = {};
  const getProduct = api.product.getAllProducts.useQuery();

  const _item = getProduct.data?.filter((product) => {
    // Si la categoría del producto ya ha sido seleccionada, excluye el producto
    if (selectedCategories[product.prod_brand]) {
      return false;
    }

    // Marca la categoría del producto como seleccionada
    selectedCategories[product.prod_brand] = true;

    // Incluye el producto
    return true;
  })
    .slice(0, 4);

  return (
    <>
      {getProduct.isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.main}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Nuevas marcas</Text>
              <TouchableOpacity style={styles.headerButton}>
                <Text>Ver todas</Text>
                <Ionicons name="chevron-forward-outline" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.app}>
              <FlatList
                horizontal
                data={_item}
                renderItem={({ item }) => <Brand key={item.prod_id} {...item} />}
                keyExtractor={(item) => item.prod_id.toString()}
              />
            </View>
          </View>
        </>
      )}


    </>
  );
};

export default NewBrands;

const styles = StyleSheet.create({
  main: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "transparent",
  },
  app: {
    gap: 10,
    paddingVertical: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
