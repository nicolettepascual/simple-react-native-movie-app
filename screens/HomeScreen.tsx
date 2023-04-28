import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../global/styles";
import { useContext, useEffect } from "react";
import { Asset } from "expo-asset";
import { useAuthContext } from "../global/context/authContext";

export function HomeScreen() {
  const { userToken, sessionId, logout } = useAuthContext();
  return (
    <View style={globalStyles.container}>
      {userToken && <Text>{`userToken: ${userToken}`}</Text>}
      {sessionId && <Text>{`sessionId: ${sessionId}`}</Text>}
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
