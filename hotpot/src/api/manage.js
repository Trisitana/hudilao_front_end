import axios from "axios"

//ip地址
axios.defaults.baseURL = "http://192.168.121.155:8082";

export const getAction = (url, params) => {
    return axios({
        url: url,
        method: 'get',
        params: params,
    })
}

export const postAction = (url, params,data) => {
    return axios({
        url: url,
        method: 'post',
        params: params,
        data:data   
    })
}

export const deleteAction = (url, params) => {
    return axios({
        url: url,
        method: 'delete',
        params: params
    })
}

export const putAction = (url, params) => {
    return axios({
        url: url,
        method:'put',
        data: params
    })
}
