import axios from 'axios'
import store from './store'

var api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        'http://39.100.109.19:3000' :
        'http://localhost:3000'
})

//post默认请求头
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//请求处理
api.interceptors.request.use(config => {
    var token = localStorage.getItem('token')
    if (token) {
        config.headers.common["Authorization"] = token;//请求携带token
    }
    return config
})

//响应处理
api.interceptors.response.use(res => {
    if (res.data.code != 0) {//错误返回码
        return Promise.reject(res.data.msg)
    }
    return res
}, err => {
    if (err.response.status == 403) {//token无效或过期
        store.commit('logout')
    }
    return Promise.reject(err.response.data.msg)
})

export { api }