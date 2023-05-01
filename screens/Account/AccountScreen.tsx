import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./AccountScreen.style";
import { useAuthContext } from "../../global/context/authContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAvatarPath } from "../../utils/global";
import { globalStyles, paddingStyles } from "../../global/styles";
import { useMoviesContext } from "../../global/context/moviesContext";
import { useAccountContext } from "../../global/context/accountContext";

export function AccountScreen() {
  const { logout, account, getAccountDetails } = useAuthContext();
  const { watchlist, ratedMovies, getRatedMovies, getWatchlist } =
    useAccountContext();

  const settings = [
    { title: "Ratings", key: "ratings" },
    { title: "Watchlist", key: "watchlist" },
  ];

  const handleSettingPress = async (index: number) => {
    if (settings[index].key === "ratings") {
      await getRatedMovies();
    } else if (settings[index].key === "watchlist") {
      await getWatchlist();
    }
  };

  useEffect(() => {
    console.log(ratedMovies);
  }, [ratedMovies]);

  useEffect(() => {
    console.log(watchlist);
  }, [watchlist]);

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
