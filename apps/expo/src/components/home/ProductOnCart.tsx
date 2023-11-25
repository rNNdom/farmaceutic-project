import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

import { Text, View } from "../../components/Themed";

const ProductOnCart = (item: any) => {
  // function handleRemove(){
  //   void:
  // }
  const _item = item;
  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: "/(tabs)/productDetail",
          params: _item,
        }}
        asChild
      >
        <TouchableOpacity>
          <Image source={{ uri: _item.prod_image }} style={styles.image} />
        </TouchableOpacity>
      </Link>
      <View style={styles.detailsContainer}>


        <View style={styles.containertext}>
          {_item.prod_recipe === "true" && (
            <>
              <Text style={{ color: 'red' }}>Requiere receta medica</Text>
            </>
          )}
          <Text style={styles.colorcustom}>{_item.prod_brand}</Text>
          <Text style={[styles.colorcustom, styles.title]}>
            {_item.prod_name}
          </Text>
          <Text style={styles.money}>{formatMoney(_item.prod_price)}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.margin}>Cantidad: {_item.onCartQuantity}</Text>
      </View>
    </View>
  );
};
export default ProductOnCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  detailsContainer: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    marginHorizontal: 10,
    flex: 1,
    paddingVertical: 15,
  },
  containertext: {
    flex: 1, // Añade esta línea
    backgroundColor: "transparent",
    flexDirection: "column",
    borderRadius: 20,
    justifyContent: "flex-end",
    position: "absolute",
    marginBottom: 10,
  },
  quantityContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  colorcustom: {
    color: "#1969a3",
  },
  money: {
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
  },
  margin: {
    margin: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});

function formatMoney(number: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(number);
}
