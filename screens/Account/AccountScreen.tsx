import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./AccountScreen.style";
import { useAuthContext } from "../../global/context/authContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAvatarPath } from "../../utils/global";
import { globalStyles, paddingStyles } from "../../global/styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RatedMovies } from "./screens/RatedMovies";
import { Watchlist } from "./screens/Watchlist";
import { useNavigation } from "@react-navigation/native";

function AccountScreen() {
  const { logout, account, getAccountDetails } = useAuthContext();
  const navigation = useNavigation();

  const settings = [
    { title: "Rated Movies", key: "ratings" },
    { title: "Watchlist", key: "watchlist" },
  ];

  const handleSettingPress = async (index: number) => {
    if (settings[index].key === "ratings") {
      navigation.navigate("RatedMovies" as never);
    } else if (settings[index].key === "watchlist") {
      navigation.navigate("Watchlist" as never);
    }
  };

  useEffect(() => {
    const fetchAccountDetails = async () => {
      await getAccountDetails();
    };

    fetchAccountDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account</Text>

      <View style={[paddingStyles.padding15, globalStyles.row]}>
        <Image
          style={[styles.accountAvatar]}
          source={{
            uri: getAvatarPath(account?.avatarPath),
          }}
        />
        <View>
          <Text style={[globalStyles.title, styles.username]}>
            {account?.username}
          </Text>
          <Text>Account ID: {account?.accountId}</Text>
        </View>
      </View>

      {settings.map((setting, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.setting]}
          onPress={() => handleSettingPress(index)}
        >
          <Text style={styles.settingTitle}>{setting.title}</Text>
          <Ionicons name={"arrow-forward-sharp"} size={20} color={"#888"} />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.setting, styles.logoutSetting]}
        onPress={logout}
      >
        <Text style={[styles.settingTitle, styles.logoutButtonText]}>
          Logout
        </Text>
        <Text style={styles.settingValue}>{">"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const AccountStack = createNativeStackNavigator();
export function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="RatedMovies"
        component={RatedMovies}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="Watchlist"
        component={Watchlist}
        options={{ headerShown: false }}
      />
    </AccountStack.Navigator>
  );
}
