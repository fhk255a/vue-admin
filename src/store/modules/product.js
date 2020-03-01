import PRODUCT from '../data/product';
const product = {
  state: {
    list:PRODUCT,
  },
  mutations: {
    changeProductList(state,list){
      state.list = list;
    }
  },
  actions: {
    changeProductList(context, list){
      context.commit('changeProductList', list);
    }
  }
}

export default product;