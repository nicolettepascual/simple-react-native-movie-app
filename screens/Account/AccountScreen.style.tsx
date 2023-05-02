import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { colors } from "../../global/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 10,
  },
  poster: {
    margin: 5,
    marginRight: 10,
    flex: 1,
    justifyContent: "center",
    aspectRatio: 9 / 16,
  },
  movieItemView: {
    // borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  movieItemTitle: {
    fontWeight: "bold",
  },
  accountAvatar: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 150 / 2,
    overflow: "hidden",
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayBorderColor,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  settingValue: {
    fontSize: 16,
    color: colors.lightGray,
  },
  logoutButton: {
    backgroundColor: colors.red,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  logoutButtonText: {
    color: colors.red,
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutSetting: {
    borderTopWidth: 1,
    borderTopColor: colors.grayBorderColor,
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});
