const func = {
  state:{
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