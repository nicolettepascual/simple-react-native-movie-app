import { Dimensions, StatusBar, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    width: width,
    height: height,
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
});
