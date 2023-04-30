import { StyleSheet } from "react-native";

export const paddingStyles = StyleSheet.create({
  padding15: { padding: 15 },
  paddingT15: {
    paddingTop: 15,
  },
  paddingB15: {
    paddingBottom: 15,
  },
  paddingR15: {
    paddingRight: 15,
  },
  paddingL15: {
    paddingLeft: 15,
  },
});

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
  },
  row: {
    flexDirection: "row",
    // alignItems: "center",
  },
  paddingT15B15: {
    ...paddingStyles.paddingT15,
    ...paddingStyles.paddingB15,
  },
  paddingL15R15: {
    ...paddingStyles.paddingL15,
    ...paddingStyles.paddingR15,
  },
});
