import React from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
    >
      <TRPCProvider>
        <SafeAreaProvider>
          <SignedIn>
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#f472b6",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            {/* 
            AQUÍ VA SU COMPONENTE DE LOGIN */}
            <View className="flex-1">
              <Text>Sign in</Text>
            </View>
          </SignedOut>
          <StatusBar />
        </SafeAreaProvider>
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
