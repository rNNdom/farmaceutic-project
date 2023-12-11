import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "./Themed";
import { CustomColors } from "~/styles/CustomStyles";

export default function Loading() {
    return (
        <View className="flex-1 h-52 gap-3 p-3 justify-center m-3" style={styles.loading}>
            <ActivityIndicator />
        </View>
    )

}

const styles = StyleSheet.create({
    loading: {
        backgroundColor: CustomColors.White,
        overlayColor: CustomColors.Dark_purple,
    },
})