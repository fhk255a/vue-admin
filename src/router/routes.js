import Layout from '@/page/layout';
const routerList = [
  // 商品模块
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
        component: () => import('@/page/product//list/index.vue'),
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
        path:'category',
        title:'基础分类',
        name:'/product/category',
        isHide:false,
        icon:'el-icon-collection-tag',
        component: () => import('@/page/product/category/index.vue'),
        meta:{title:'基础分类'},
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
  // 订单模块
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
        title:'订单详情',
        isHide:true,
        name:'/order/details',
        meta:{title:'订单详情页'},
        component: () => import('@/page/order/details/index.vue'),
      },
      {
        path:'review',
        title:'订单审核',
        isHide:false,
        name:'/order/review',
        meta:{title:'订单审核'},
        component: () => import('@/page/order/review/index.vue'),
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
      {
        path:'view',
        name: '/h5/view',
        title:'H5详情',
        isHide:true,
        component:() => import('@/page/page/view/index.vue'),
        meta:{title:'H5详情'},
      },
    ]
  },
  // 会员模块
  {
    path: '/member',
    name: '/member',
    component: Layout,
    icon:'el-icon-user',
    redirect: '/member/list',
    hide:false,
    meta:{title:'用户相关'},
    children:[
      {
        path: 'list',
        name: '/member/list',
        component: () => import('@/page/member/list/index.vue'),
        hide: false,
        icon:'el-icon-s-custom',
        meta: {
          title: '用户列表'
        }
      },
    ]
  },
  // 系统配置
  {
    path: '/config',
    name: '/config',
    component: Layout,
    icon:'el-icon-setting',
    redirect: '/config/media',
    hide:false,
    meta:{title:'系统配置'},
    children:[
      {
        path: 'media',
        name: '/config/media',
        component: () => import('@/page/config/media'),
        hide: false,
        icon:'el-icon-folder-opened',
        meta: {
          title: '媒体库'
        }
      },
      {
        path: 'key',
        name: '/config/keys',
        component: () => import('@/page/config/key'),
        hide: false,
        icon:'el-icon-coin',
        meta: {
          title: '参数配置'
        }
      },
      {
        path: 'components',
        name: '/config/components',
        component: () => import('@/page/config/components'),
        hide: false,
        icon:'el-icon-s-grid',
        meta: {
          title: '页面组件'
        }
      },
    ]
  },
  // 运营模块
  {
    path: '/operation',
    name: '/operation',
    component: Layout,
    icon:'el-icon-data-line',
    redirect: '/operation/homeConfig/add',
    hide:false,
    meta:{title:'运营模块'},
    children:[
      {
        path: 'homeConfig/:id',
        name: '/operation/homeConfig',
        component: () => import('@/page/operation/homeConfig'),
        hide: false,
        icon:'el-icon-folder-opened',
        meta: {
          title: '首页配置'
        }
      },
      {
        path: 'category',
        name: '/operation/category',
        component: () => import('@/page/operation/category'),
        hide: false,
        icon:'el-icon-folder-opened',
        meta: {
          title: '展示分类'
        }
      },
    ]
  }
]

export default routerList;