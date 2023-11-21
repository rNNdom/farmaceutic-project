import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

import Header from "~/components/Header";
import { SafeAreaView } from "~/components/Themed";

export default function MyProfile(props: any) {
  const _item = useRoute().params as any;

  return (
    <>
      <Header />
      <SafeAreaView>
        <Text>Mi Perfil</Text>
        <View>
          <View>
            <Text>Nombre</Text>
            <TextInput placeholder={_item.prf_name}></TextInput>
          </View>
          <View>
            <Text>Apellido</Text>
            <TextInput placeholder={_item.prf_lastname}></TextInput>
          </View>
          <View>
            <Text>Email</Text>
            <Text>{_item.prf_mail}</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
