import { Dimensions, StatusBar, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  backdropView: {
    backgroundColor: "black",
  },
  backdropImg: {
    width: width,
    height: height * 0.3,
    aspectRatio: 16 / 9,
    opacity: 0.6,
  },
  movieData: {
    position: "absolute",
    bottom: 0,
  },
  title: {
    color: "white",
    paddingBottom: 0,
  },
  overview: {
    textAlign: "justify",
  },
  voteAverageText: {
    color: "white",
    paddingLeft: 5,
  },
  voteAverageView: {
    paddingTop: 0,
  },
  movieDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  movieDetailsCol: {
    paddingRight: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  genreCol: {
    flexShrink: 1,
    textAlign: "justify",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
