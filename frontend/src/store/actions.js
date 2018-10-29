export const setIsAuthenticated = ({ commit }, data) => {
    commit('setIsAuthenticated', data)
}
export const setUser = ({ commit }, data) => {
    commit('setUser', data)
}
export const setProfile = ({ commit }, data) => {
    commit('setProfile', data)
}
export const clearCurrentState = ({ commit }, data) => {
    commit('setIsAuthenticated', false)
    commit('setUser', {})
    commit('setProfile', {})
}
export const setLoading = ({ commit }, data) => {
    commit('setLoading', data)
}