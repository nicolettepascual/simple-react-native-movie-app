import { View, Text, FlatList } from "react-native";
import { globalStyles, paddingStyles } from "../../../global/styles";

export function MovieReviews({ movieReviews }: { movieReviews: Review[] }) {
  return (
    <FlatList
      style={[globalStyles.paddingL15R15]}
      data={movieReviews}
      keyExtractor={(item) => item.id}
      // ListFooterComponent={<Footer isLoading={isLoading} />}
      removeClippedSubviews={true}
      renderItem={({ item }) => (
        <View>
          <Text>{`${item.content}`}</Text>
        </View>
      )}
    />
  );
}
