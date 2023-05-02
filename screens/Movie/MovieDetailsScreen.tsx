import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp } from "@react-navigation/native";

import { HomeStackParamList } from "../Home/HomeScreen";
import { styles } from "./MovieDetailsScreen.style";
import { useMoviesContext } from "../../global/context/moviesContext";

import { MovieBackdrop } from "./components/MovieBackdrop";
import { MovieDetailsRow } from "./components/MovieDetailsRow";
import { MovieSynopsis } from "./components/MovieSynopsis";
import { MovieReviews } from "./components/MovieReviews";
import { MovieStarRating } from "./components/MovieStarRating";
import { useAccountContext } from "../../global/context/accountContext";

type MovieDetailsScreenRouteProp = RouteProp<
  HomeStackParamList,
  "MovieDetails"
>;

type MovieDetailsProps = {
  route: MovieDetailsScreenRouteProp;
};

export function AddToWatchlistHeaderBtn() {
  const { currentMovieId, isCurrentMovieInWatchlist, postToWatchList } =
    useMoviesContext();

  const { watchlist, getWatchlist } = useAccountContext();

  useEffect(() => {
    const fetchWatchlist = async () => {
      await getWatchlist();
    };

    if (watchlist?.length === 0) fetchWatchlist();
  }, [currentMovieId, watchlist]);

  return (
    <TouchableOpacity
      onPress={async () => {
        if (currentMovieId)
          postToWatchList(currentMovieId, !isCurrentMovieInWatchlist);
      }}
      style={{ marginRight: 10 }}
    >
      <Ionicons
        name={
          isCurrentMovieInWatchlist ? "ios-heart-sharp" : "ios-heart-outline"
        }
        size={24}
        color="deepskyblue"
      />
    </TouchableOpacity>
  );
}

export function MovieDetailsScreen({ route }: MovieDetailsProps) {
  const { movie } = route.params;
  // FIXME: create enums for keys
  const movieDetailsScreenComponents = [
    { key: "backdrop" },
    { key: "detailsRow" },
    { key: "synopsis" },
    { key: "rating" },
    { key: "reviews" },
  ];

  const {
    movieDetails,
    movieReviews,
    currentMovieId,
    getMovieDetails,
    getMovieReviews,
  } = useMoviesContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      await getMovieDetails(`${movie.id}`).then(() => {
        setIsLoading(false);
      });
    };

    if (movie.id !== currentMovieId) fetchDetails();
    else setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      await getMovieReviews(`${movie.id}`).then(() => {
        setIsLoading(false);
      });
    };

    if (movie.id !== currentMovieId) fetchReviews();
    else setIsLoading(false);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading || !movieDetails ? (
        <ActivityIndicator size={"large"} style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={movieDetailsScreenComponents}
          renderItem={({ item }) => {
            switch (item.key) {
              case "backdrop":
                return <MovieBackdrop movieDetails={movieDetails} />;
              case "detailsRow":
                return <MovieDetailsRow movieDetails={movieDetails} />;
              case "synopsis":
                return <MovieSynopsis movieDetails={movieDetails} />;
              case "rating":
                return <MovieStarRating movieId={movie.id} />;
              case "reviews":
                return (
                  <>
                    {movieReviews && movieReviews?.length != 0 ? (
                      <MovieReviews movieReviews={movieReviews} />
                    ) : (
                      <></>
                    )}
                  </>
                );

              default:
                return <></>;
            }
          }}
        />
      )}
    </View>
  );
}
