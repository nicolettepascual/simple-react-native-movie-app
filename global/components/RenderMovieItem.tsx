import { Image, Text, View } from "react-native";
import { globalStyles } from "../styles";
import { styles } from "../../screens/Account/AccountScreen.style";
import { endpoints } from "../../utils/endpoints";

export function RenderMovieItem({ movie }: { movie: Movie }) {
  return (
    <View style={[styles.movieItemView, globalStyles.row]}>
      <Image
        style={styles.poster}
        // style={{
        //   margin: 5,
        //   marginRight: 10,
        //   flex: 1,
        //   justifyContent: "center",
        //   width: 100,
        //   height: 150,
        //   aspectRatio: 9 / 16,
        // }}
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
  );
}
