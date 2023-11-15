import { StyleSheet } from "react-native";

const sharedStyles = {
  flexDirection: "row",
  alignItems: "center",
};

const sharedTextStyles = {
  marginBottom: 8,
};

export const commonStyles = StyleSheet.create({
  container: {
    ...sharedStyles,
    justifyContent: "center",
  },
  containerquantity: {
    backgroundColor: "#cececece",
    paddingHorizontal: 10,
    borderRadius: 24,
  },
  spaceBetween: {
    ...sharedStyles,
    justifyContent: "space-between",
  },
  gap: {
    ...sharedStyles,
    gap: 7,
  },
  marginBottom: {
    marginBottom: 16,
  },
  quantityContainer: {
    ...sharedStyles,
    justifyContent: "space-between",
    height: 30,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#1969a3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
    height: "auto",
  },
});

export const componentStyles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  colorcustom: {
    color: "#1969a3",
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 50,
    resizeMode: "contain",
  },
  brand: {
    fontSize: 20,
    fontWeight: "400",
    opacity: 0.7,
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  textMarginBottom: {
    ...sharedTextStyles,
    fontSize: 16,
  },
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textPadding: {
    fontSize: 20,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  addToCartButtonText: {
    color: "#fff",
  },
  descriptionTitle: {
    ...sharedTextStyles,
    fontSize: 20,
    fontWeight: "500",
  },
  productDetail: {
    ...sharedTextStyles,
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.7,
  },
  productDescription: {
    ...sharedTextStyles,
    fontSize: 16,
    fontWeight: "400",
    opacity: 0.7,
  },
});
