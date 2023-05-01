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
import { useAccountContext } from "../../global/context/accountContext";
import { getAvatarPath } from "../../utils/global";
import { globalStyles, paddingStyles } from "../../global/styles";

export function AccountScreen() {
  const { account, getAccountDetails } = useAccountContext();
  const { logout } = useAuthContext();

  const settings = [
    { title: "Ratings", value: ">" },
    { title: "Watchlist", value: ">" },
  ];

  const handleSettingPress = (index: number) => {
    console.log(settings[index]);
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
