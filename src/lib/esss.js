import store from '@/store';
export default {
  data(){
    return{
      
    }
  },
  methods:{
    cResource(){
      
    },
    cAllResource(){
      // 请求获取最新的资源
      store.dispatch('changeResourceList',res.data);
    },
    isPass(str){
      const all = store.state.competence.allResource;
      const user = store.state.userInfo.resource;
      return user.findIndex(item=>item==str)!=-1;
    }
  },
  mounted(){
    function di(data,arr){
      data.map(item=>{
        if(item.children && item.children.length>0){
          di(item.children,arr);
        }
        arr.push(item.value);
      })
      return arr;
    }
    let resource = di(store.state.competence.resource,[])
    store.dispatch('changeAllResource',resource);
  }
}