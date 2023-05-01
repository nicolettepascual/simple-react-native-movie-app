import React, { useState } from "react";
import {
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

export function AccountScreen() {
  const { logout } = useAuthContext();

  const settings = [
    { title: "Ratings", value: ">" },
    { title: "Watchlist", value: ">" },
  ];

  const handleSettingPress = (index: number) => {
    console.log(settings[index]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account</Text>
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
