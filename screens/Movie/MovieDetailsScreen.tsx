import { View, Text } from "react-native";
import { globalStyles } from "../../global/styles";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../Home/HomeScreen";

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
    <View style={globalStyles.container}>
      <Text>{movie.title}</Text>
      <Text>{movie.id}</Text>
    </View>
  );
}
