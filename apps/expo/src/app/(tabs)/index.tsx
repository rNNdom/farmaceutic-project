import { StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Text } from "../../components/Themed";
import CarouselComponent from "../../components/home/CarouselHome";
import RecomendedComponent from "../../components/home/RecomendProd";
import ViewCategories from "../../components/home/ViewCategories";
import { ScrollView } from "react-native-gesture-handler";
import NewBrands from "../../components/home/NewBrands";

export default function CatalogoScreen() {
  return (
    <>
      <Header />

      <ScrollView style={styles.home}>
        <Text style={styles.current}>Inicio</Text>
        <CarouselComponent />
        <RecomendedComponent />
        <ViewCategories />
        <NewBrands />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
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
});
