import { ID } from '@/lib/common';
export const config = [{
    type:'title',
    title:'公告',
  },
  {
    type:'banner',
    title:'轮播图',
  },
  {
    type:'product',
    title:'商品列表',
  },
];
export const pageInit = {
  name:'',
  remark:'',
  id:ID(),
  status:false,
  link:'',
  createTime:new Date().getTime(),
  updateTime:'',
}
export const getData =(type)=>{
  switch(type){
    case 'title':
      return {
        type:'title',
        title:'公告',
        isShowTitle:true,
        data:{
          content:'默认文本',
          color:'#333333',
          background:'#ffffff',
          textAlign:'left',
          fontWeight:'normal',
          fontSize:'14px',
          paddingLeftRight:0,
          paddingTopBottom:0,
          margin:'',
        }
      }
    case 'banner':
      return {
        type:'banner',
        title:'轮播图',
        color:'#333',
        isShowTitle:true,
        background:'rgba(0,0,0,0.13)',
        postion:'bottom',
        height:'200',
        data:[]
      }
    case 'product':
      return {
        type:'product',
        title:'商品列表',
        itemType:'50%',
        isShowTitle:true,
        showBtn:'1',
        showRemark:'1',
        showPrice:'1',
        showTitle:'1',
        color:'#333',
        background:'rgba(0,0,0,0.13)',
        data:[]
      }
    default : return false;
  }
}