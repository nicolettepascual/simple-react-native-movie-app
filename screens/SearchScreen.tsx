import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../global/styles";
import { useSearchContext } from "../global/context/searchContext";
import { useEffect } from "react";
import { endpoints } from "../utils/endpoints";
import { request } from "../api/api";

export function SearchScreen() {
  const { searchResults, getSearchResults } = useSearchContext();

  async function handleOnPress() {
    getSearchResults("alien", 1);

    console.log(searchResults);
  }

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity onPress={handleOnPress}>
        <Text>Search Screen</Text>
      </TouchableOpacity>
    </View>
  );
}
