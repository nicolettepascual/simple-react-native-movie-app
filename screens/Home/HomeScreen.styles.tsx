import { Dimensions, StatusBar, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  flatListView: {
    flex: 1,
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
    width: width * 0.2,
    height: height * 0.5,
    aspectRatio: 9 / 16,
  },
});
