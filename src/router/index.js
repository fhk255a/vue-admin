import Vue from 'vue'
import Router from 'vue-router'
import routeList from './routes';
import Layout from '@/page/layout';

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
  // 默认页
  {
    path: '/',
    name: 'defalut',
    hide: true,
    meta: {
      title: 'Home'
    },
    component: () => import('@/page/home/index.vue')
  },
  // 404
  {
    path: '/404',
    name: '404',
    hide: true,
    meta: {
      title: '404'
    },
    component: () => import('@/page/function/404.vue')
  },
  //首页
  {
    path: '\/',
    name: 'Home',
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
        name: 'homecontainer',
        component: () => import('@/page/home/index.vue'),
        hide: false,
        meta: {
          title: 'Home'
        }
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hide: false,
    meta: {
      title: '404'
    },
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

router.beforeEach((to, from, next) => {
  let timerVal = null;
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    // 动态让头部悬浮
    timerVal = setTimeout(()=>{
      let HeaderDom = document.getElementById('op-fixed');
      let TableDom = document.getElementById('op-fixed-main');
      if(HeaderDom && TableDom){
        TableDom.style.paddingTop = HeaderDom.offsetHeight + 'px';
      }
    },300);
    document.title = `${to.meta.title} - OPShop Management Platform`;
  }
  next();
});
export default router;