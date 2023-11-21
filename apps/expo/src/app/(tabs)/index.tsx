import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import useProductRepositories from "~/hooks/useProductRepositories";
import useUserRepositories from "~/hooks/useUserRepositories";
import Header from "../../components/Header";
import CarouselComponent from "../../components/home/CarouselHome";
import NewBrands from "../../components/home/NewBrands";
import RecomendedComponent from "../../components/home/RecomendProd";
import ViewCategories from "../../components/home/ViewCategories";
import { Text } from "../../components/Themed";
import CatalogoScreens from "../(repartidor)/cart";

export default function CatalogoScreen() {
  const { productrepo } = useProductRepositories(null);
  const { user } = useUserRepositories(2);

  return (
    <>
      <Header showSearch />

      <ScrollView style={styles.home}>
        {user?.usr_role == 1 ? (
          <>
            <Text style={styles.current}>Inicio</Text>
            {productrepo && <CarouselComponent data={productrepo} />}
            {productrepo && <RecomendedComponent data={productrepo} />}
            {productrepo && <ViewCategories data={productrepo} />}
            {productrepo && <NewBrands data={productrepo} />}
          </>
        ) : (
          <>
            <Text style={styles.current}>Inicio</Text>
            <CatalogoScreens />
          </>
        )}
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
