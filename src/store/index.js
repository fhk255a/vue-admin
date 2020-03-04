import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import dialog from './modules/dialog';
import product from './modules/product';
import order from './modules/order';
import func from './modules/function';
import competence from './modules/competence'; // 权限
import userInfo from './modules/userInfo'; // 权限
const store = new Vuex.Store({
  modules: {
    dialog,
    product,
    order,
    func,
    competence,
    userInfo,
  },
});
export default store;