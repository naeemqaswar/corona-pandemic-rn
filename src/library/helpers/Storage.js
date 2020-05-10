import * as SecureStore from 'expo-secure-store';

const save = async (key, value) => {
    try{
        return SecureStore.setItemAsync(key, value);
    } catch(err){
        console.log('AsyncStorage save: err', err);
        return false;
    }
};

const get = async (key) => {
    try{
        return SecureStore.getItemAsync(key);
    } catch(err){
        console.log('AsyncStorage get: err', err);
        return false;
    }
};

export default { save, get };
