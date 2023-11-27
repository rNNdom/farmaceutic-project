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
import { CustomColors, CustomStyles } from "~/styles/CustomStyles";

export default function CatalogoScreen() {
  const { user } = useContext(UserContext);
  const role = user?.usr_role
  const isClient = role !== "DELIVER";


  return (
    <>
      <Header showSearch />
      <View className="flex-1" style={CustomStyles.home}>
        {isClient ? (
          <>
            <ScrollView>
              <Text className="text-sm text-lg my-5 mx-2 opacity-50">Inicio</Text>
              <RecomendedComponent />
              <ViewCategories />
              <NewBrands />
            </ScrollView>
          </>
        ) : (
          <>
            <Text className="text-sm text-lg my-5 mx-2 opacity-50">Inicio</Text>
            <CatalogoScreens />
          </>
        )}
      </View>
    </>
  );
}