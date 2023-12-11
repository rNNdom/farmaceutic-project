import * as React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { View } from "../../components/Themed";
import { Product } from "~/utils/interface";
import { CustomStyles } from "~/styles/CustomStyles";

function Brand(data: Product) {
  const _item = data;
  return (
    <Link
      href={{
        pathname: "/(tabs)/productDetail",
        params: data,
      }}
      asChild
    >
      <TouchableOpacity >
        <View className="w-40 h-40 py-2 px-2 flex-row justify-end">
          <Image source={{ uri: _item.prod_image }} style={CustomStyles.img} />
          <View className="w-full bg-transparent  justify-end relative">
            <Text className="text-sm font-medium uppercase items-center pl-1 pb-2 w-full flex-shrink" numberOfLines={1} ellipsizeMode="tail">
              {_item.prod_brand}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default Brand;

