import { StyleSheet, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";

import Header from "~/components/Header";
import { setToken, api } from "~/utils/api";
import { Ionicons, Text, View } from "../../components/Themed";
import { deleteAllFromAsyncStorage } from "~/components/storage";
import { UserContext } from "~/components/userContext";
import { useContext, useEffect } from "react";
import Loading from "~/components/loading";


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

  useEffect(() => {
    if (getProfile.isSuccess) {
      addProfile(getProfile.data)
    }
    getProfile.isError && console.log(getProfile.error.message);
  }, [getProfile.isSuccess, getProfile.isError, profile]);


  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'PENDING':
        return 'yellow';
      case 'DELIVERING':
        return '#1969a3'; // colorcustom
      case 'DELIVERED':
        return 'green';
      case 'CANCELED':
        return 'red';
      default:
        return '#1969a3'; // colorcustom
    }
  };

  return (
    <>
      {getProfile.isLoading ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              backgroundColor: "#fff",
              height: "100%",
            }}
          >
            <Header />
            <View
              style={{
                paddingHorizontal: 12,
                paddingTop: 8,
                paddingBottom: 18,
              }}
            >
              <Text style={[styles.title, styles.colorcustom]}>
                Hola, {profile?.prf_name} {profile?.prf_lastname}
              </Text>
            </View>

            <View style={styles.card}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                Ultimo pedido:
                <Text
                  style={[
                    styles.settingtext,
                    {
                      fontWeight: "500",
                      gap: 12,
                      color: getStatusColor(lastOrder.data?.order_status),
                    }
                  ]}
                >
                  {lastOrder.data?.order_status}
                </Text>
              </Text>
              <View
                style={[
                  styles.container,
                  {
                    gap: 18,
                  },
                ]}
              >
                <View>
                  <View>
                    <Text
                      style={{
                        opacity: 0.5,

                      }}
                    >
                      Realizado el: {lastOrder.data?.order_date_of_ord.toLocaleDateString("es-419", options)}
                    </Text>
                  </View>
                  <View style={[
                    styles.container,
                    {
                      gap: 12,
                      flexDirection: "row",
                    },
                  ]}>
                    <View >
                      <Ionicons
                        name="time-outline"
                        size={26}
                        style={{
                          opacity: 0.3,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        opacity: 0.5,
                        fontWeight: "bold"
                      }}
                    >
                      {lastOrder.data?.order_date_of_ord.toLocaleTimeString("es-419")}
                    </Text>
                  </View>
                </View>
              </View>
              <Link href={{
                pathname: "/(tabs)/productOrderDetails",
                params: { ...lastOrder.data?.OrderDetail.at(0) }
              }}
                asChild
              >
                <TouchableOpacity style={[styles.container, styles.settingcard, styles.ordercard]}>
                  <View
                    style={[
                      styles.container,
                      {
                        gap: 12,
                      },
                    ]}
                  >
                    <Ionicons
                      name="eye-outline"
                      size={24}
                      style={styles.colorcustom}
                    />
                    <Text style={[styles.settingtext, styles.colorcustom]}>
                      Hacer Seguimiento
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
              </Link>
            </View>

            <View
              style={{
                flex: 1,
                paddingVertical: 12,
              }}
            >
              <View style={styles.separator} />
              <Link
                href={{
                  pathname: "/(tabs)/myOrders",
                }}
                asChild
              >
                <TouchableOpacity style={[styles.container, styles.settingcard]}>
                  <View
                    style={[
                      styles.container,
                      {
                        gap: 12,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Ionicons
                      name="cart-outline"
                      size={26}
                      style={styles.colorcustom}
                    />
                    <Text style={[styles.settingtext, styles.colorcustom]}>
                      Mis Pedidos
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
              </Link>
              <View style={styles.separator} />
              <Link
                href={{
                  pathname: "/(tabs)/editProfile",
                }}
                asChild
              >
                <TouchableOpacity style={[styles.container, styles.settingcard]}>
                  <View
                    style={[
                      styles.container,
                      {
                        gap: 12,
                      },
                    ]}
                  >
                    <Ionicons
                      name="person-outline"
                      size={24}
                      style={styles.colorcustom}
                    />
                    <Text style={[styles.settingtext, styles.colorcustom]}>
                      Mis Datos
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
              </Link>
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
              <View style={styles.separator} />
              <TouchableOpacity style={[styles.container, styles.settingcard]}
                onPress={() => {
                  setToken("");
                  deleteAllFromAsyncStorage();
                  emptyUser();
                  router.replace("/(tabs)");
                }}>
                <View style={[styles.container, { gap: 12 }]}>
                  <Ionicons
                    name="log-out-outline"
                    size={26}
                    style={{
                      color: "#ff0000",
                    }}
                  />
                  <Text style={[styles.container, { gap: 19, color: "#ff0000" }]}>
                    Cerrar Sesion
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={26}
                  style={{
                    opacity: 0.3,
                  }}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "500",
  },
  separator: {
    height: 0.8,
    width: "100%",
    marginVertical: 8,
    backgroundColor: "#1969a3",
  },
  home: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  current: {
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 18,
    marginVertical: 8,
    opacity: 0.5,
  },
  colorcustom: {
    color: "#1969a3",
  },
  image: {
    width: 150,
    height: 150,
  },
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  ordercard: {
    gap: 12,
    paddingVertical: 8,
    backgroundColor: "#1969a3ba",
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 12,

  },
  settingcard: {
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "flex-end",
    width: "100%",
  },
  settingtext: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  arrowicon: {
    position: "absolute",
    right: 0,
    marginRight: 12,
    backgroundColor: "transparent"
  },
});
