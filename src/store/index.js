import { createStore } from "vuex";

export default createStore({
  state: {
    userName:"",
    systemTitle:"智能数据分析",
    // 0:中文  1:英文
    systemLanguage:0,
    loginFlag:0,
    base_url:"http://10.62.141.130:5000",
  },
  mutations: {
    // 定义mutations，用于修改状态(同步)
    updateUserName (state, payload) {
      state.userName = payload
    },
    updateSystemTitle (state, payload) {
      state.systemTitle = payload
    },
    updateSystemLanguage (state, payload) {
      state.systemLanguage = payload
    },
    updateLoginFlag (state, payload) {
      state.loginFlag = payload
    }
  },
  actions: {
    // 定义actions，用于修改状态(异步)
    // 2秒后更新状态
    updateUserName (context, payload) {
      setTimeout(() => {
        context.commit('updateInfo', payload)
      }, 2000)
    },
    updateSystemTitle (context, payload) {
      setTimeout(() => {
        context.commit('updateInfo', payload)
      }, 2000)
    },
    updateSystemLanguage (context, payload) {
      setTimeout(() => {
        context.commit('updateInfo', payload)
      }, 2000)
    },
    updateLoginFlag (context, payload) {
      setTimeout(() => {
        context.commit('updateInfo', payload)
      }, 2000)
    }
  },
  getters: {
    getUserName (state) {
      return state.userName
    },
    getSystemTitle (state) {
      return state.systemTitle
    },
    getSystemLanguage (state) {
      return state.systemLanguage
    },
    getLoginFlag (state) {
      return state.loginFlag
    }
  },
  modules: {},
});