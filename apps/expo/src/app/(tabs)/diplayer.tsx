import { StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Text } from "../../components/Themed";
import ListProducts from "../../components/home/ListProducts";

export default function DisplayerScreen() {
  return (
    <>
      <Header />

      <Text style={styles.current}>{"Inicio > Medicamentos"}</Text>
      <ListProducts />
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
