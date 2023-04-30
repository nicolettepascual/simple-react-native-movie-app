import { View, Text, Image } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../Home/HomeScreen";
import { endpoints } from "../../utils/endpoints";
import { globalStyles } from "../../global/styles";
import { styles } from "./MovieDetailsScreen.style";
import Ionicons from "@expo/vector-icons/Ionicons";
import ISO6391 from "iso-639-1";

type MovieDetailsScreenRouteProp = RouteProp<
  HomeStackParamList,
  "MovieDetails"
>;

type MovieDetailsProps = {
  route: MovieDetailsScreenRouteProp;
};

export function MovieDetailsScreen({ route }: MovieDetailsProps) {
  const { movie } = route.params;

  return (
    <View>
      <View style={styles.backdropView}>
        <Image
          style={styles.backdropImg}
          source={{
            uri: `${endpoints.images}${movie.backdrop_path}`,
          }}
        />
        <View style={styles.movieData}>
          <Text style={[styles.padding5, styles.title, globalStyles.title]}>
            {movie.title}
          </Text>
          {movie.vote_average !== 0 && (
            <View
              style={[
                styles.padding5,
                styles.voteAverageView,
                globalStyles.row,
              ]}
            >
              <Ionicons
                name={"ios-star-sharp"}
                size={15}
                color={"deepskyblue"}
              />
              <Text style={[styles.padding5, styles.voteAverageText]}>
                {(Math.round(movie.vote_average * 100) / 100).toFixed(1)}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={[globalStyles.row]}>
        <View style={styles.movieDetailsCol}>
          <Text style={[styles.movieDetailsTitle]}>Duration</Text>
          <Text style={[styles.overview]}>1h 2m</Text>
        </View>
        <View style={styles.movieDetailsCol}>
          <Text style={[styles.movieDetailsTitle]}>Genre</Text>
          <Text style={[styles.overview]}>Action</Text>
        </View>
        <View style={styles.movieDetailsCol}>
          <Text style={[styles.movieDetailsTitle]}>Language</Text>
          <Text style={[styles.overview]}>
            {ISO6391.getName(movie.original_language)}
          </Text>
        </View>
      </View>

      <View style={[styles.padding5]}>
        <Text style={[styles.movieDetailsTitle]}>Synopsis</Text>
        <Text style={[styles.overview]}>{movie.overview}</Text>
      </View>
    </View>
  );
}
