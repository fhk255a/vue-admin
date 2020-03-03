import routes from '@/router/routes';
import userList from '../data/user';
const competence = {
  state:{
    userList:userList.data,
    roleList:[
      {
        id:1,
        name:'普通用户',
        resource:[],
        menu:[],
        createTime:1582137230000,
        createUser:'Joker',
        createUserId:10000,
      },
      {
        id:2,
        name:'商品管理员',
        resource:[],
        menu:[],
        createTime:1582180668000,
        createUser:'Joker',
        createUserId:10000,
      },
      {
        id:3,
        name:'订单管理员',
        resource:[],
        menu:[],
        createTime:1582180668000,
        createUser:'Joker',
        createUserId:10000,
      },
      {
        id:8888,
        name:'管理员',
        resource:[],
        menu:[],
        createTime:1582137663000,
        createUser:'Joker',
        createUserId:10000,
      },
      {
        id:9999,
        name:'超级管理员',
        resource:[],
        menu:[],
        createTime:1582107045000,
        createUser:'Joker',
        createUserId:10000,
      },
    ],
    menuList:routes,
  },
  mutations:{
    userList(state,userList){
      state.userList = userList;
    },
    roleList(state,roleList){
      state.roleList = roleList;
    },
    menuList(state,menuList){
      state.menuList = menuList;
    },
  },
  actions:{
    changeUserList(context,userList){
      context.commit('changeUserList',userList);
    },
    changeRoleList(context,roleList){
      context.commit('changeRoleList',roleList);
    },
    changeMenuList(context,menuList){
      context.commit('changeMenuList',menuList);
    },
  }
}
export default competence;