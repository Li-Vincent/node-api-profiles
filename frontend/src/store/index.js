import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
    isAuthenticated: false,  // 是否验证，登录成功
    user: null,
    profile: null, // 存储用户个人信息
    profiles: [], // 存储所有用户信息
    loading: false  // 是否处于请求状态
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})