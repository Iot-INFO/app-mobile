import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  callout: {
    width: 250,
  },

  vagaName: {
    fontSize: 18,
    fontWeight: "700",
  },

  descriptionVaga: {
    fontSize: 16,
    marginTop: 5,
  },

  floatingActionButton: {
    position: "absolute",
    zIndex: 5,
    bottom: 20,
    right: 20,
  },

  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  viewOpenDrawer: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 5,
  },
});

export default styles;
