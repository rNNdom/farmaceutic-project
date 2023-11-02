import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { StyleSheet } from "react-native";
function CarouselComponent() {
  const width = Dimensions.get("window").width;
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
    <View>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={dataImages}
        scrollAnimationDuration={1500}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              padding: 15,
              justifyContent: "center",
            }}
          >
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
}

export default CarouselComponent;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
