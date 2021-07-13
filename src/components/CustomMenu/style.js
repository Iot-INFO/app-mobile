import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("screen").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: "100%",
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    height: height * (15 / 100),
    paddingTop: "15%",
    // backgroundColor: "red",
  },

  infoPersonView: {
    height: height * (15 / 100),
    // backgroundColor: "#CCC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },

  initialLetterNameView: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "#077B6E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  initialLetterNameText: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "700",
  },

  usernameText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },

  emailUserText: {
    fontSize: 16
  },

  listMenu: {
    height: height * (60 / 100),
    // backgroundColor: "blue",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 20,
  },

  buttonMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  labelButton: {
    fontSize: 16,
  },
});
