import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../HomeScreen.styles";
import { endpoints } from "../../../utils/endpoints";

export function MoviePoster({ movie }: { movie: Movie }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MovieDetails" as never, { movie } as never)
      }
    >
      <Image
        style={styles.poster}
        source={{
          uri: `${endpoints.images}${movie.poster_path}`,
        }}
      />
    </TouchableOpacity>
  );
}
