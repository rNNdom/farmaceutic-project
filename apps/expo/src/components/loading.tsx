import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "./Themed";

export default function Loading() {
    return (
        <View style={styles.loading}>
            <ActivityIndicator />
        </View>
    )

}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        height: 200,
        gap: 10,
        padding: 10,
        margin: 10,
        overlayColor: "#000",
    },
})