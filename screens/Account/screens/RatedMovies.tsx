import { FlatList, SafeAreaView, Text, View } from "react-native";
import { styles } from "../AccountScreen.style";
import { globalStyles, paddingStyles } from "../../../global/styles";
import { useAccountContext } from "../../../global/context/accountContext";
import { useEffect } from "react";

export function RatedMovies() {
  const { ratedMovies, getRatedMovies } = useAccountContext();

  useEffect(() => {
    getRatedMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rated Movies</Text>
      <FlatList
        // style={styles.flatList}
        data={ratedMovies}
        keyExtractor={(item) => item.id.toString()}
        // onEndReached={onEndReached}
        // ListFooterComponent={<Footer isLoading={isLoading} />}
        removeClippedSubviews={true}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </SafeAreaView>
  );
}
