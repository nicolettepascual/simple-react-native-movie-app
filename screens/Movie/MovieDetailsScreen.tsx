import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../Home/HomeScreen";
import { styles } from "./MovieDetailsScreen.style";
import { useEffect, useState } from "react";
import { useMoviesContext } from "../../global/context/moviesContext";
import { MovieBackdrop } from "./components/MovieBackdrop";
import { MovieDetailsRow } from "./components/MovieDetailsRow";
import { MovieSynopsis } from "./components/MovieSynopsis";
import { MovieReviews } from "./components/MovieReviews";

type MovieDetailsScreenRouteProp = RouteProp<
  HomeStackParamList,
  "MovieDetails"
>;

type MovieDetailsProps = {
  route: MovieDetailsScreenRouteProp;
};

export function MovieDetailsScreen({ route }: MovieDetailsProps) {
  const { movie } = route.params;
  const movieDetailsScreenComponents = [
    { key: "backdrop" },
    { key: "detailsRow" },
    { key: "synopsis" },
    { key: "reviews" },
  ];
  const {
    movieDetails,
    movieReviews,
    getMovieDetails,
    getMovieReviews,
    postRating,
  } = useMoviesContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      await getMovieDetails(`${movie.id}`).then(() => {
        setIsLoading(false);
      });
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      await getMovieReviews(`${movie.id}`).then(() => {
        setIsLoading(false);
      });
    };

    fetchReviews();

    console.log(movieReviews?.length);
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
              case "reviews":
                return (
                  <>
                    {movieReviews && movieReviews?.length != 0 ? (
                      <>
                        <TouchableOpacity
                          onPress={() => postRating(movie.id, 9.5)}
                        >
                          <Text>Rate</Text>
                        </TouchableOpacity>
                        <MovieReviews movieReviews={movieReviews} />
                      </>
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
