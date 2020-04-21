export const config = [
  {
    type:'banner',
    title:'轮播图',
  },
  {
    type:'nav',
    title:'快捷入口',
  },
  {
    type:'notice',
    title:'公告',
  },
  {
    type:'littleBanner',
    title:'小型广告轮播',
  },
  {
    type:'shareTop',
    title:'商品排行',
  },
  {
    type:'collection',
    title:'商品集',
  },
  {
    type:'product',
    title:'商品列表',
  },
];
export const getData =(type)=>{
  switch(type){
    case 'banner':
      return {
        type:'banner',
        color:'#333',
        background:'rgba(0,0,0,0.13)', // 文本背景色
        postion:'bottom', // 文本展示位置
        showIndex:false, // 是否有指示器 
        height:'200',
        data:[
          {
            event:'',
            eventValue:'',
            image:'',
            title:'',
          }
        ]
      }
    case 'nav':
      return{
        type:'nav',
        num:'5', // 一行几个 默认5个
        isOne:true, // 一行显示 
        data:[
          {
            event:'',
            eventValue:'',
            image:'',
            title:'',
          }
        ]
      }
    case 'notice':
      return{
        type:'notice',
        data:{
          background:'#fffbe8',
          color:'#f08435',
          content:'',
          scroll:true,
          icon:'volume-o',
          close:true,
          mode:true,
        }
      }
    case 'littleBanner':
      return{
        type:'littleBanner',
        height:'90',
        data:[
          {
            event:'',
            eventValue:'',
            image:'',
          }
        ]
      }
    case 'shareTop':
      return{
        type:'shareTop',
        title:'人气版',
        showMore:true,
        showTitle:false,
        showPrice:false,
        data:[]
      }
    case 'collection':
      return{
        type:'collection',
        title:'特价专栏',
        showMore:true,
        showTitle:false,
        showPrice:false,
        data:[

        ]
      }
    case 'product':
      return {
        type:'product',
        title:'商品列表',
        itemType:'2', // 一行几个
        isShowTitle:true,
        showRemark:true,
        showPrice:true,
        showTitle:true,
        data:[]
      }
    default : return false;
  }
}