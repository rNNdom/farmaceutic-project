import { CustomColors } from "~/styles/CustomStyles"
import { Ionicons, View, Text } from "./Themed"

const ViewIconCard = ({ data, icon }: { data: any[], icon: string }) => {
    return (

        <View className="flex-row ml-1 bg-transparent">
            <View className="mr-2">
                <Ionicons
                    name={icon}
                    size={26}
                    style={{
                        opacity: 0.3,

                    }}
                />
            </View>
            {data.map((item, index) => (
                <Text key={index} className="capitalize font-bold pr-1" style={{ color: CustomColors.Dark_purple }} selectable>{item}</Text>
            ))}
        </View>
    )
}
export default ViewIconCard