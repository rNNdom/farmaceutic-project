import { ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Header from "~/components/Header";
import CatalogoScreens from "./cart";

export default function IndexDeliver() {
    return (

        <>
            <Header showSearch />
            <ScrollView style={styles.home}>
                <Text style={styles.current}>Inicio</Text>
                <CatalogoScreens />
            </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    current: {
        fontSize: 14,
        fontWeight: "500",
        marginHorizontal: 18,
        marginVertical: 8,
        opacity: 0.5,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

