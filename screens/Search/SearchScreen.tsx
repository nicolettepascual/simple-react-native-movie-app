import { SafeAreaView, View } from "react-native";
import { globalStyles } from "../../global/styles";
import { useSearchContext } from "../../global/context/searchContext";
import SearchBar from "react-native-dynamic-search-bar";
import { styles } from "./SearchScreen.style";
import { debounce } from "lodash";
import { MovieItemFlatList } from "../../global/components/MovieItemFlatList";

export function SearchScreen() {
  const { searchResults, getSearchResults } = useSearchContext();

  const debouncedSearch = debounce(getSearchResults, 1500);

  function handleOnChangeText(text: string) {
    debouncedSearch(text, 1);
  }

  return (
    <View style={[globalStyles.container, styles.safeAreaView]}>
      <SearchBar
        placeholder="Search here"
        onChangeText={(text) => handleOnChangeText(text)}
      />
      <MovieItemFlatList
        movies={searchResults.slice(0, 5)}
        customStyle={[styles.flatList]}
      />
    </View>
  );
}
