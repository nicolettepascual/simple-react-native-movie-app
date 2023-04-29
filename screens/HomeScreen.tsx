import {
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  View,
} from "react-native";
import { useEffect } from "react";
import { useAuthContext } from "../global/context/authContext";
import { useMoviesContext } from "../global/context/moviesContext";
import { styles } from "./HomeScreen.styles";
import { endpoints } from "../utils/endpoints";

export function HomeScreen() {
  const { userToken, sessionId, logout } = useAuthContext();
  const { trendingMovies, getTrendingMovies } = useMoviesContext();

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <View style={styles.flatListView}>
        <FlatList
          style={styles.flatList}
          data={trendingMovies}
          renderItem={({ item }) => (
            <Image
              style={styles.poster}
              source={{
                uri: `${endpoints.images}${item.poster_path}`,
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}
