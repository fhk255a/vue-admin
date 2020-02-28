const product = {
  state: {
    list:[],
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