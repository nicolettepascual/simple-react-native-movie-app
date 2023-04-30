import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const reviewStyles = StyleSheet.create({
  authorDetails: {
    paddingBottom: 5,
  },
  authorName: {
    fontWeight: "bold",
  },
  authorAvatarImg: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 150 / 2,
    overflow: "hidden",
    marginRight: 10,
  },
});
