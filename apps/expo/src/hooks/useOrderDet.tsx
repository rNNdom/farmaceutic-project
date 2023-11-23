import { useEffect, useState } from "react";

import { OrderDetails } from "~/utils/interface";
import { getOrderDet } from "~/utils/service";

const useOrderDet = (props: any) => {
  const [orderdet, setorderdet] = useState<OrderDetails>();

  const fetchOrderDet = async () => {
    try {
      const response = await getOrderDet();
      const data = response.find(
        (item: OrderDetails) => item.order_det_id === props,
      );
      setorderdet(data);
    } catch (error) {
      console.error("Failed to fetch OrderDetails Detail", error);
    }
  };

  useEffect(() => {
    fetchOrderDet();
  }, []);

  return { orderdet };
};

export default useOrderDet;
