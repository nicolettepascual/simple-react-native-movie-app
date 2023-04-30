import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "../HomeScreen.styles";

export function Footer({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator color={"deepskyblue"} style={styles.indicator} />
        <Text style={styles.indicatorText}>Loading...</Text>
      </View>
    );
  }
  return null;
}
