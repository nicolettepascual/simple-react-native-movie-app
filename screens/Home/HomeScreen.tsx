import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useMoviesContext } from "../../global/context/moviesContext";
import { styles } from "./HomeScreen.styles";
import { endpoints } from "../../utils/endpoints";

function MoviePoster({ item }: { item: Movie }) {
  return (
    <Image
      style={styles.poster}
      source={{
        uri: `${endpoints.images}${item.poster_path}`,
      }}
    />
  );
}

function Footer({ isLoading }: { isLoading: boolean }) {
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

export function HomeScreen() {
  const { trendingMovies, currentPage, setCurrentPage, getTrendingMovies } =
    useMoviesContext();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTrendingMovies(currentPage).then(() => setIsLoading(false));
  }, [currentPage]);

  const onEndReached = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        style={styles.flatList}
        data={trendingMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        onEndReached={onEndReached}
        ListFooterComponent={<Footer isLoading={isLoading} />}
        removeClippedSubviews={true}
        renderItem={({ item }) => <MoviePoster item={item} />}
      />
    </SafeAreaView>
  );
}
