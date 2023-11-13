import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import useProductRepositories from "~/hooks/useProductRepositories";
import Header from "../../components/Header";
import CarouselComponent from "../../components/home/CarouselHome";
import NewBrands from "../../components/home/NewBrands";
import RecomendedComponent from "../../components/home/RecomendProd";
import ViewCategories from "../../components/home/ViewCategories";
import { Text } from "../../components/Themed";

export default function CatalogoScreen() {
  const { data } = useProductRepositories();

  return (
    <>
      <Header showSearch />

      <ScrollView style={styles.home}>
        <Text style={styles.current}>Inicio</Text>
        {data && <CarouselComponent data={data} />}
        {data && <RecomendedComponent data={data} />}
        {data && <ViewCategories data={data} />}
        {data && <NewBrands data={data} />}
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
});
