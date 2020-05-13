export const parseJSON = (content) => {
    try {
        return JSON.parse(content);
    } catch (error) {
        return false;
    }
    return true;
};

export const numWithCommas = x => x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;

export const objectToArray = (obj) => {
    return Object.keys(obj).map(function(key) {
        return obj[key];
    });
}