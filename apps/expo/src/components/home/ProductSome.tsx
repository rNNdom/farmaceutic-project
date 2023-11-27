import * as React from "react";
import { Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import {
  Pressable,
  Text as ThemedText,
  View as ThemedView,
  View,
} from "../../components/Themed";
import { Product } from "~/utils/interface";
import { CustomStyles } from "~/styles/CustomStyles";

const ProductViewer = (_props: Product) => {
  const _item = _props;
  return (
    <Link
      href={{
        pathname: "/(tabs)/productDetail",
        params: _item,
      }}
      asChild
    >
      <TouchableOpacity >
        <ThemedView className="h-60 w-full mx-3 my-2 px-3 py-3 rounded-lg">
          <Image source={{ uri: _item.prod_image }} style={CustomStyles.img} />
          <View className="w-max bg-transparent rounded-2xl justify-end">
            <Text className="text-xs uppercase italic font-bold text-justify pl-1 max-w-max"
              style={CustomStyles.textBrand}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {_item.prod_brand}
            </Text>
            <Text className="text-sm uppercase text-justify pl-1 pb-2 min-w-max flex-shrink" style={CustomStyles.textProduct} numberOfLines={1} ellipsizeMode="tail">
              {_item.prod_name}
            </Text>
          </View>
        </ThemedView>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductViewer;

