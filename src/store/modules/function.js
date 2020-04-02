
// 功能性数据
const func = {
  state:{
    // 菜单的显示与隐藏
    collapse:false, 
    loading:false
  },
  mutations: {
    changeCollapse(state,collapse){
      state.collapse = collapse;
    },
    loading(state,loading){
      state.loading = loading;
    },
  },
  actions: {
    changeCollapse(context, collapse){
      context.commit('changeCollapse', collapse);
    },
    loading(context,loading){
      context.commit('loading', loading);
    }
  }
}

export default func;