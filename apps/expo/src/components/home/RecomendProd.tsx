import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import ProductViewer from "./ProductSome";
import { Product } from "~/utils/interface";
import { api } from "~/utils/api";
import Loading from "../loading";

const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.row}>{children}</View>
);
const Col = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.col}>{children}</View>
);

const ProductList = ({ products }: { products: any[] | undefined }) => {
  return (
    <Col>
      {products?.map((item: React.JSX.IntrinsicAttributes & Product) => (
        <ProductViewer key={item.prod_id} {...item} />
      ))}

    </Col>
  )
};

const RecomendedComponent = () => {
  const getProduct = api.product.getAllProducts.useQuery();


  const firstTwoProducts = getProduct.data?.slice(0, 2);
  const nextTwoProducts = getProduct.data?.slice(2, 4);

  return (
    <>
      {getProduct.isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.app}>
            <Row>
              <ProductList products={firstTwoProducts} />
              <ProductList products={nextTwoProducts} />
            </Row>
          </View>
        </>
      )}
    </>
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
