
// 功能性数据
const func = {
  state:{
    // 菜单的显示与隐藏
    collapse:false, 
    loading:false,
    productDialog:false,
  },
  mutations: {
    changeCollapse(state,collapse){
      state.collapse = collapse;
    },
    loading(state,loading){
      state.loading = loading;
    },
    productDialog(state,productDialog){
      state.productDialog = productDialog;
    },
  },
  actions: {
    changeCollapse(context, collapse){
      context.commit('changeCollapse', collapse);
    },
    loading(context,loading){
      context.commit('loading', loading);
    },
    productDialog(context,productDialog){
      context.commit('productDialog', productDialog);
    }
  }
}

export default func;