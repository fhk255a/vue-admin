import Layout from '@/page/layout';
const routerList = [
  {
    path: '/product',
    name: 'HelloWorld',
    component: Layout,
    icon:'icon-shangpingouwudai',
    title:'商品模块',
		redirect: '/product/list',
    children:[
      {
        path:'list',
        title:'商品列表模块',
        name:'product/list',
        component: () => import('@/page/product/index.vue'),
      },
      {
        path:'listCofig',
        title:'商品列表模块',
        name:'product/listCofig',
        component: () => import('@/page/product/index.vue'),
        children:[
          {
            path:'listItem',
            title:'商品列表再列表',
            name:'product/listCofig/listItem',
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
    title:'订单模块',
    icon:'icon-biaodan',
    children:[
      {
        path:'list',
        title:'订单列表',
        name:'order/list',
        component: () => import('@/page/order/index.vue'),
      },
    ]
  }
]

export default routerList;