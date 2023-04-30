import { View, Text, FlatList, Image } from "react-native";
import { globalStyles, paddingStyles } from "../../../global/styles";
import { styles } from "../MovieDetailsScreen.style";
import { reviewStyles } from "./MovieReview.styles";
import { endpoints } from "../../../utils/endpoints";

export function MovieReviews({ movieReviews }: { movieReviews: Review[] }) {
  function getAvatarPath(path: string) {
    if (!path) return "undefined";
    if (path.substring(0, 9) !== "/https://")
      return `${endpoints.images}${path}`;
    else return path.substring(1);
  }

  function convertDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <View style={[globalStyles.paddingL15R15]}>
      <Text style={[styles.movieDetailsTitle]}>Reviews</Text>
      <FlatList
        data={movieReviews}
        keyExtractor={(item) => item.id}
        // ListFooterComponent={<Footer isLoading={isLoading} />}
        removeClippedSubviews={true}
        renderItem={({ item }) => (
          <View style={[paddingStyles.paddingB15]}>
            <View style={[globalStyles.row, reviewStyles.authorDetails]}>
              {item.author_details.avatar_path && (
                <Image
                  style={[reviewStyles.authorAvatarImg]}
                  source={{
                    uri: getAvatarPath(item.author_details.avatar_path),
                  }}
                />
              )}
              <View>
                <Text style={[reviewStyles.authorName]}>
                  {item.author_details.username}
                </Text>
                <Text>{convertDate(item.created_at)}</Text>
              </View>
            </View>
            <Text style={{ textAlign: "justify" }}>{`${item.content}`}</Text>
          </View>
        )}
      />
    </View>
  );
}
