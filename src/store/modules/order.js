import ORDER from '../data/order';
import DETAILS from '../data/orderDetails';
const order = {
  state:{
    list:ORDER,
    details:DETAILS,
  },
  mutations: {
    changeOrderList(state,list){
      state.list = list;
    },
    changeOrderDetails(state,details){
      state.details = details;
    },
  },
  actions: {
    changeOrderList(context, list){
      context.commit('changeOrderList', list);
    },
    changeOrderDetails(context,details){
      context.commit('changeOrderDetails', details);
    },
  }
}

export default order;