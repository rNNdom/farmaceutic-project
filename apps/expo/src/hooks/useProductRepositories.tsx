import { useEffect, useState } from "react";

const API_MOCKAROO = "https://my.api.mockaroo.com/prod";
const MY_API = "http://192.168.171.44:5500/src/utils/MOCK_PROD.json";
const MACKAROO_KEY = "a3bc5410";

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

const useProductRepositories = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true); // [1]

  const [productrepo, setproductrepo] = useState<Product[] | null>(null);

  const fetchProduct = async () => {
    try {
      // const params = new URLSearchParams({
      //   id: `${props}`,
      // });

      // const response = await globalThis.fetch(
      //   `${API_MOCKAROO}?${params.toString()}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "X-API-Key": `${MACKAROO_KEY}`,
      //     },
      //   },
      // );

      const response = await globalThis.fetch(MY_API);
      const json: Product[] = await response.json();
      if (props == null) {
        const data = json;
        setproductrepo(data);
      } else {
        const data = json?.filter((item) => props.includes(item.prod_id));
        setproductrepo(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch product", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return { productrepo, loading };
};

export default useProductRepositories;
