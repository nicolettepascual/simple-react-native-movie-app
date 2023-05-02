import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { styles } from "../AccountScreen.style";
import { globalStyles, paddingStyles } from "../../../global/styles";
import { useAccountContext } from "../../../global/context/accountContext";
import { useEffect } from "react";
import { endpoints } from "../../../utils/endpoints";
import { RenderMovieItem } from "../../../global/components/RenderMovieItem";
import { MovieItemFlatList } from "../../../global/components/MovieItemFlatList";

export function RatedMovies() {
  const { ratedMovies, getRatedMovies } = useAccountContext();

  useEffect(() => {
    getRatedMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rated Movies</Text>
      <MovieItemFlatList movies={ratedMovies} />
    </SafeAreaView>
  );
}
