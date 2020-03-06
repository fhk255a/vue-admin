export const config = [{
    type:'title',
    title:'公告',
  },
  {
    type:'banner',
    title:'轮播图',
  }
];

export const getData =(type)=>{
  switch(type){
    case 'title':
      return {
        type:'title',
        title:'公告',
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
        data:[
          {
            id:'',
            title:'',
            image:'',
          },
          {
            id:'',
            title:'',
            image:'',
          },
          {
            id:'',
            title:'',
            image:'',
          },
          {
            id:'',
            title:'',
            image:'',
          },
        ]
      }
    default : return false;
  }
}