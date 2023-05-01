import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import Toast from "react-native-simple-toast";

import { HomeStackParamList } from "../Home/HomeScreen";
import { styles } from "./MovieDetailsScreen.style";
import { useMoviesContext } from "../../global/context/moviesContext";

import { MovieBackdrop } from "./components/MovieBackdrop";
import { MovieDetailsRow } from "./components/MovieDetailsRow";
import { MovieSynopsis } from "./components/MovieSynopsis";
import { MovieReviews } from "./components/MovieReviews";
import { debounce } from "lodash";

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
    { key: "rating" },
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
  const [ratingText, setRatingText] = useState<number>(0);

  const debouncedRating = debounce(postRating, 1500);

  function handleOnRatingComplete(rating: number) {
    setRatingText(rating);
    debouncedRating(movie.id, rating, rating === 0);
    Toast.show(
      rating === 0
        ? "Your rating has been deleted"
        : "Your Rating has been posted",
      Toast.CENTER
    );
  }

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
              case "rating":
                return (
                  <>
                    <View style={styles.ratingView}>
                      <Text style={styles.ratingTitle}>
                        Your Rating:{" "}
                        {`${
                          ratingText === 0
                            ? "Not Yet Rated"
                            : `${ratingText}/10`
                        } `}
                      </Text>
                    </View>
                    <Rating
                      onFinishRating={(rating: number) => {
                        handleOnRatingComplete(rating);
                      }}
                      onSwipeRating={(rating: number) => {
                        setRatingText(rating);
                      }}
                      type="custom"
                      ratingColor="deepskyblue"
                      ratingBackgroundColor="#c8c7c8"
                      ratingCount={10}
                      imageSize={30}
                      jumpValue={0.5}
                      fractions={1}
                      startingValue={ratingText}
                      tintColor="#efefef"
                    />
                  </>
                );
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
