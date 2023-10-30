import * as React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Ionicons } from "../../components/Themed";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Brand from "./Brand";

function NewBrands() {
  const dataImages = [
    {
      name: "paracetamol",
      image: require("../../assets/carrousel-test/para.png"),
    },
    {
      name: "ibuprofeno",
      image: require("../../assets/carrousel-test/ibu.png"),
    },
    {
      name: "amoxicilina",
      image: require("../../assets/carrousel-test/amox.png"),
    },
  ];
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Nuevas marcas
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text>Ver todas</Text>
          <Ionicons name="chevron-forward-outline" size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal>
        <View style={styles.app}>
          <Brand item={dataImages[0]} />
          <Brand item={dataImages[0]} />
          <Brand item={dataImages[0]} />
          <Brand item={dataImages[0]} />
          <Brand item={dataImages[0]} />
        </View>
      </ScrollView>
    </View>
  );
}

export default NewBrands;

const styles = StyleSheet.create({
  main: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "transparent",
  },
  app: {
    gap: 10,
    paddingVertical: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
});
