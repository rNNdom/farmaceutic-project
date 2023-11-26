import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "~/components/Header";
import NewBrands from "../../components/home/NewBrands";
import RecomendedComponent from "../../components/home/RecomendProd";
import ViewCategories from "../../components/home/ViewCategories";
import { Text } from "../../components/Themed";
import CatalogoScreens from "../(repartidor)/cart";
import { useContext } from "react";
import { UserContext } from "~/components/userContext";

export default function CatalogoScreen() {
  const { user } = useContext(UserContext);
  const role = user?.usr_role
  const isClient = role !== "DELIVER";


  return (
    <>
      <Header showSearch />
      <View style={styles.home}>
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
      </View>
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
