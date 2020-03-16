import Layout from '@/page/layout';
const routerList = [
  {
    path: '/product',
    name: '/product',
    component: Layout,
    icon:'icon-shangpingouwudai',
    redirect: '/product/list',
    meta:{title:'商品模块'},
    children:[
      {
        path:'list',
        title:'商品列表模块',
        name:'/product/list',
        icon:'icon-chanpin',
        component: () => import('@/page/product/index.vue'),
        meta:{title:'商品列表'},
      },
      {
        path:'details/:id',
        title:'商品详情',
        name:'/product/details',
        isHide:true,
        component: () => import('@/page/product/details/index.vue'),
        meta:{title:'商品详情'},
      },
      {
        path:'shop',
        title:'店铺列表',
        name:'/product/shop',
        icon:'icon-dianpu',
        component: () => import('@/page/product/shop/index.vue'),
        meta:{title:'店铺列表'},
      },
    ]
  },
  {
    path: '/order',
    name: '/order',
    component: Layout,
		redirect: '/order/list',
    icon:'icon-biaodan',
    meta:{title:'订单模块'},
    children:[
      {
        path:'list',
        title:'订单列表',
        icon:'icon-biaodan',
        name:'/order/list',
        meta:{title:'订单列表'},
        component: () => import('@/page/order/index.vue'),
      },
      {
        path:'details/:id',
        title:'订单列表',
        isHide:true,
        name:'/order/details',
        meta:{title:'订单详情页'},
        component: () => import('@/page/order/details/index.vue'),
      },
    ]
  },
  // 权限模块
  {
    path:'/competence',
    name: '/competence',
    component: Layout,
		redirect: '/competence/user',
    icon:'icon-houtaiguanli',
    meta:{title:'权限模块'},
    children:[
      {
        path:'user',
        title:'用户列表',
        icon:'icon-duorenyonghu',
        name:'/competence/user',
        meta:{title:'用户列表'},
        component: () => import('@/page/competence/user/index.vue'),
      },
      {
        path:'role',
        title:'角色列表',
        icon:'icon-kehudongcha',
        name:'/competence/role',
        meta:{title:'角色列表'},
        component: () => import('@/page/competence/role/index.vue'),
      },
      {
        path:'menu',
        title:'菜单列表',
        icon:'icon-leimupinleifenleileibie2',
        name:'/competence/menu',
        meta:{title:'菜单列表'},
        component: () => import('@/page/competence/menu/index.vue'),
      },
      {
        path:'resource',
        title:'资源列表',
        icon:'icon-suo',
        name:'/competence/resource',
        meta:{title:'资源列表'},
        component: () => import('@/page/competence/resource/index.vue'),
      },
    ]
  },
  // h5生成
  {
    path:'/h5',
    name:'/h5',
    component: Layout,
		redirect: '/h5/list',
    icon:'icon-houtaiguanli',
    meta:{title:'H5生成器'},
    children:[
      {
        path:'list',
        name: '/h5/list',
        title:'页面列表',
        isHide:false,
        component:() => import('@/page/page/list/index.vue'),
        meta:{title:'页面列表'},
      },
      {
        path:'details/:id',
        name: '/h5/details',
        title:'H5详情',
        isHide:true,
        component:() => import('@/page/page/index.vue'),
        meta:{title:'H5详情'},
      },
    ]
  }
]

export default routerList;