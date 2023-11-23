import { useEffect, useState } from "react";

import { Order } from "~/utils/interface";
import { getOrders } from "~/utils/service";

const useOrder = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true); // [1]

  const [order, setorder] = useState<Order[]>();
  const fetchOrder = async () => {
    try {
      const response = await getOrders();
      let data;
      if (props[0] === "all") {
        data = response.filter(
          (item: Order) =>
            item.order_status === "Pendiente" ||
            item.order_delivery === props[1],
        );
      } else {
        data = response?.filter((item: Order) =>
          props.includes(item.order_customer),
        );
      }
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

export default useOrder;
