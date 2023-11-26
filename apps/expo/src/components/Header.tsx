import { useContext, useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { api } from "~/utils/api";
import { Ionicons, SafeAreaView, Text, View } from "./Themed";
import { CartContext } from "./context";
import { styles } from "../styles/HeaderStyle";
import { UserContext } from "./userContext";



export default function Header(_props: any) {
    const { cart, quantity } = useContext(CartContext);
    const { user, loggedIn } = useContext(UserContext);
    const [ruta, setRuta] = useState("/(auth)/login");
    const isClient = user?.usr_role !== "DELIVER";
    const isDeliver = user?.usr_role === "DELIVER";
    const showSearch = false

    useEffect(() => {
        if (loggedIn && isClient) {
            setRuta("/(tabs)/profile");
        } else if (loggedIn && isDeliver) {
            setRuta("/(repartidor)/profile");
        } else {
            setRuta("/(auth)/login");
        }
    }, [user, loggedIn]);


    const cartRuta = isDeliver ? "/(repartidor)/cart" : "/(tabs)/cart";

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {isClient && (
                    <Link href="/(tabs)/diplayer">
                        <TouchableOpacity>
                            <Ionicons name="ios-menu" size={28} />
                        </TouchableOpacity>
                    </Link>
                )}

                <Link href="/(tabs)">
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        Farmacia
                    </Text>
                </Link>
                <View style={styles.options}>
                    <Link href={ruta} asChild>
                        <TouchableOpacity
                            style={{
                                paddingTop: 5,
                            }}
                        >
                            <Ionicons name="ios-person-circle-outline" size={26} />
                        </TouchableOpacity>
                    </Link>
                    {isClient && (
                        <Link href={cartRuta}>
                            <TouchableOpacity
                                style={{
                                    paddingRight: 10,
                                    paddingTop: 5,
                                }}
                            >
                                <Ionicons name="ios-cart-outline" size={26} />
                                {cart.length > 0 && (
                                    <Text style={styles.text}>
                                        {quantity < 99 ? quantity : "9+"}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </Link>
                    )}
                </View>
            </View>
            {showSearch && (
                <View style={styles.input}>
                    <TextInput placeholder="Buscar" maxLength={40} />
                    <Ionicons name="ios-search-outline" size={20} />
                </View>
            )}
        </SafeAreaView>
    );
}

