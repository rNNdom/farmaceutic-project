import * as React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Text, View } from "../../components/Themed";
import { Product } from "~/utils/interface";
import { CustomStyles } from "~/styles/CustomStyles";

const CatItem = (data: Product) => {
  const _item = data;
  return (
    <Link
      href={{
        pathname: "/(tabs)/productDetail",
        params: data,
      }}
      asChild
    >
      <TouchableOpacity>
        <View className="w-36 py-2 px-2 h-36 flex-row justify-end rounded-lg" >
          <Image source={{ uri: data.prod_image }} style={CustomStyles.img} />
          <View className="w-full relative bg-transparent rounded-3xl justify-end">
            <Text className="text-sm font-medium uppercase text-center pl-1 pb-2 w-full flex-shrink" numberOfLines={1} ellipsizeMode="tail">
              {_item.prod_category}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CatItem;


