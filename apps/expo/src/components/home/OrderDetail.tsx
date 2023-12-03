import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

import { Text, View } from "../../components/Themed";
import { CustomColors, CustomStyles } from "~/styles/CustomStyles";
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
            <TouchableOpacity className="flex-col w-full px-1 py-1 mx-1 gap-1 container" style={{ backgroundColor: CustomColors.Anti_flash_white }}>
                <View className="flex-row rounded-lg px-1" style={{ backgroundColor: CustomColors.White }}>
                    <Image source={{ uri: _item.prod_image }} style={CustomStyles.imgCart} />
                    <View className="pl-1 justify-center bg-transparent">
                        <View className="bg-transparent">
                            {_item.prod_recipe && (
                                <>
                                    <Text style={CustomStyles.recipeTetx}>Requiere receta medica</Text>
                                </>
                            )}
                            <Text style={CustomStyles.textBrand}>{_item.prod_brand}</Text>
                            <Text style={CustomStyles.textProduct}>
                                {_item.prod_name}
                            </Text>
                            <Text style={CustomStyles.textMoney}>{formatMoney(_item.prod_price)}</Text>
                            <Text style={CustomStyles.textBrand}>Cantidad: {quantity}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};
export default OrderProductDetail;