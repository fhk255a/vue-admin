import Vue from 'vue'
import Router from 'vue-router'
import routeList from './routes';
import Layout from '@/page/layout';
import Cookie from '@/lib/cookie';
import STORE from '@/store';

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
const menu = Cookie.has('vue-admin-menu');
const userInfo = Cookie.has('vue-admin-userInfo');
const resource = Cookie.has('vue-admin-resource');
console.log(Cookie.get()['vue-admin-menu']);
console.log(menu);
console.log(userInfo);
router.beforeEach((to, from, next) => {
  if(token){
    if(menu){
      STORE.dispatch('changeUserMenu',menu.split(','));
    }else{
      Cookie.set('vue-admin-menu',menu);
    }
    if(userInfo){
      STORE.dispatch('changeUserInfo',JSON.parse(userInfo));
    }else{
      Cookie.set('vue-admin-userInfo',userInfo);
    }
    if(resource){
      STORE.dispatch('changeUserResource',resource.split(','));
    }else{
      Cookie.set('vue-admin-resource',resource);
    }
    if(token){
      STORE.dispatch('changeToken',token);
    }else{
      Cookie.set('vue-admin-token',token);
    }
    if (to.path === '/login') {
      next({path: '/'});
    } else{
      // 获取有权限的页面
      let passRoute = ['/','/login', '/404', '/home','/dev'].concat(menu.split(','));
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
  next();
});
export default router;