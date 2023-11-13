import { useEffect, useState } from "react";

const API_MOCKAROO = "https://my.api.mockaroo.com/prod.json?key=a3bc5410";
const MY_API = "http://192.168.83.44:5500/src/utils/MOCK_DATAcopy.json";

export interface Product {
  prod_id: string;
  prod_name: string;
  prod_date_expiration: string;
  prod_date_package: string;
  prod_status: string;
  prod_image: string;
  prod_reviews: number;
  prod_brand: string;
  prod_price: number;
  prod_quantity: number;
  prod_tablet: string;
  prod_detail: string;
  prod_category: string;
  prod_description: string;
}

interface ProductRepo {
  products: Product[];
}

const useProductRepositories = () => {
  const [loading, setLoading] = useState<boolean>(true); // [1]

  const [productrepo, setproductrepo] = useState<ProductRepo | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await globalThis.fetch(API_MOCKAROO);
      const json: ProductRepo = await response.json();
      setproductrepo(json);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch product", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  const data = productrepo;
  return { data, loading };
};

export default useProductRepositories;
