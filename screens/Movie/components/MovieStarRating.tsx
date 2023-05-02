import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import Toast from "react-native-simple-toast";

import { debounce } from "lodash";
import { useMoviesContext } from "../../../global/context/moviesContext";
import { colors } from "../../../global/colors";
import { styles } from "../MovieDetailsScreen.style";

export function MovieStarRating({ movieId }: { movieId: number }) {
  const { postRating } = useMoviesContext();

  const [ratingText, setRatingText] = useState<number>(0);

  const debouncedRating = debounce(postRating, 1500);

  function handleOnRatingComplete(rating: number) {
    setRatingText(rating);
    debouncedRating(movieId, rating, rating === 0);
  }

  return (
    <>
      <View style={styles.ratingView}>
        <Text style={styles.ratingTitle}>
          {`${
            ratingText === 0 ? "Not Yet Rated" : `Your Rating: ${ratingText}/10`
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
        startingValue={ratingText}
        tintColor={colors.background}
      />
    </>
  );
}
