// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store';
import request from './lib/axios';
import App from './App'
import router from './router'
import './assets/css/common.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './lib/func';
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
