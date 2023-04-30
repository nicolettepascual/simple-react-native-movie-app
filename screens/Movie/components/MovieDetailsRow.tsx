import { View, Text } from "react-native";
import ISO6391 from "iso-639-1";
import { globalStyles, paddingStyles } from "../../../global/styles";
import { styles } from "../MovieDetailsScreen.style";

export function MovieDetailsRow({ movieDetails }: { movieDetails: Movie }) {
  function minsToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  function parseGenres(genres: { name: string }[]) {
    const genreNames = genres.slice(0, 3).map((genre) => genre.name);
    return genreNames.join(", ");
  }

  return (
    <View style={[globalStyles.row, paddingStyles.padding15]}>
      <View style={styles.movieDetailsCol}>
        <Text style={[styles.movieDetailsTitle]}>Duration</Text>
        <Text style={[styles.overview]}>
          {minsToHours(movieDetails?.runtime ?? 0)}
        </Text>
      </View>
      <View style={[styles.movieDetailsCol, styles.genreCol]}>
        <Text style={[styles.movieDetailsTitle]}>Genre</Text>
        <Text style={[styles.overview]}>
          {parseGenres(movieDetails?.genres ?? [])}
        </Text>
      </View>
      <View style={styles.movieDetailsCol}>
        <Text style={[styles.movieDetailsTitle]}>Language</Text>
        <Text style={[styles.overview]}>
          {ISO6391.getName(movieDetails?.original_language ?? "")}
        </Text>
      </View>
    </View>
  );
}
