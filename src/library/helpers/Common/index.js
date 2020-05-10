import {Platform} from "react-native";

export const ucFirst = (str) => str.charAt(0).toUpperCase() + str.substr(1);

export const formatTime = (time) => {   // In Seconds

    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
};

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const timeDifference = (date1, date2) => {

    if (date2 < date1) {
        date2.setDate(date2.getDate() + 1);
    }

    var msec = date2 - date1;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    return {
        hours: hh,
        minutes: mm,
        seconds: ss,
        milliseconds: msec,
    };
};

export const timeDifferenceString = (date1, date2) => {
    let _timeDifference = timeDifference(date1, date2);

    return `${_timeDifference.hours}:${_timeDifference.minutes}:${_timeDifference.seconds}`;
};

export const convertUrlToHttps = url => {

    if(url && typeof url === 'string'){
        return url.replace("http://", "https://");
    }

    return url;
};