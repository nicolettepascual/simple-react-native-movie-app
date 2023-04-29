import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../global/styles";
import { useAuthContext } from "../global/context/authContext";

export function ProfileScreen() {
  const { logout } = useAuthContext();

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
