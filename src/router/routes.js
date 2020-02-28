import Layout from '@/page/layout';
const routerList = [
  {
    path: '/product',
    name: 'HelloWorld',
    component: Layout,
		redirect: '/product/list',
    children:[
      {
        path:'list',
        name:'product/list',
        component: () => import('@/page/product/index.vue'),
        children:[]
      },
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Layout,
		redirect: '/order/list',
    children:[
      {
        path:'list',
        name:'order/list',
        component: () => import('@/page/order/index.vue'),
        children:[]
      },
    ]
  }
]

export default routerList;