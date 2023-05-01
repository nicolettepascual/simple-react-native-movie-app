import { Dimensions, StatusBar, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
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
    borderBottomColor: "#ccc",
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  settingValue: {
    fontSize: 16,
    color: "#888",
  },
  logoutButton: {
    backgroundColor: "red",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  logoutButtonText: {
    color: "crimson",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutSetting: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});
