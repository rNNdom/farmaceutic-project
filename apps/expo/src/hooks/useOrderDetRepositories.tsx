import { useEffect, useState } from "react";

const MY_API = "http://192.168.171.44:5500/src/utils/MOCK_ORDER_DET.json";

export interface ORDERDET {
  order_det_id: number;
  order_det_prod: number[];
  order_det_start_date: string;
  order_det_finish_date: string;
  order_det_update_date: string;
  order_det_quantity: number;
  order_det_total: number;
  order_location: string;
  order_recipe: boolean;
}

const useOrderDetRepositories = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true); // [1]

  const [orderdet, setorderdet] = useState<ORDERDET | null>(null);

  const fetchOrder = async () => {
    try {
      const response = await globalThis.fetch(MY_API);
      const json: ORDERDET[] = await response.json();
      const data = json.find((item: ORDERDET) => item.order_det_id == props);
      setorderdet(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch Order Detail", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return { orderdet, loading };
};

export default useOrderDetRepositories;
