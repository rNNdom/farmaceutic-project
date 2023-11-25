import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 32,
    backgroundColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#1969a3",
    color: "#fff",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 50,
    fontSize: 10,
    // minWidth: 16,
    textAlign: "center",
  },
});
