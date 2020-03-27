import Vue from 'vue'
import Router from 'vue-router'
import routeList from './routes';
import Layout from '@/page/layout';
import Cookie from '@/lib/cookie';
import VUEX from '@/store';
import STORE from '@/lib/store';

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
// 默认路由表
const staticRouteMap = [
  // 登录页
  {
    path: '/login',
    name: 'login',
    hide: true,
    meta: {
      title: 'Login'
    },
    component: () => import('@/page/function/login.vue')
  },
  // dev
  {
    path: '/dev',
    name: '/dev',
    hide: true,
    meta: {
      title: 'dev'
    },
    component: () => import('@/components/Medias.vue')
  },
  // 404
  {
    path: '/404',
    name: '/404',
    hide: true,
    meta: {
      title: '404'
    },
    component: () => import('@/page/function/404.vue')
  },
  //首页
  {
    path: '\/',
    name: '/home',
    component: Layout,
    redirect: '/home',
    hide: false,
    meta: {
      title: 'Home'
    },
    children: [
      // 商品列表
      {
        path: 'home',
        name: '/home',
        component: () => import('@/page/home/index.vue'),
        hide: false,
        meta: {
          title: 'Home'
        }
      },
    ]
  },
];

//合并两组路由
const mergeRoutes = staticRouteMap.concat(routeList);

//初始化路由
const router = new Router({
  routes: mergeRoutes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : {x: 0, y: 0};
  }
});
// 检验token
const token = Cookie.has('vue-admin-token');
// let menu = STORE.get('vue-admin-userinfo').menu || [];
const userinfo = STORE.get('vue-admin-userinfo');
let menu = userinfo?userinfo.menu || userinfo.menu :[];
router.beforeEach((to, from, next) => {
  if(token && token!='null'){
    if(userinfo){
      if(!VUEX.state.userInfo.userInfo){
        VUEX.dispatch('changeUserInfo',userinfo.userInfo);
      }
      if(!VUEX.state.userInfo.menu){
        VUEX.dispatch('changeUserMenu',userinfo.menu);
      }
      if(!VUEX.state.userInfo.resource){
        VUEX.dispatch('changeUserResource',userinfo.resource);
      }
      if(!VUEX.state.userInfo.token){
        VUEX.dispatch('changeToken',token);
      }
    }
    if (to.path === '/login') {
      next({path: '/'});
    } else{
      // 获取有权限的页面
      let passRoute = ['/','/login', '/404', '/home','/dev','/h5/view'].concat(menu.split?menu.split(','):menu);
      let isPass = passRoute.findIndex(item =>item==to.name);
      // 有无权限进入该页面
      if (isPass!=-1) {
        
        next();
      } else {
        next({path: '/404'});
        return;
      }
    }
  }else{
    // 没有token, 表示没登录, 跳转到登录
    if (to.path === '/login') {
      next();
    } else if(to.path === '/' || to.path === '/home') {
      next();
    }else{
      next({path: '/login'});
    }
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = `${to.meta.title} - VUE ADMIN-JOKER`;
  }
  // next();
});
export default router;