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
          <View className="px-1 bg-transparent" >
            <View className="flex-row justify-between items-center bg-transparent">
              <Text className="text-sm font-bold" >Nuevas marcas</Text>
              <TouchableOpacity className="flex-row items-center gap-2">
                <Text>Ver todas</Text>
                <Ionicons name="chevron-forward-outline" size={20} />
              </TouchableOpacity>
            </View>
            <View className=" bg-transparent flex-row">
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
