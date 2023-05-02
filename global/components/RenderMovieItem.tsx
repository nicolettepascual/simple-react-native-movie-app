import { Image, Text, View } from "react-native";
import { globalStyles } from "../styles";
import { styles } from "../../screens/Account/AccountScreen.style";
import { endpoints } from "../../utils/endpoints";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function RenderMovieItem({ movie }: { movie: Movie }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("MovieDetails" as never, { movie } as never);
      }}
    >
      <View style={[styles.movieItemView, globalStyles.row]}>
        <Image
          style={styles.poster}
          source={{
            uri: `${endpoints.images}${movie.poster_path}`,
          }}
        />
        <View style={{ flex: 2 }}>
          <Text style={styles.movieItemTitle}>{movie.title}</Text>
          <View style={[globalStyles.row]}>
            <Text>{movie.release_date}</Text>
            <Text>{` | ${movie.original_language}`}</Text>
          </View>
          <View style={{ position: "absolute", bottom: 15 }}>
            <Text>Vote Average: {movie.vote_average}</Text>
            {movie?.rating && <Text>Your Rating: {movie.rating}</Text>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
