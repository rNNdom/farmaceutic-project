import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "~/components/Header";
import NewBrands from "../../components/home/NewBrands";
import RecomendedComponent from "../../components/home/RecomendProd";
import ViewCategories from "../../components/home/ViewCategories";
import { Text } from "../../components/Themed";
import CatalogoScreens from "../(repartidor)/cart";
import { api } from "~/utils/api";
import { getContentFromAsyncStorage } from "~/components/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CatalogoScreen() {
  const getSession = api.auth.getSession.useQuery()
  const role = getSession.data?.user.role
  const loading = false
  const isClient = (getSession.data === undefined || role === "USER") && role !== "DELIVER";


  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <Header showSearch />

          <ScrollView style={styles.home}>
            {isClient ? (
              <>
                <Text style={styles.current}>Inicio</Text>
                <RecomendedComponent />
                <ViewCategories />
                <NewBrands />
              </>
            ) : (
              <>
                <Text style={styles.current}>Inicio</Text>
                <CatalogoScreens />
              </>
            )}
          </ScrollView>
        </>
      )}
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
