import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useMoviesContext } from "../../global/context/moviesContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styles } from "./HomeScreen.styles";
import { MovieDetailsScreen } from "../Movie/MovieDetailsScreen";
import { Footer } from "./components/Footer";
import { MoviePoster } from "./components/MoviePoster";
import Ionicons from "@expo/vector-icons/Ionicons";

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
        keyExtractor={(item) => item.id.toString()}
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
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={({ route }) => ({
          title: route.params.movie.title,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("Watchlist")}
              style={{ marginRight: 10 }}
            >
              <Ionicons
                name="ios-heart-outline"
                size={24}
                color="deepskyblue"
              />
            </TouchableOpacity>
          ),
        })}
      />
    </HomeStack.Navigator>
  );
}
