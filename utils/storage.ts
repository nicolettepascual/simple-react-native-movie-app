import AsyncStorage from "@react-native-async-storage/async-storage";

/** For the purpose of simple authentication flow, session ID is stored
 * in local storage but I know it's recommended to use a secure storage solution
 * for sensitive data such as session IDs*/
export const SESSION_ID_STORAGE_KEY = "sessionId";

export const storeToLocalData = async (key: string, sessionId: string) => {
  try {
    await AsyncStorage.setItem(key, sessionId);
    console.log(`${key} stored from local storage`);
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
  }
};

// Retrieve the session ID from local storage
export const getLocalData = async (key: string) => {
  try {
    const sessionId = await AsyncStorage.getItem(key);
    return sessionId;
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
};

// Remove the session ID from local storage
export const removeFromLocalData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`${key} removed from local storage`);
  } catch (error) {
    console.log(`Error removing ${key} from local storage:`, error);
  }
};
