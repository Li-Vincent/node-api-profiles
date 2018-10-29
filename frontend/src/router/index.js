import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Landing from '../components/Landing'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'

const route = new Router({
    mode: 'history',
    linkActiveClass: "active",
    routes: [
        { path: '/', component: Landing },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/dashboard', component: Dashboard },
        { path: '*', redirect: '/' }
    ]
})

route.beforeEach((to, from, next) => {
    // 判断token
    const isLogin = localStorage.jwtToken ? true : false
    if (to.path == "/login" || to.path == "/register" || to.path == "/") {
        next()
    } else {
        isLogin ? next() : next("/login")
    }
})

export default route