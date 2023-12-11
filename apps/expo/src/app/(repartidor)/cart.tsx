import { FlatList } from "react-native-gesture-handler";
import ProductOnDelivery from "~/components/home/ProductOnDelivery";
import { Text, View } from "../../components/Themed";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "~/components/userContext";
import { api } from "~/utils/api";
import Loading from "~/components/loading";
import { calculatePriority } from "~/utils/formats";


const EmptyComponent = () => {
  return (
    <View className="items-center justify-center flex-1 bg-transparent">
      <Text className="text-lg font-medium m-2">
        No hay pedidos disponibles.
      </Text>
    </View>
  );
};

const CartItem = ({ data, setIsChange }) => {
  return (
    <FlatList
      data={data}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{
        paddingBottom: 25,
      }}
      renderItem={({ item }) => <ProductOnDelivery setIsChange={setIsChange} {...item} />}
      keyExtractor={(item: any) => item.order_id}
    />
  );
};

export default function CatalogoScreens() {
  const { user } = useContext(UserContext);
  const [isChange, setIsChange] = useState(false)
  const getOrdert = api.orders.getAllOrderforDeliver.useQuery({
    idDeliver: Number(user?.usr_id)
  })


  const sortedOrder = getOrdert.data?.sort((a, b) => calculatePriority(b.user.usr_vip, b.order_date_of_ord) - calculatePriority(a.user.usr_vip, a.order_date_of_ord))

  useEffect(() => {
    if (isChange) {
      getOrdert.refetch()
      setIsChange(false)
    }
  }, [getOrdert.isSuccess, getOrdert.isError, isChange, getOrdert.dataUpdatedAt])



  return (
    <>
      {getOrdert.isLoading ? (
        <Loading />
      ) : (
        <>
          {getOrdert.data?.length === 0 ? (
            <EmptyComponent />
          ) : (
            <CartItem setIsChange={setIsChange} data={sortedOrder} />
          )}
        </>
      )}
    </>
  );
}
