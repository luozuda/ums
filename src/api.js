import axios from 'axios'

var api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        'http://39.100.109.19:3000/api' :
        'http://localhost:3000/api'
})

//所有请求携带token和userName
api.interceptors.request.use(config => {
    config.headers.common["Authorization"] = localStorage.getItem("token");
    config.headers.common["userName"] = localStorage.getItem("userName");
    return config
})

export { api }