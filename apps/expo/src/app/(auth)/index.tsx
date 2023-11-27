
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { CustomColors } from "~/styles/CustomStyles";

export default function IndexAuth() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-base">idenx auth</Text>
      <View className="-ml-2 -mr-2 h-px w-screen"
        lightColor={CustomColors.White}
        darkColor={CustomColors.Rich_black}
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

