import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import product from './modules/product';
const store = new Vuex.Store({
  modules: {
    product
  },
});
export default store;