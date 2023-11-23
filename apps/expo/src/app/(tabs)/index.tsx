import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import useProduct from "~/hooks/useProduct";
import useUser from "~/hooks/useUser";
import Header from "../../components/Header";
import CarouselComponent from "../../components/home/CarouselHome";
import NewBrands from "../../components/home/NewBrands";
import RecomendedComponent from "../../components/home/RecomendProd";
import ViewCategories from "../../components/home/ViewCategories";
import { Text } from "../../components/Themed";
import CatalogoScreens from "../(repartidor)/cart";

export default function CatalogoScreen() {
  const { product } = useProduct(null);
  // const { isClient, loading } = useUser(2);
  const { isClient, loading } = useUser(1);

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
            {isClient() ? (
              <>
                <Text style={styles.current}>Inicio</Text>
                {product && <CarouselComponent data={product} />}
                {product && <RecomendedComponent data={product} />}
                {product && <ViewCategories data={product} />}
                {product && <NewBrands data={product} />}
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
