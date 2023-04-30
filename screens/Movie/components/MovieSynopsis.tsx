import { View, Text } from "react-native";
import { globalStyles } from "../../../global/styles";
import { styles } from "../MovieDetailsScreen.style";

export function MovieSynopsis({ movieDetails }: { movieDetails: Movie }) {
  return (
    <View style={[globalStyles.paddingL15R15]}>
      <Text style={[styles.movieDetailsTitle]}>Synopsis</Text>
      <Text style={[styles.overview]}>{movieDetails?.overview}</Text>
    </View>
  );
}
