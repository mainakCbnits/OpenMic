import {AsyncStorage} from "react-native";
export const KEY_NAMES = {
    LOGIN_STATUS : "LOGIN_STATUS",
    USER_DETAILS: "USER_DETAILS"

    // USER_ID: "USER_ID",
    // USER_EMAIL: "USER_EMAIL",
    // USER_ROLE_ID: "USER_ROLE_ID",
    // USER_FIRST_NAME: "USER_FIRST_NAME",
    // USER_LAST_NAME: "USER_LAST_NAME",
    // USER_IMAGE: "USER_IMAGE",
    // USER_COVER_IMAGE: "USER_COVER_IMAGE",

  };

export const SAVE_LOCAL_STORAGE = async (stringKey,stringValue) => {
    return await AsyncStorage.setItem(stringKey,stringValue);
};

export const FETCH_LOCAL_STORAGE = async (stringKey) => {
    return await AsyncStorage.getItem(stringKey);
};

export const CLEAR_LOCAL_STORAGE = async () => {
    return await AsyncStorage.clear();
};