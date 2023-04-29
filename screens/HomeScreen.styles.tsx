import { Dimensions, StatusBar, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: StatusBar.currentHeight,
  },
  logout: {
    height: 50,
    width: 55,
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  flatListView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  flatList: {
    margin: 0,
    padding: 0,
    width: width,
    height: height,
  },
  poster: {
    margin: 10,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: 150, //width * 0.2,
    height: 300, //width * 0.5,
  },
});
