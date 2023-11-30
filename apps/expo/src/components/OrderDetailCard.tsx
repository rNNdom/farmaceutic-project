import { StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons, Text, View } from "../components/Themed"
import { CustomStyles, getStatusColor } from "~/styles/CustomStyles"
import { formatDate, formatStatus } from "~/utils/formats"
import ViewIconCard from "./ViewIconCard"

interface OrderDetailCardProps {

    order_date_of_ord: string,
    order_det_id: number,
    order_det_recipe: boolean,
    order_det_total: number,
    order_location: string,
    order_status: string,
    prf_email: string,
    prf_lastname: string,
    prf_name: string,
    prf_phone: string,

}

const OrderDetailCard = (item: OrderDetailCardProps) => {
    const options = formatDate()
    const date = new Date(item?.order_date_of_ord)
    console.log(item)

    return (

        <View className="flex-row mx-3 my-2 px3 py-3 shadow-xl rounded-lg" style={CustomStyles.card}>
            <View className="px-2">
                <View>
                    <Text className="font-bold uppercase text-xl"
                        style={[{ color: getStatusColor(item?.order_status), }]}>
                        {formatStatus(item?.order_status)}
                    </Text>
                    <View className="flex-row pb-1">
                        <Text className="mr-2 font-semibold opacity-50">Realizado el:</Text>
                        <Text className="capitalize font-bold">{date.toLocaleDateString(options.localDate, options.options)}</Text>
                    </View>
                    <ViewIconCard data={[date.toLocaleTimeString(options.localDate)]} icon="time-outline" />
                    <ViewIconCard data={[item.order_location]} icon="map-outline" />
                    {item.prf_email && (
                        <>
                            <ViewIconCard data={[item.prf_name, item.prf_lastname]} icon="person-outline" />
                            <ViewIconCard data={[item.prf_phone]} icon="phone-portrait-outline" />
                            <ViewIconCard data={[item.prf_email]} icon="mail-outline" />
                        </>
                    )}
                </View>
            </View>
        </View>
    )
}
export default OrderDetailCard
