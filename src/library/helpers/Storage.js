import * as SecureStore from 'expo-secure-store';

const save = async (key, value, encoded = false) => {
    try{
        return SecureStore.setItemAsync(key, 
            encoded ? JSON.stringify(value) : value
        );
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
