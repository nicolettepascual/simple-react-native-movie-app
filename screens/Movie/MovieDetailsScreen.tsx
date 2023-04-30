import { View, Text, Image, ActivityIndicator } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../Home/HomeScreen";
import { endpoints } from "../../utils/endpoints";
import { globalStyles, paddingStyles } from "../../global/styles";
import { styles } from "./MovieDetailsScreen.style";
import Ionicons from "@expo/vector-icons/Ionicons";
import ISO6391 from "iso-639-1";
import { useEffect, useState } from "react";
import { useMoviesContext } from "../../global/context/moviesContext";

type MovieDetailsScreenRouteProp = RouteProp<
  HomeStackParamList,
  "MovieDetails"
>;

type MovieDetailsProps = {
  route: MovieDetailsScreenRouteProp;
};

export function MovieDetailsScreen({ route }: MovieDetailsProps) {
  const { movie } = route.params;
  const { movieDetails, getMovieDetails } = useMoviesContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  function minsToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  function parseGenres(genres: { name: string }[]) {
    const genreNames = genres.slice(0, 3).map((genre) => genre.name);
    return genreNames.join(", ");
  }

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      await getMovieDetails(`${movie.id}`).then(() => setIsLoading(false));
    };

    fetchDetails();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size={"large"} style={styles.loadingIndicator} />
      ) : (
        <>
          <View style={styles.backdropView}>
            <Image
              style={styles.backdropImg}
              source={{
                uri: `${endpoints.images}${movieDetails?.backdrop_path}`,
              }}
            />
            <View style={styles.movieData}>
              <Text
                style={[
                  globalStyles.paddingL15R15,
                  styles.title,
                  globalStyles.title,
                ]}
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
                  <Ionicons
                    name={"ios-star-sharp"}
                    size={15}
                    color={"deepskyblue"}
                  />
                  <Text style={[styles.voteAverageText]}>
                    {(
                      Math.round((movieDetails?.vote_average ?? 0) * 100) / 100
                    ).toFixed(1)}
                  </Text>
                </View>
              )}
            </View>
          </View>

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

          <View style={[globalStyles.paddingL15R15]}>
            <Text style={[styles.movieDetailsTitle]}>Synopsis</Text>
            <Text style={[styles.overview]}>{movieDetails?.overview}</Text>
          </View>
        </>
      )}
    </View>
  );
}
