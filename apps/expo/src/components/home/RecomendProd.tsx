import * as React from "react";
import { StyleSheet } from "react-native";

import { Product } from "~/hooks/useProductRepositories";
import { View } from "../../components/Themed";
import ProductViewer from "./ProductSome";

const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.row}>{children}</View>
);
const Col = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.col}>{children}</View>
);

const ProductList = ({ products }: { products: Product[] }) => (
  <Col>
    {products.map((item: Product) => (
      <ProductViewer key={item.prod_id} item={item} />
    ))}
  </Col>
);

const RecomendedComponent = ({ data }: { data: Product[] }) => {
  const filteredProducts = data.filter((item) => item.prod_reviews > 3);

  const firstTwoProducts = filteredProducts.slice(0, 2);
  const nextTwoProducts = filteredProducts.slice(2, 4);

  return (
    <View style={styles.app}>
      <Row>
        <ProductList products={firstTwoProducts} />
        <ProductList products={nextTwoProducts} />
      </Row>
    </View>
  );
};

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
