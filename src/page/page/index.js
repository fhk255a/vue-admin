import title from './components/title.vue';
import titleTools from './tools/title.vue';
import banner from './components/banner.vue';
import bannerTools from './tools/banner.vue';
import product from './components/product.vue';
import productTools from './tools/product.vue';
import { ID } from '@/lib/common';
import './index.scss';
import Card from '@/components/Card';
import Popover from '@/components/Popover';
import H5 from '@/api/h5'
import Item from '@/components/Item';
import { config , getData , pageInit } from './minx';
import {getComponent} from '@/store/data/componentLib';
export default {
  data(){
    return{
      // 页面基本信息
      pageInfo:{},
      dialog:false,
      componentsMenu:{
        title,
        banner,
        product
      },
      // 删除状态
      show:false,
      toolsMenu:{
        title:titleTools,
        banner:bannerTools,
        product:productTools,
      },
      currentTools:{
        id:null
      },
      currentComponent:[], // 当前采用的组件个数
      pageConfig:config,
    }
  },
  methods:{
    // 删除组件
    deleteItem(){
      this.show = true;
    },
    // 确认删除
    sureDelete(){
      let index = this.componentIndex;
      this.currentComponent.splice(index,1);
      this.show = false;
      if(index==this.currentComponent.length){
        this.currentTools = {id:null};
      }else{
        this.changeCurrentComponent(this.currentComponent[index],index);
      }
    },
    // 向上移动
    topItem(index){
      if(index == 0){
        return;
      }else{
        this.currentComponent[index] = this.currentComponent.splice(index-1,1,this.currentComponent[index])[0];
      }
    },
    // 向下移动
    bottomItem(index){
      if(index == this.currentComponent.length-1){
        return;
      }else{
        this.currentComponent[index] = this.currentComponent.splice(index+1,1,this.currentComponent[index])[0];
      }
    },
    close(){
      this.dialog = false;
    },
    // 添加组件
    addComponent(row){
      let componentData = getData(row.type);
      if(componentData){
        componentData.id = ID();
        this.currentComponent.push(componentData);
        this.$nextTick(()=>{
        // 定位到指定位置
          const lastH5Item = this.$refs[`h5-item-${this.currentComponent.length-1}`];
          const H5DOM = this.$refs[`h5-phone-container`];
          H5DOM.scrollTo(0,lastH5Item[0].offsetTop);
          this.$store.dispatch('changeComponentIndex',this.currentComponent.length-1);
        //   this.$store.dispatch('changePageComponents',this.currentComponent);
          this.$store.dispatch('changeCompData',componentData);
          this.currentTools = {...componentData};
        })
      }else{
        return;
      }
    },
    // 阻止冒泡
    stopClick(e){
      console.log('进来了');
      this.show = false;
    },
    // 切换编辑区
    changeCurrentComponent(item,index){
      this.$store.dispatch('changeCompData',item);
      this.$store.dispatch('changeComponentIndex',index);
      this.currentTools = {...item};
    },
    // 更改
    update(data){
      const oData = this.currentComponent.findIndex(item=>item.id==data.id);
      if(oData!=-1){
        this.$set(this.currentComponent, oData, data)
      }
    },
    // 最终保存
    save(){
      for(let i in this.currentComponent){
        const item = this.currentComponent[i];
        if(item.type == 'title' && item.content==''){
          this.$message.warning('内容配置不能为空');
          this.$store.dispatch('changeComponentIndex',i);
          this.$store.dispatch('changeCompData',item);
          this.currentTools = {...item};
          this.$refs['h5-item-'+i][0].style.borderColor="#F56C6C";
          return;
        }else{
          if(item.data.length<1){
            this.$refs['h5-item-'+i][0].style.borderColor="#F56C6C";
            this.$message.warning('组件内容配置不能为空');
            this.$store.dispatch('changeComponentIndex',i);
            this.$store.dispatch('changeComponentIndex',i);
            this.$store.dispatch('changeCompData',item);
            this.currentTools = {...item};
            return;
          }
        }
      }
      let result = {
        ...this.pageInfo,
        content:JSON.stringify(this.currentComponent)
      }
      this.$store.dispatch('loading',true);
      H5.save(result).then(res=>{
        if(res.code == 200){
          console.warn('当前数据');
          console.warn({...this.pageInfo,components:[...this.currentComponent]});
          this.notify('当前数据已保存，可以查看F12');
          this.$router.push(`/h5/details/${res.data}`)
        }
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      });
    },
    // 初始化
    init(){
      const ID = this.$route.params.id;
      // 编辑
      if(ID!='add'){ 
        H5.details(ID).then(res=>{
          if(res.code == 200){
            this.pageInfo = {
              name: res.data.name,
              id:res.data.pid,
              status:res.data.status,
              link:res.data.link,
              remark:res.data.remark,
            }
            this.currentComponent = JSON.parse(res.data.content);
          }
        })
      }
      // 创建页面
      else{
        this.pageInfo = pageInit;
        this.currentComponent=[];
      }
    }
  },
  mounted(){
    this.init();
  },
  beforeCreate(){
    //点击空白处展示页面信息
    const DOM = document.getElementById('app');
    DOM.addEventListener('mousedown',(ev)=>{
      if(ev.target.className == 'el-color-dropdown__btns' || ev.target.className== '' || ev.target.className == 'el-color-svpanel__black'){
        this.show = false;
        return;
      }else{
        this.show = false;
        this.$store.dispatch('changeComponentIndex',null);
      }
    })
  },
  computed:{
    componentIndex(){
      return this.$store.state.page.componentIndex
    }
  },
  components:{
    Item,
    Card,
    Popover
  }
} 