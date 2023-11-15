import { StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Text } from "../../components/Themed";

export default function ListCatHeader(data: any) {
  return (
    <>
      <Text style={styles.money}>Medicamentos</Text>
      <FlatList
        data={data.data}
        //   ListHeaderComponent={
        //
        //   }
        horizontal={true}
        style={{ marginHorizontal: 10, marginVertical: 10 }}
        contentContainerStyle={{ alignItems: "center", gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#1969a3",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#1969a3",
  },

  money: {
    marginHorizontal: 10,
    color: "#1969a3",
    fontWeight: "bold",
    fontSize: 20,
  },
});
