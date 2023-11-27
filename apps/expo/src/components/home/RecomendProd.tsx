import * as React from "react";
import { View } from "../../components/Themed";
import ProductViewer from "./ProductSome";
import { Product } from "~/utils/interface";
import { api } from "~/utils/api";
import Loading from "../loading";

const Row = ({ children }: { children: React.ReactNode }) => (
  <View className="flex-row bg-transparent gap-1">{children}</View>
);
const Col = ({ children }: { children: React.ReactNode }) => (
  <View className="bg-transparent flex-1">{children}</View>
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
          <View className="gap-2 p-2 bg-transparent">
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

