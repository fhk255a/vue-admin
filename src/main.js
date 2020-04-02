// 基础配置
import Vue from 'vue'
import store from './store';
import request from './lib/axios';
import App from './App'
import router from './router'
// UI & 自定义样式 
import './assets/css/common.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局方法
import './lib/func';
// 加载默认图
import loadImg from './lib/directive';
Vue.use(ElementUI);
Vue.directive('load-img', loadImg);
Vue.prototype.$request = request;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
