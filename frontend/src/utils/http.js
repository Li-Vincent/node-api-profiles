import axios from 'axios';

//使用axios 设置请求拦截，设置统一的header
axios.interceptors.request.use(config => {
    if (localStorage.jwtToken) {
        config.headers.Authorization = localStorage.jwtToken;
    }
    return config;
})

export default axios;