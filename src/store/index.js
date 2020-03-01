import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import dialog from './modules/dialog';
import product from './modules/product';
import order from './modules/order';
import func from './modules/function';
const store = new Vuex.Store({
  modules: {
    dialog,
    product,
    order,
    func
  },
});
export default store;