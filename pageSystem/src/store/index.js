import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    // 设置属性
    state: {
      isLogin: window.localStorage.getItem('isLogin') ? window.localStorage.getItem('isLogin') : false,
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


// export const store = new Vuex.Store({
//     // 设置属性
//     state: {
//      isLogin: false,
//     },
   
//     // 获取属性的状态
//     getters: {
//      //获取登录状态
//      isLogin: state => state.isLogin,
//     },
   
//     // 设置属性状态
//     mutations: {
//      //保存登录状态
//      userStatus(state, flag) {
//       state.isLogin = flag
//      },
//     },
   
//     // 应用mutations
//     actions: {
//      //获取登录状态
//      setUser({commit}, flag) {
//       commit("userStatus", flag)
//      },
//     }
//    })