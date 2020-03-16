import list from '../data/pageList.js';
import componentLib from '../data/componentLib.js';
const page = {
  state:{
    config:{},
    componentIndex:null,
    components:[],
    compData:{},
    list:list,
    componentLib:componentLib,
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
    compData(state,compData){
      state.compData = compData;
    },
    componentLib(state,list){
      state.componentLib.splice(list.index,1,list.data);
    },
    list(state,list){
      state.list=list;
    }
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
    changeCompData(context, compData){
      context.commit('compData',compData);
    },
    changeComponentLib(context, list){
      context.commit('componentLib',list);
    },
    changePageList(context, list){
      context.commit('list',list);
    },
  }
}

export default page;