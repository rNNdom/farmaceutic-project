import AsyncStorage from "@react-native-async-storage/async-storage";

export const getContentFromAsyncStorage = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : [];

    } catch (e) {
        console.log(e);
    }
};
export const getTokenFromAsyncStorage = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        // error reading value
        console.log(e);
    }
};

export const setContentAsyncStorage = async (value: any, key: string) => {
    try {
        const jsonValue = JSON.stringify(value);
        AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
        console.log(e);
    }
};
export const setTokenAsyncStorage = async (value: any, key: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
        console.log(e);
    }
};

export const deleteAllFromAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        // clear error
        console.log(e);
    }
};

export const deleteFromAsyncStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        // clear error
        console.log(e);
    }
};