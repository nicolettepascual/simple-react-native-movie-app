import { FlatList, SafeAreaView, Text, View } from "react-native";
import { styles } from "../AccountScreen.style";
import { globalStyles, paddingStyles } from "../../../global/styles";
import { useAccountContext } from "../../../global/context/accountContext";
import { useEffect } from "react";

export function Watchlist() {
  const { watchlist, getWatchlist } = useAccountContext();

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Watchlist</Text>
      <FlatList
        // style={styles.flatList}
        data={watchlist}
        keyExtractor={(item) => item.id.toString()}
        // onEndReached={onEndReached}
        // ListFooterComponent={<Footer isLoading={isLoading} />}
        removeClippedSubviews={true}
        renderItem={({ item }) => <Text>{item.original_title}</Text>}
      />
    </SafeAreaView>
  );
}
