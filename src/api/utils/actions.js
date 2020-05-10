import request from "./request";

export const GET = (URI) => {
    return request({url: URI, method: 'GET'});
};

export const POST = (URI, data) => {
    return request({
        url: URI,
        method: 'POST',
        data: convertToVirtualFormPost(data)
    });
};

const convertToVirtualFormPost = (data) => {

    if(Object.keys(data).length > 0){
        const formData = new FormData();

        for(let key in data){
            formData.append(key, data[key]) ;
        }
        return formData;
    }
    return {};
};