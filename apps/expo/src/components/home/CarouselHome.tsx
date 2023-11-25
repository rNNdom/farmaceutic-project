// import * as React from "react";
// import { Dimensions, Image, StyleSheet, View } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import Carousel from "react-native-reanimated-carousel";
// import { Link } from "expo-router";
// import { Product } from "~/utils/interface";


// const CarouselComponent = ({ data }: { data: Product[] }) => {
//   const width = Dimensions.get("window").width;
//   const highlyRatedProducts = data.filter((item) => item.prod_reviews > 4);
//   return (
//     <View>
//       <Carousel
//         style={styles.container}
//         loop
//         width={width}
//         height={width / 2}
//         autoPlay={true}
//         data={highlyRatedProducts}
//         scrollAnimationDuration={1500}
//         renderItem={({ item }) => (
//           <Link
//             href={{
//               pathname: "/(tabs)/productDetail",
//               params: item,
//             }}
//             asChild
//           >
//             <TouchableOpacity>
//               <View>
//                 <Image source={{ uri: item.prod_image }} style={styles.image} />
//               </View>
//             </TouchableOpacity>
//           </Link>
//         )}
//       />
//     </View>
//   );
// };

// export default CarouselComponent;

// const styles = StyleSheet.create({
//   image: {
//     backgroundColor: "#fff",
//     width: "100%",
//     height: "100%",
//     resizeMode: "contain",
//   },
//   container: {
//     flex: 1,
//     padding: 15,
//     justifyContent: "center",
//     marginHorizontal: 12,
//     marginVertical: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 8,

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.12,
//     shadowRadius: 20,
//     elevation: 10,
//     flexDirection: "row",
//     alignContent: "space-around",
//   },
// });
