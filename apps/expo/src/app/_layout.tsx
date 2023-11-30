import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { TRPCProvider } from "~/utils/api";
import { CartProvider } from "../components/context";
import { UserContext, UserProvider } from "~/components/userContext";
import { getTokenFromAsyncStorage, getContentFromAsyncStorage, deleteAllFromAsyncStorage } from "~/components/storage";

// ----------

import {
  ErrorBoundary,
} from "expo-router";


export const unstable_settings = {
  initialRouteName: "(tabs)/profile",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...(FontAwesome.font as unknown as Record<string, unknown>),
  });

  const { addUser, addToken } = useContext(UserContext);



  useEffect(() => {
    getTokenFromAsyncStorage("@token").then((res) => {
      if (res) {
        addToken(res);
        getContentFromAsyncStorage("@user").then((res2) => {
          if (res2) {
            addUser(res2);
          }
        });
      }
    });
  }, []);


  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

// --------

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [role, setRole] = useState('');

  useLayoutEffect(() => {
    const fetchRole = async () => {
      const user = await getContentFromAsyncStorage("@user");
      setRole(user?.usr_role || '');

    };

    fetchRole();
  }, []);
  return (

    <TRPCProvider>
      <SafeAreaProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <UserProvider>
            <CartProvider>
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="(auth)"
                  options={{
                    headerShown: false,
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="modal"
                  options={{
                    presentation: "modal",
                    animation: "slide_from_bottom",
                  }}
                />
                <Stack.Screen
                  name="(repartidor)"
                  options={{
                    headerShown: false,
                    animation: "slide_from_right",
                  }}
                />
              </Stack>
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
}
