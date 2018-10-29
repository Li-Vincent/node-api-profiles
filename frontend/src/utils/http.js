import axios from 'axios'
import store from '../store'

//使用axios 设置请求拦截，设置统一的header
axios.interceptors.request.use(config => {
    store.dispatch("setLoading", true)
    if (localStorage.jwtToken) {
        config.headers.Authorization = localStorage.jwtToken
    }
    return config
})

//使用axios 设置响应拦截，设置统一的header
axios.interceptors.response.use(response => {
    store.dispatch("setLoading", false)
    return response
}, error => {
    store.dispatch("setLoading", false)
})
export default axios