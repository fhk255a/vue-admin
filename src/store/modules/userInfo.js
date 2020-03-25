// console.log(Cookie.has('vue-admin-userInfo'));
const userInfo = {
  state:{
    // 凭证
    token:null,
    // 用户信息
    userInfo:null,
    // 用户的菜单
    menu:null,
    // 用户的资源
    resource:null,
  },
  mutations:{
    token(state,token){
      state.token = token;
    },
    userInfo(state,userInfo){
      state.userInfo = userInfo;
    },
    menu(state,menu){
      state.menu = menu;
    },
    resource(state,resource){
      state.resource = resource;
    },
  },
  actions:{
    changeToken(context,token){
      context.commit('token',token);
    },
    changeUserInfo(context,userInfo){
      context.commit('userInfo',userInfo);
    },
    changeUserMenu(context,menu){
      context.commit('menu',menu);
    },
    changeUserResource(context,resource){
      context.commit('resource',resource);
    },
  }
}
export default userInfo;