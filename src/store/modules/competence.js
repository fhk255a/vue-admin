import routes from '@/router/routes';
import userList from '../data/user';
import SOURCE from '../data/resource';
function initRoute(data,path=''){
  return data.map(item=>{
    item.path=path+item.path;
    item.icon=item.icon?item.icon:'';
    item.children=item.children?item.children:[];
    if(item.children && item.children.length>0){
      initRoute(item.children,item.path+'/',item);
      return item;
    }
    return item;
  })
}
const allRoutes = initRoute(routes);
const competence = {
  state:{
    userList:userList.data,
    roleList:[
      {
        id:'1',
        name:'普通用户',
        resource:[],
        menu:["/product", "/product/list", "/product/details", "/product/shop"],
        remark:'只可浏览不可操作',
        createTime:1582137230000,
        createUser:'Joker',
        createUserId:10000,
      },
      {
        id:'2',
        name:'商品管理员',
        resource:[
          'product::list::edit',
          'product::list::remove',
          'product::list::status',
          'product::details::skuStatus',
          'product::details::editJianJie',
          'product::details::editDetails',
          'product::details::save'
        ],
        menu: ["/product", "/product/list", "/product/details", "/product/shop"],
        remark:'可以操作商品模块',
        createTime:1582180668000,
        createUser:'Joker',
        createUserId:10000,
      },
      {
        id:'3',
        name:'订单管理员',
        resource:[
          'order::list::cancel',
        ],
        menu:["/order", "/order/list", "/order/details"],
        remark:'可以操作订单模块',
        createTime:1582180668000,
        createUser:'Joker',
        createUserId:10000,
      },
      {
        id:'8888',
        name:'管理员',
        resource:[
          'competence::user::edit',
          'competence::user::remove',
          'competence::user::add',
          'competence::user::status',
          'product::list::edit',
          'order::list::cancel',
          'product::list::remove',
          'product::list::status',
          'product::details::skuStatus',
          'product::details::editJianJie',
          'product::details::editDetails',
          'product::details::save',
        ],
        menu: ["/product", "/product/list", "/product/details", "/product/shop", "/order", "/order/list", "/order/details", "/competence/user", "/competence/menu", "/competence/resource"],
        remark:'大部分可以操作',
        createTime:1582137663000,
        createUser:'Joker',
        createUserId:10000,
      },
      {
        id:'9999',
        name:'超级管理员',
        resource:[
          'competence::user::edit',
          'competence::user::remove',
          'competence::user::add',
          'competence::user::status',
          'product::list::edit',
          'product::list::remove',
          'order::list::cancel',
          'product::list::status',
          'product::details::skuStatus',
          'product::details::editJianJie',
          'product::details::editDetails',
          'product::details::save',
          'competence::user::edit',
          'competence::user::remove',
          'competence::user::add',
          'competence::user::status',
          'competence::role::edit',
          'competence::role::remove',
          'competence::role::add',
          'competence::role::menu',
          'competence::role::resource',
        ],
        menu:["/product", "/product/list", "/product/details", "/product/shop", "/order", "/order/list", "/order/details", "/competence", "/competence/user", "/competence/role", "/competence/menu", "/competence/resource"],
        remark:'一看就很厉害',
        createTime:1582107045000,
        createUser:'Joker',
        createUserId:10000,
      },
    ],
    menuList:allRoutes,
    resource:SOURCE
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
    resourceList(state,resource){
      state.resource = resource;
    },
  },
  actions:{
    changeUserList(context,userList){
      context.commit('userList',userList);
    },
    changeRoleList(context,roleList){
      context.commit('roleList',roleList);
    },
    changeMenuList(context,menuList){
      context.commit('menuList',menuList);
    },
    changeResourceList(context,resource){
      context.commit('resourceList',resource);
    },
  }
}
export default competence;