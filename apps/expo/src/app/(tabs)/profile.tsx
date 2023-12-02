import { TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";

import Header from "~/components/Header";
import { setToken, api } from "~/utils/api";
import { Ionicons, Text, View } from "../../components/Themed";
import { deleteAllFromAsyncStorage } from "~/components/storage";
import { UserContext } from "~/components/userContext";
import { useContext, useEffect } from "react";
import Loading from "~/components/loading";
import { CustomColors, CustomStyles, getStatusColor } from "~/styles/CustomStyles";
import { formatDate, formatStatus } from "~/utils/formats";
import ViewIconCard from "~/components/ViewIconCard";


export default function Profilesr() {
  const { user, profile, addProfile, emptyUser } = useContext(UserContext);
  const getProfile = api.profile.getProfile.useQuery(
    {
      id: Number(user?.usr_profile),
    }
  );
  const lastOrder = api.orders.getLastOrder.useQuery(
    {
      idCustomer: Number(user?.usr_id),
    }
  );

  const aux = {
    ...lastOrder.data?.OrderDetail.at(0),
    order_date_of_ord: lastOrder.data?.order_date_of_ord,
    order_location: lastOrder.data?.order_location,
    order_status: lastOrder.data?.order_status,
    prf_lastname: lastOrder.data?.order_delivery ? lastOrder.data?.delivery_user?.profile.prf_lastname : null,
    prf_name: lastOrder.data?.order_delivery ? lastOrder.data?.delivery_user?.profile.prf_name : null,
    prf_phone: lastOrder.data?.order_delivery ? lastOrder.data?.delivery_user?.profile.prf_phone : null,
    prf_email: lastOrder.data?.order_delivery ? lastOrder.data.delivery_user?.usr_email : null,

  }

  useEffect(() => {
    if (getProfile.isSuccess) {
      addProfile(getProfile.data)
    }
    getProfile.isError && console.log(getProfile.error.message);
  }, [getProfile.isSuccess, getProfile.isError, profile]);


  const options = formatDate()


  return (
    <>
      {getProfile.isLoading ? (
        <Loading />
      ) : (
        <>
          <View>
            <Header />
            <View>
              <View className="px-4 pt-2 pb-2">
                <Text className="text-2xl font-extrabold" style={CustomStyles.textProduct}>
                  Hola, {profile?.prf_name} {profile?.prf_lastname}
                </Text>
              </View>
              {/* Card */}
              <View className="flex-row mx-1 my-2 px-1 shadow-sm rounded-xl" style={CustomStyles.card} >
                <View className="flex-1 m-1">
                  <View className="flex-row items-center">
                    <Text className="mr-1 ">
                      Ultimo pedido:
                    </Text>
                    <Text className="font-bold uppercase text-xl"
                      style={
                        {
                          color: getStatusColor(lastOrder.data?.order_status),
                        }
                      }
                    >
                      {formatStatus(lastOrder.data?.order_status)}
                    </Text>
                  </View>
                  <ViewIconCard data={[lastOrder.data?.order_date_of_ord.toLocaleDateString(options.localDate, options.options)]} icon="calendar-sharp" />
                  <ViewIconCard data={[lastOrder.data?.order_date_of_ord.toLocaleTimeString(options.localDate)]} icon="time-sharp" />

                  <Link href={{
                    pathname: "/(tabs)/productOrderDetails",
                    params: { ...aux }
                  }}
                    asChild
                  >
                    <TouchableOpacity className="mt-1 pt-1 pb-1">
                      <View className="ml-1 flex-row bg-transparent">
                        <View className="flex-row mr-2 bg-transparent">
                          <Ionicons
                            name="eye-outline"
                            size={24}
                            style={{ color: CustomColors.Bice_blue }}
                          />
                        </View>

                        <Text className="font-bold">
                          Hacer Seguimiento
                        </Text>

                      </View>
                      <View className="flex-1 items-end bg-transparent">
                        <Ionicons
                          name="chevron-forward-outline"
                          size={26}
                          style={{
                            opacity: 0.3,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
              {/* END CARD */}

              <View style={CustomStyles.separator} />
              {/* OPTIONS */}
              <View className="flex-row mx-1 my-2 px-1 shadow-sm rounded-xl">
                <View className="flex-1 m-1" >
                  <Link
                    href={{
                      pathname: "/(tabs)/myOrders",
                    }}
                    asChild
                  >
                    <TouchableOpacity className="mt-1 pt-1 pb-1">
                      <View className="ml-1 flex-row bg-transparent">
                        <View className="flex-row mr-2 bg-transparent">
                          <Ionicons
                            name="cart-outline"
                            size={26}
                            style={{ color: CustomColors.Bice_blue }}
                          />
                        </View>
                        <Text className="font-bold">
                          Mis Pedidos
                        </Text>
                        <View className="flex-1 items-end bg-transparent" >
                          <Ionicons
                            name="chevron-forward-outline"
                            size={26}
                            style={{
                              opacity: 0.3,
                            }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Link>
                  <View style={CustomStyles.separator} />
                  <Link
                    href={{
                      pathname: "/(tabs)/editProfile",
                    }}
                    asChild
                  >
                    <TouchableOpacity className="mt-1 pt-1 pb-1">
                      <View className="ml-1 flex-row bg-transparent">
                        <View className="flex-row mr-2 bg-transparent">
                          <Ionicons
                            name="person-outline"
                            size={24}
                            style={{ color: CustomColors.Bice_blue }}
                          />
                        </View>
                        <Text className="font-bold">
                          Mis Datos
                        </Text>
                        <View className="flex-1 items-end bg-transparent" >
                          <Ionicons
                            name="chevron-forward-outline"
                            size={26}
                            style={{
                              opacity: 0.3,
                            }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Link>
                  <View style={CustomStyles.separator} />
                  <TouchableOpacity className="mt-1 pt-1 pb-1"
                    onPress={() => {
                      setToken("");
                      deleteAllFromAsyncStorage();
                      emptyUser();
                      router.replace("/(tabs)");
                    }}>
                    <View className="ml-1 flex-row bg-transparent">
                      <View className="flex-row mr-2 bg-transparent">
                        <Ionicons
                          name="log-out-outline"
                          size={26}
                          style={{
                            color: CustomColors.Engineering_orange,
                          }}
                        />
                      </View>
                      <Text className="font-bold" style={{ color: CustomColors.Engineering_orange }}>
                        Cerrar Sesion
                      </Text>
                      <View className="flex-1 items-end bg-transparent" >
                        <Ionicons
                          name="chevron-forward-outline"
                          size={26}
                          style={{
                            opacity: 0.3,
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/*END OPTIONS */}
            </View>
            <View style={CustomStyles.separator} />


            {/* <View style={styles.separator} />
              <Link href="/(tabs)/myProfile" asChild>
                <TouchableOpacity style={[styles.container, styles.settingcard]}>
                  <View style={[styles.container, { gap: 12 }]}>
                    <Ionicons
                      name="home-outline"
                      size={26}
                      style={styles.colorcustom}
                    />
                    <Text style={[styles.settingtext, styles.colorcustom]}>
                      Mis Direcciones
                    </Text>
                    <View style={styles.arrowicon}>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={26}
                        style={{
                          opacity: 0.3,
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </Link> */}
            {/* <View style={styles.separator} />
              <Link href="/(tabs)/myProfile" asChild>
                <TouchableOpacity style={[styles.container, styles.settingcard]}>
                  <View style={[styles.container, { gap: 12 }]}>
                    <Ionicons
                      name="help-circle-outline"
                      size={26}
                      style={styles.colorcustom}
                    />
                    <Text style={[styles.settingtext, styles.colorcustom]}>
                      Ayuda
                    </Text>
                    <View style={styles.arrowicon}>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={26}
                        style={{
                          opacity: 0.3,
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </Link> */}

          </View>
        </>
      )}
    </>
  );
}
