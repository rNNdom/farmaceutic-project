import { Image, StyleSheet, View } from "react-native";
import { Link } from "expo-router";

import { Product } from "~/utils/interface";
import { Pressable, Text } from "../../components/Themed";
import { formatMoney } from "~/utils/formats";

const ProductShort = (data: Product) => {
  return (
    <Link
      href={{
        pathname: "/(tabs)/productDetail",
        params: data,
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <Image source={{ uri: data.prod_image }} style={styles.image} />
        <View style={styles.vewimage}>
          <View style={styles.containerdesc}>
            <View>
              <Text style={styles.colorcustom}>{data.prod_brand}</Text>
              <Text style={[styles.colorcustom, styles.title]}>
                {data.prod_name}
              </Text>
              <View>
                {data.prod_recipe && (
                  <>
                    <Text style={{ color: 'red' }}>Requiere receta medica</Text>
                  </>
                )}
              </View>
            </View>
          </View>
          <Text style={styles.money}>{formatMoney(data.prod_price)}</Text>
        </View>
      </Pressable>
    </Link>
  );
};
export default ProductShort;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
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
    flexWrap: "wrap",
  },
  containerdesc: {
    alignItems: "flex-start",
    width: "100%",
    flexDirection: "column",
    alignContent: "space-around",
  },
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  vewimage: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 10,
    flex: 1,
    paddingVertical: 14,
  },
  reveiw: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

