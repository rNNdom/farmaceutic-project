import { FlatList } from "react-native";
import Header from "~/components/Header";
import ProductOrder from "~/components/home/ProductOrder";
import { Text, View } from "../../components/Themed";
import { api } from "~/utils/api";
import { useContext, useEffect, useState } from "react";
import Loading from "~/components/loading";
import { UserContext } from "~/components/userContext";

export default function MyOrders() {
  const { user } = useContext(UserContext);
  const [isDeleted, setIsDeleted] = useState(false)
  const getOrdert = api.orders.getAllOrder.useQuery({
    idCustomer: Number(user?.usr_id),
  })

  useEffect(() => {
    if (isDeleted) {
      getOrdert.refetch()
      setIsDeleted(false)
    }
  }, [getOrdert.isSuccess, getOrdert.isError, isDeleted, getOrdert.dataUpdatedAt])

  return (
    <>
      <Header showSearch />
      {getOrdert.isLoading ? (
        <Loading />
      ) : (
        <>
          {getOrdert.data?.length === 0 ? (
            <EmptyComponent />
          ) : (
            <CartItem setIsDeleted={setIsDeleted} data={getOrdert.data} />
          )}
        </>
      )}
    </>
  );
}

const CartItem = ({ data, setIsDeleted }) => {
  return (
    <FlatList
      data={data}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{
        paddingBottom: 25,
      }}
      renderItem={({ item }) => <ProductOrder setIsDeleted={setIsDeleted} {...item} />}
      keyExtractor={(item: any) => item.order_id}
    />
  );
};

const EmptyComponent = () => {
  return (
    <View className="flex-1 justify-center bg-transparent items-center">
      <Text className="text-xl font-medium m-3">
        No hay pedidos disponibles.
      </Text>
    </View>
  );
};
