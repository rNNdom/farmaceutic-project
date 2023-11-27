import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { CustomColors } from "~/styles/CustomStyles";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">Modal</Text>
      <View
        className="my-8 h-px w-screen"
        lightColor={CustomColors.White}
        darkColor={CustomColors.Rich_black}
      />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}