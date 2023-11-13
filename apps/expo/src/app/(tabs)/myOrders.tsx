import { FlatList, StyleSheet } from "react-native";

import Header from "~/components/Header";
import ProductOrder from "~/components/home/ProductOrder";
import { Text, View } from "../../components/Themed";

export default function MyOrders() {
  const fakedata = [
    {
      order_id: 1,
      order_date_of_order: "2022/11/25",
      order_customer: {
        usr_id: 1,
        usr_name: "Juan Perez",
        usr_email: "",
        is_vip: true,
      },
      order_details: {
        order_det_id: 1,
        order_det_prod: [1, 2, 3, 4, 5],
        order_det_start_date: "2023/08/26",
        order_det_finish_date: "2023/06/08",
        order_det_update_date: "2023/03/03",
        order_det_quantity: 67,
        order_det_total: 50001,
        order_location: "2566 Caliangt Circle",
        order_recipe: true,
      },
      order_delivery: { usr_id: 1, usr_name: "Juan Perez", usr_email: "" },
    },
    {
      order_id: 2,
      order_date_of_order: "2023/10/10",
      order_customer: {
        usr_id: 1,
        usr_name: "Juan Perez",
        usr_email: "",
        is_vip: false,
      },
      order_details: {
        order_det_id: 2,
        order_det_prod: [1, 2, 3, 4, 5],
        order_det_start_date: "2023/01/07",
        order_det_finish_date: "2023/07/22",
        order_det_update_date: "2023/06/02",
        order_det_quantity: 55,
        order_det_total: 4222323312,
        order_location: "81 Hintze Road",
        order_recipe: false,
      },
      order_delivery: { usr_id: 2, usr_name: "Jose Perez", usr_email: "" },
    },
    {
      order_id: 3,
      order_date_of_order: "2023/01/13",
      order_customer: {
        usr_id: 1,
        usr_name: "Juan Perez",
        usr_email: "",
        is_vip: true,
      },
      order_details: {
        order_det_id: 3,
        order_det_prod: [1, 2, 3, 4, 5],
        order_det_start_date: "2023/11/09",
        order_det_finish_date: "2022/12/09",
        order_det_update_date: "2023/01/06",
        order_det_quantity: 23,
        order_det_total: 25,
        order_location: "781 Tomscot Avenue",
        order_recipe: true,
      },
      order_delivery: { usr_id: 3, usr_name: "Jaime Perez", usr_email: "" },
    },
    {
      order_id: 4,
      order_date_of_order: "2023/09/22",
      order_customer: {
        usr_id: 1,
        usr_name: "Juan Perez",
        usr_email: "",
        is_vip: true,
      },
      order_details: {
        order_det_id: 4,
        order_det_prod: [1, 2, 3, 4, 5],
        order_det_start_date: "2023/03/15",
        order_det_finish_date: "2022/11/28",
        order_det_update_date: "2023/10/30",
        order_det_quantity: 30,
        order_det_total: 23,
        order_location: "8 Eastlawn Way",
        order_recipe: false,
      },
      order_delivery: { usr_id: 4, usr_name: "Pedro Perez", usr_email: "" },
    },
    {
      order_id: 5,
      order_date_of_order: "2023/02/16",
      order_customer: {
        usr_id: 1,
        usr_name: "Juan Perez",
        usr_email: "",
        is_vip: false,
      },
      order_details: {
        order_det_id: 5,
        order_det_prod: [1, 2, 3, 4, 5],
        order_det_start_date: "2023/10/28",
        order_det_finish_date: "2023/02/12",
        order_det_update_date: "2023/06/09",
        order_det_quantity: 68,
        order_det_total: 75,
        order_location: "43352 Stoughton Trail",
        order_recipe: true,
      },
      order_delivery: { usr_id: 5, usr_name: "Manuel Perez", usr_email: "" },
    },
  ];

  return (
    <>
      <Header showSearch />
      {fakedata.length === 0 ? (
        <EmptyComponent />
      ) : (
        <CartItem data={fakedata} />
      )}
    </>
  );
}

const CartItem = (data: any) => {
  return (
    <FlatList
      data={data.data}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{
        paddingBottom: 25,
      }}
      renderItem={({ item }) => <ProductOrder item={item} />}
      keyExtractor={(item: any) => item._id}
    />
  );
};

const EmptyComponent = () => {
  return (
    <View style={styles.empty}>
      <Text style={{ fontSize: 20, fontWeight: "500", margin: 10 }}>
        No hay pedidos disponibles.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pay: {
    backgroundColor: "#1969a3",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "transparent",
  },
  vaciar: {
    padding: 10,
    borderRadius: 8,
    alignItems: "flex-end",
  },
});

function formatMoney(number: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(number);
}
