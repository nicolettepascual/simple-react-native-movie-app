import {
  FlatList,
  SafeAreaView,
  StyleProp,
  Text,
  ViewStyle,
} from "react-native";
import { globalStyles } from "../styles";
import { styles } from "../../screens/Account/AccountScreen.style";
import { RenderMovieItem } from "./RenderMovieItem";

export function MovieItemFlatList({
  movies,
  customStyle,
}: {
  movies: Movie[];
  customStyle?: ViewStyle[];
}) {
  return (
    <FlatList
      style={[globalStyles.paddingL15R15, ...(customStyle || [])]}
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      // onEndReached={onEndReached}
      // ListFooterComponent={<Footer isLoading={isLoading} />}
      removeClippedSubviews={true}
      renderItem={({ item }) => <RenderMovieItem movie={item} />}
    />
  );
}
