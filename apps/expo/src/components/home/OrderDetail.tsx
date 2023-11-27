import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

import { Text, View } from "../../components/Themed";
import { CustomStyles } from "~/styles/CustomStyles";
import { formatMoney } from "~/utils/formats";

const OrderProductDetail = ({ item, quantity }: any) => {

    const _item = item;
    return (
        <Link
            href={{
                pathname: "/(tabs)/productDetail",
                params: _item,
            }}
            asChild
        >
            <TouchableOpacity>
                <View className="flex-row mx-1 my-1 rounded-md">
                    <Image source={{ uri: _item.prod_image }} style={CustomStyles.imgCart} />
                    <View className="flex-col-reverse justify-between mx-3 my-4 flex-1">
                        <View className="w-full justify-start  bg-transparent flex-col rounded-xl  mb-3">
                            {_item.prod_recipe && (
                                <>
                                    <Text className="w-full pb-1 flex-shrink  items-center" style={CustomStyles.recipeTetx}>Requiere receta medica</Text>
                                </>
                            )}
                            <Text style={CustomStyles.textBrand}>{_item.prod_brand}</Text>
                            <Text className="text-xl font-bold w-full" style={CustomStyles.textProduct}>
                                {_item.prod_name}
                            </Text>
                            <Text className="font-bold text-xl" style={CustomStyles.textMoney}>{formatMoney(_item.prod_price)}</Text>
                        </View>
                    </View>
                    <View className="flex-1 justify-end items-end" style={CustomStyles.textMoney}>
                        <Text className="m-3 text-xl font-medium">Cantidad: {quantity}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};
export default OrderProductDetail;
