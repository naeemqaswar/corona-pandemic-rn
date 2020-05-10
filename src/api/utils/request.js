import * as axios from "react-native-axios";

const showRequestLogs = false;

const request = async function (options, isHeader = false) {

    const baseURL = 'https://corona.lmao.ninja/';

    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    });

    const onSuccess = function (response) {

        if (showRequestLogs) console.log('Request Successful!', response);

        return response.data;
    };

    const onError = function (error) {
        console.log('Request Failed:', error.config);

        let _errorResponse;

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx

            _errorResponse = error.response;

            if (showRequestLogs) {

                console.log('Response:', error.response);
                // console.log('Status:', error.response.status);
                // console.log('Data:', error.response.data);
                // console.log('Headers:', error.response.headers);
            }

        } else {
            // Something else happened while setting up the request
            // triggered the error

            _errorResponse = error.message;

            if (showRequestLogs) console.log('Error Message:', error.message);
        }

        return Promise.reject(_errorResponse);
    };

    return client(options)
        .then(onSuccess)
        .catch(onError);
};

export default request;