
import Vue from 'vue';
import App from './App';
import router from './router';
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
// Axios.defaults.baseURL = 'http://localhost:8000';

// 创建vue实例，并将组件挂载到实例中
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
