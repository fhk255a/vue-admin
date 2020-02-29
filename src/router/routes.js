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
        path:'listCofig',
        name:'product/listCofig',
        component: () => import('@/page/product/index.vue'),
        meta:{title:'商品列表模块'},
        children:[
          {
            path:'listItem',
            name:'product/listCofig/listItem',
            meta:{title:'商品列表模块再列表'},
            component: () => import('@/page/product/index.vue'),  
          },
        ]
      }
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
    ]
  }
]

export default routerList;