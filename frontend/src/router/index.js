import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Landing from '../components/Landing'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import CreateProfile from '../components/CreateProfile'
import EditProfile from '../components/EditProfile'
import AddEducation from '../components/AddEducation'
import AddExperience from '../components/AddExperience'
import Profiles from '../components/Profiles'
import Profile from '../components/profile/Profile'
import Posts from '../components/posts/Posts'
import Post from '../components/posts/Post'

const route = new Router({
    mode: 'history',
    linkActiveClass: "active",
    routes: [
        { path: '/', component: Landing },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/dashboard', component: Dashboard },
        { path: '/create-profile', component: CreateProfile },
        { path: '/edit-profile', component: EditProfile },
        { path: '/add-education', component: AddEducation },
        { path: '/add-experience', component: AddExperience },
        { path: '/profiles', component: Profiles },
        { path: '/profile/:handle', component: Profile },
        { path: '/posts', component: Posts },
        { path: '/posts/:post_id', component: Post },
        { path: '*', redirect: '/' }
    ]
})

route.beforeEach((to, from, next) => {
    // 判断token
    const isLogin = localStorage.jwtToken ? true : false
    if (to.path == "/login" || to.path == "/") {
        next()
    } else if (to.path == "/register") {
        // 如果处于登录状态，则跳转到登录页面
        isLogin ? next("/login") : next()
    } else {
        isLogin ? next() : next("/login")
    }
})

export default route