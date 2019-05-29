
import Vue from 'vue';
import App from './App';
import router from './router';
import  store from './store/index.js'
import Axios from 'axios';
// 引入 ElementUI 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '../static/common.css';

// 引入app组件
Vue.config.productionTip = false

Vue.use(ElementUI);
// 挂载axios，便于组件使用
Vue.prototype.$axios = Axios;
// Axios.defaults.baseURL = 'http://localhost:8000';  this.$store.state.

router.beforeEach((to, from, next) => {

    //获取用户登录成功后储存的登录标志
    let isLogin = window.localStorage.getItem("isLogin");
    console.log(isLogin)
   
    //如果登录标志存在且为isLogin，即用户已登录
    if(isLogin === 'true'){
        console.log(1111111)
        //设置vuex登录状态为已登录
        // this.$store.commit('changeLogin',true)
        next()
        //如果已登录，还想想进入登录注册界面，则定向回首页
        if (!to.meta.isLogin) {
            console.log(22222)
        //    this.$message('请先退出登录')
            alert("请先退出登录")
            next({
            path: '/home'
            })
        }
    //如果登录标志不存在，即未登录
    }else{
        console.log(33333)
     //用户想进入需要登录的页面，则定向回登录界面
     if(to.meta.isLogin){
        // this.$message('请先登录')
        alert("请先登录")
        next({
            path: '/login',
        })
     //用户进入无需登录的界面，则跳转继续
     }else{
        console.log(4444)
      next()
     }
   
    }
   
   });
   
   router.afterEach(route => {
    window.scroll(0, 0);
   });

// 创建vue实例，并将组件挂载到实例中
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
