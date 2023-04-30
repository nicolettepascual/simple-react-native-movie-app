import { View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../MovieDetailsScreen.style";
import { endpoints } from "../../../utils/endpoints";
import { globalStyles, paddingStyles } from "../../../global/styles";

export function MovieBackdrop({ movieDetails }: { movieDetails: Movie }) {
  return (
    <View style={styles.backdropView}>
      <Image
        style={styles.backdropImg}
        source={{
          uri: `${endpoints.images}${movieDetails?.backdrop_path}`,
        }}
      />
      <View style={styles.movieData}>
        <Text
          style={[globalStyles.paddingL15R15, styles.title, globalStyles.title]}
        >
          {movieDetails?.title}
        </Text>
        {movieDetails?.vote_average !== 0 && (
          <View
            style={[
              globalStyles.paddingL15R15,
              styles.voteAverageView,
              globalStyles.row,
              paddingStyles.paddingB15,
            ]}
          >
            <Ionicons name={"ios-star-sharp"} size={15} color={"deepskyblue"} />
            <Text style={[styles.voteAverageText]}>
              {(
                Math.round((movieDetails?.vote_average ?? 0) * 100) / 100
              ).toFixed(1)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
