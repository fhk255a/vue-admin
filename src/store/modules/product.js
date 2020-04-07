const product = {
  state: {
    category:[],
    shopList:[],
  },
  mutations: {
    category(state,category){
      state.category = category;
    },
    productShop(state,shopList){
      state.shopList = shopList;
    }
  },
  actions: {
    changeCategory(context,category){
      context.commit('category', category);
    },
    changeProductShop(context,shopList){
      context.commit('productShop', shopList);
    },
  }
}

export default product;