import { StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Text, View } from "../../components/Themed";
import CarouselComponent from "../../components/home/CarouselHome";
import RecomendedComponent from "../../components/home/RecomendProd";
import ViewCategories from "../../components/home/ViewCategories";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import NewBrands from "../../components/home/NewBrands";

import Product from "./Product";
import ListCatHeader from "./ListCatHeader";

export default function ListProducts() {
  const data = [
    {
      name: "Medicamento 1",
      image: require("../../assets/carrousel-test/amox.png"),
      price: 10000,
      brand: "Marca 1",
      reviews: 4.5,
      reviewsCount: 5,
      _id: 1,
    },
    {
      name: "Medicamento 1",
      image: require("../../assets/carrousel-test/amox.png"),
      price: 10000,
      brand: "Marca 1",
      reviews: 4.5,
      reviewsCount: 5,
      _id: 2,
    },
    {
      name: "Medicamento 1",
      image: require("../../assets/carrousel-test/ibu.png"),
      price: 10000,
      brand: "Marca 1",
      reviews: 4.5,
      reviewsCount: 5,
      _id: 3,
    },
    {
      name: "Medicamento 1",
      image: require("../../assets/carrousel-test/amox.png"),
      price: 10000,
      brand: "Marca 1",
      reviews: 4.5,
      reviewsCount: 5,
      _id: 4,
    },
    {
      name: "Medicamento 1",
      image: require("../../assets/carrousel-test/amox.png"),
      price: 10000,
      brand: "Marca 1",
      reviews: 4.5,
      reviewsCount: 5,
      _id: 5,
    },
    {
      name: "Medicamento 1",
      image: require("../../assets/carrousel-test/ibu.png"),
      price: 10000,
      brand: "Marca 1",
      reviews: 4.5,
      reviewsCount: 5,
      _id: 6,
    },
    {
      name: "Medicamento 1",
      image: require("../../assets/carrousel-test/amox.png"),
      price: 10000,
      brand: "Marca 1",
      reviews: 4.5,
      reviewsCount: 5,
      _id: 7,
    },
    {
      name: "Medicamento 1",
      image: require("../../assets/carrousel-test/amox.png"),
      price: 10000,
      brand: "Marca 1",
      reviews: 4.5,
      reviewsCount: 5,
      _id: 8,
    },
    {
      name: "Medicamento 1",
      image: require("../../assets/carrousel-test/ibu.png"),
      price: 10000,
      brand: "Marca 1",
      reviews: 4.5,
      reviewsCount: 5,
      _id: 9,
    },
  ];

  const types = [
    {
      name: "colonias",
      key: "colonias",
    },
    {
      name: "corporal",
      key: "corporal",
    },
    {
      name: "Cosmetica Natural",
      key: "cosmetica-natural",
    },
    {
      name: "Cuidado Capilar",
      key: "cuidado-capilar",
    },
    {
      name: "Cuidado Facial",
      key: "cuidado-facial",
    },
  ];
  return (
    <FlatList
      data={data}
      ListHeaderComponent={
        <>
          <ListCatHeader data={types} />
        </>
      }
      renderItem={({ item }) => <Product item={item} />}
      keyExtractor={(item) => item._id.toString()}
    />
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
