import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { globalStyles } from "../../global/styles";
import { useSearchContext } from "../../global/context/searchContext";
import { useEffect } from "react";
import { endpoints } from "../../utils/endpoints";
import { request } from "../../api/api";
import SearchBar from "react-native-dynamic-search-bar";
import { styles } from "./SearchScreen.style";
import { debounce } from "lodash";

export function SearchScreen() {
  const { searchResults, getSearchResults } = useSearchContext();

  const debouncedSearch = debounce(getSearchResults, 1500);

  function handleOnChangeText(text: string) {
    debouncedSearch(text, 1);
  }

  return (
    <SafeAreaView style={[globalStyles.container, styles.safeAreaView]}>
      <SearchBar
        placeholder="Search here"
        onChangeText={(text) => handleOnChangeText(text)}
      />
      <FlatList
        // style={styles.flatList}
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        // onEndReached={onEndReached}
        // ListFooterComponent={<Footer isLoading={isLoading} />}
        removeClippedSubviews={true}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </SafeAreaView>
  );
}
