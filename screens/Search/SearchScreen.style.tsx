import { Dimensions, StatusBar, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: width,
    height: height,
  },
  flatListView: {
    flex: 1,
  },
  flatList: {
    width: width,
    height: height,
  },
  poster: {
    margin: 10,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: width * 0.1,
    height: height * 0.4,
    aspectRatio: 9 / 16,
  },
  indicatorWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {},
  indicatorText: {
    fontSize: 18,
    marginLeft: 5,
  },
});
