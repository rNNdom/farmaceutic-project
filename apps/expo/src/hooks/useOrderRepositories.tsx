import { useEffect, useState } from "react";

const MY_API = "http://192.168.171.44:5500/src/utils/MOCK_ORDER.json";

export interface ORDER {
  order_id: number;
  order_date_of_order: string;
  order_customer: number;
  order_details: number;
  order_delivery: number;
}

const useOrderRepositories = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true); // [1]

  const [order, setorder] = useState<ORDER[] | null>(null);

  const fetchOrder = async () => {
    try {
      const response = await globalThis.fetch(MY_API);
      const json: ORDER[] = await response.json();
      const data = json?.filter((item) => props.includes(item.order_customer));
      setorder(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch product", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return { order, loading };
};

export default useOrderRepositories;
