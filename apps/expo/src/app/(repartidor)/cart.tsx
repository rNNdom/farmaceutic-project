import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProductOnDelivery, { calculatePriority } from "~/components/home/ProductOnDelivery";
import useOrder from "~/hooks/useOrder";
import { Text, View } from "../../components/Themed";
import useUser from "~/hooks/useUser";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "~/components/userContext";
import { api } from "~/utils/api";
import Loading from "~/components/loading";


const EmptyComponent = () => {
  return (
    <View style={styles.empty}>
      <Text style={{ fontSize: 20, fontWeight: "500", margin: 10 }}>
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