import { useEffect, useState } from "react";

import { Product } from "~/utils/interface";
import { getProduct } from "~/utils/service";

const useProduct = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true); // [1]

  const [product, setProduct] = useState<Product[]>();

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

      const response = await getProduct();
      if (props == null) {
        const data = response;
        setProduct(data);
      } else {
        const data = response?.filter((item: Product) =>
          props.includes(item.prod_id),
        );
        console.log(props);
        setProduct(data);
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

  return { product, loading };
};

export default useProduct;
