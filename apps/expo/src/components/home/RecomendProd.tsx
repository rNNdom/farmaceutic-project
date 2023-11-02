import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import ProductViewer from "./ProductSome";
const Row = ({ children }: any) => <View style={styles.row}>{children}</View>;
const Col = ({ children }: any) => {
  return <View style={styles.col}>{children}</View>;
};
function RecomendedComponent() {
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
    <View style={styles.app}>
      <Row>
        <Col>
          <ProductViewer item={dataImages[0]} />
        </Col>
        <Col>
          <ProductViewer item={dataImages[1]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ProductViewer item={dataImages[2]} />
        </Col>
        <Col>
          <ProductViewer item={dataImages[0]} />
        </Col>
      </Row>
    </View>
  );
}

export default RecomendedComponent;

const styles = StyleSheet.create({
  app: {
    gap: 10,
    padding: 10,
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 10,
  },
  col: {
    backgroundColor: "transparent",
    flex: 2,
  },
});
