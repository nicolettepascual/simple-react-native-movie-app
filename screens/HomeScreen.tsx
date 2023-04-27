import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../global/styles";
import request from "../api/api";
import { useContext, useEffect } from "react";
import { Asset } from "expo-asset";
import { useAuthContext } from "../global/context/authContext";

export function HomeScreen() {
  const { userToken, logout } = useAuthContext();
  return (
    <View style={globalStyles.container}>
      {userToken && <Text>{userToken}</Text>}
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
