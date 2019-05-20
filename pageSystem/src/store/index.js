import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    // 设置属性
    state: {
      isLogin: window.localStorage.getItem('loginStatus') ? window.localStorage.getItem('loginStatus') : false,
    },

    // 设置属性状态
    mutations: {
      //修改登录状态
      changeLogin(state, value) {
        state.isLogin = value
      },
    },
  
    // 应用mutations
    actions: {
      //获取登录状态
      
    }
  })