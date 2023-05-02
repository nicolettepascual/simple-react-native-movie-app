import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import Toast from "react-native-simple-toast";

import { debounce } from "lodash";
import { useMoviesContext } from "../../../global/context/moviesContext";
import { colors } from "../../../global/colors";
import { styles } from "../MovieDetailsScreen.style";
import { useAccountContext } from "../../../global/context/accountContext";

export function MovieStarRating({ movieId }: { movieId: number }) {
  const {
    postRating,
    currentMovieId,
    isCurrentMovieRated,
    currentMovieRating,
  } = useMoviesContext();

  const { ratedMovies, getRatedMovies } = useAccountContext();
  const [ratingText, setRatingText] = useState<number>(0);

  const debouncedRating = debounce(postRating, 1500);

  function handleOnRatingComplete(rating: number) {
    setRatingText(rating);
    debouncedRating(movieId, rating, rating === 0);
  }

  /** FIXME: revise solution for re-checking/re-fetching of rated movies;
   * advisable to use states and updates on moviesContext
   */
  useEffect(() => {
    const fetchRatedMovies = async () => {
      await getRatedMovies();
    };

    if (ratedMovies.length === 0) {
      fetchRatedMovies();
    } else {
      /** Note: I know this is an expensive call -- for revision */
      const interval = setInterval(function () {
        fetchRatedMovies();
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isCurrentMovieRated, currentMovieRating, ratedMovies, currentMovieId]);

  return (
    <>
      <View style={styles.ratingView}>
        <Text style={styles.ratingTitle}>
          {`${
            currentMovieRating === 0
              ? "Not Yet Rated"
              : `Your Rating: ${currentMovieRating}/10`
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
        ratingColor={colors.primary}
        ratingBackgroundColor={colors.lightGray}
        ratingCount={10}
        imageSize={30}
        jumpValue={0.5}
        fractions={1}
        startingValue={currentMovieRating}
        tintColor={colors.background}
      />
    </>
  );
}
