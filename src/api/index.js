import {GET, POST} from "./utils/actions";
import * as uri from './URIs';

export const fetchAll = (callback) => {

    GET(uri.ALL)
        .then((response) => {
            // console.log('fetchAll:', response);

            callback(false, response);
        })
        .catch(error => {
            console.log('Error:', error);

            callback(true);
        });
};

export const fetchCountries = (callback) => {

    GET(uri.COUNTRIES)
        .then((response) => {
            // console.log('fetchCountries:', response);

            const {active, cases, continent, } = response;

            callback(false, response);
        })
        .catch(error => {
            console.log('Error:', error);

            callback(true);
        });
};