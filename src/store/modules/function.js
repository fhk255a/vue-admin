
// 功能性数据
const func = {
  state:{
    // 菜单的显示与隐藏
    collapse:false, 
  },
  mutations: {
    changeCollapse(state,collapse){
      state.collapse = collapse;
    },
  },
  actions: {
    changeCollapse(context, collapse){
      context.commit('changeCollapse', collapse);
    },
  }
}

export default func;