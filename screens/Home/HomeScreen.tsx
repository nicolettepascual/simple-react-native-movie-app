import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useMoviesContext } from "../../global/context/moviesContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styles } from "./HomeScreen.styles";
import {
  AddToWatchlistHeaderBtn,
  MovieDetailsScreen,
} from "../Movie/MovieDetailsScreen";
import { Footer } from "./components/Footer";
import { MoviePoster } from "./components/MoviePoster";
import Ionicons from "@expo/vector-icons/Ionicons";

import Toast from "react-native-simple-toast";
import { colors } from "../../global/colors";
import { useAccountContext } from "../../global/context/accountContext";

export type HomeStackParamList = {
  HomeScreen: undefined;
  MovieDetails: { movie: Movie };
};

function HomeScreen() {
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
        keyExtractor={(item, index) => `${item.id.toString()}_${index}`}
        numColumns={2}
        onEndReached={onEndReached}
        ListFooterComponent={<Footer isLoading={isLoading} />}
        removeClippedSubviews={true}
        renderItem={({ item }) => <MoviePoster movie={item} />}
      />
    </SafeAreaView>
  );
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
export function HomeStackScreen() {
  const {
    movieDetails,
    currentMovieId,
    isCurrentMovieInWatchlist,
    postToWatchList,
  } = useMoviesContext();

  const { watchlist } = useAccountContext();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Trending" }}
      />
      <HomeStack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={({ route }) => ({
          title: route.params.movie.title,
          headerRight: () => <AddToWatchlistHeaderBtn />,
        })}
      />
    </HomeStack.Navigator>
  );
}
