import { CustomColors, CustomStyles } from "~/styles/CustomStyles"
import { Ionicons, View, Text } from "./Themed"

const EmptyCardOrder = () => {
    return (

        <View className="flex-row mx-1 my-2 px-1 shadow-sm rounded-xl" style={CustomStyles.card} >
            <View className="flex-1 m-1">
                <View className="flex-row items-center h-20">
                    <Ionicons name="alert-outline" size={40} style={{ color: CustomColors.Claret }} />
                    <Text className="text-lg ml-2 font-bold">No hay Ordenes</Text>
                </View>
            </View>
        </View>
    )
}
export default EmptyCardOrder