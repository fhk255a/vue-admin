import Layout from '@/page/layout';
const routerList = [
  {
    path: '/product',
    name: 'HelloWorld',
    component: Layout,
    icon:'icon-shangpingouwudai',
    redirect: '/product/list',
    meta:{title:'商品模块'},
    children:[
      {
        path:'list',
        title:'商品列表模块',
        name:'product/list',
        component: () => import('@/page/product/index.vue'),
        meta:{title:'商品列表'},
      },
      {
        path:'details/:id',
        title:'商品详情',
        name:'product/details',
        isHide:true,
        component: () => import('@/page/product/details/index.vue'),
        meta:{title:'商品详情'},
      },
      {
        path:'shop',
        title:'店铺列表',
        name:'product/shop',
        component: () => import('@/page/product/shop/index.vue'),
        meta:{title:'店铺列表'},
      },
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Layout,
		redirect: '/order/list',
    icon:'icon-biaodan',
    meta:{title:'订单模块'},
    children:[
      {
        path:'list',
        title:'订单列表',
        name:'order/list',
        meta:{title:'订单列表'},
        component: () => import('@/page/order/index.vue'),
      },
      {
        path:'details/:id',
        title:'订单列表',
        isHide:true,
        name:'order/details',
        meta:{title:'订单详情页'},
        component: () => import('@/page/order/details/index.vue'),
      },
    ]
  }
]

export default routerList;