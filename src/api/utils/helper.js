import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../library/Storage';

export const setAuthUser = async (user, key = 'user') => {

    if(Array.isArray(user) || typeof user === 'object'){
        user = JSON.stringify(user);
    }

    return Storage.set(key, user);
};

export const getAuthUser = async (key = 'user') => {
    return Storage.get(key);
};

export const logoutAuthUser = async (key = 'user') => {
    await Storage.remove(key);
};