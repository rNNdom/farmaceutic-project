import * as React from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, Text, View } from "../../components/Themed";
import CatItem from "./CatItem";
import { api } from "~/utils/api";
import Loading from "../loading";

const ViewCategories = () => {
  let selectedCategories: { [key: string]: boolean } = {};

  const getProduct = api.product.getAllProducts.useQuery();


  const _item = getProduct.data?.filter((product) => {
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
    <>
      {getProduct.isLoading ? (
        <Loading />
      ) : (
        <>
          <View className="p-3">
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-xl">Categorias</Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text>Ver todas</Text>
                <Ionicons name="chevron-forward-outline" size={20} />
              </TouchableOpacity>
            </View>
            <View className="gap-3 px-3 bg-transparent flex-row">
              <FlatList
                horizontal
                data={_item}
                renderItem={({ item }) => <CatItem key={item.prod_id} {...item} />}
                keyExtractor={(item) => item.prod_id.toString()}
              />
            </View>
          </View>
        </>
      )}


    </>
  );
};

export default ViewCategories;

