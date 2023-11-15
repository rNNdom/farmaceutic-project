import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { Product } from "~/hooks/useProductRepositories";
import { Ionicons, Text, View } from "../../components/Themed";
import CatItem from "./CatItem";

const ViewCategories = ({ data }: { data: Product[] }) => {
  let selectedCategories: { [key: string]: boolean } = {};

  const _item = data
    .filter((product) => {
      // Si la categoría del producto ya ha sido seleccionada, excluye el producto
      if (selectedCategories[product.prod_category]) {
        return false;
      }

      // Marca la categoría del producto como seleccionada
      selectedCategories[product.prod_category] = true;

      // Incluye el producto
      return true;
    })
    .slice(0, 4);

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Categorias</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text>Ver todas</Text>
          <Ionicons name="chevron-forward-outline" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.app}>
        <FlatList
          horizontal
          data={_item}
          renderItem={({ item }) => <CatItem key={item.prod_id} {...item} />}
          keyExtractor={(item) => item.prod_id}
        />
      </View>
    </View>
  );
};

export default ViewCategories;

const styles = StyleSheet.create({
  main: {
    padding: 10,
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
