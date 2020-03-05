const page = {
  state:{
    config:{},
    componentIndex:null,
    components:[],
  },
  mutations: {
    pageConfig(state,config){
      state.config = config;
    },
    pageComponents(state,components){
      state.components = components;
    },
    pageComponentsItem(state,components,index){
      state.components[index] = components;
    },
    componentIndex(state,componentIndex){
      state.componentIndex = componentIndex;
    },
  },
  actions: {
    changePageConfig(context, config){
      context.commit('pageConfig', config);
    },
    changePageComponents(context, components){
      context.commit('pageComponents', components);
    },
    changePageComponentsItem(context, components,index){
      context.commit('pageComponentsItem', components,index);
    },
    changeComponentIndex(context, index){
      context.commit('componentIndex',index);
    },
  }
}

export default page;