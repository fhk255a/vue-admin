import PRODUCT from '../data/product';
import SHOP from '../data/productShop';
const product = {
  state: {
    category:[],
    shopList:{
      "code": 200,
      "msg": "success",
      "data":SHOP.records.sort(()=>.5 - Math.random())
    },
  },
  mutations: {
    changeProductList(state,list){
      state.list = list;
    },
    productInfo(state,info){
      state.details.info = info;
    },
    category(state,category){
      state.category = category;
    },
    productShop(state,shopList){
      state.shopList.data = shopList;
    }
  },
  actions: {
    changeProductList(context, list){
      context.commit('changeProductList', list);
    },
    changeProductInfo(context,info){
      context.commit('productInfo', info);
    },
    changeCategory(context,category){
      context.commit('category', category);
    },
    changeProductShop(context,shopList){
      context.commit('productShop', shopList);
    },
  }
}

export default product;