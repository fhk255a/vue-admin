<template>
  <div class="joker-page-operation-homeConfig">
    <!-- 组件区 -->
    <div class="components-list">
      <p class="title">组件库</p>
      <div class="components-container">
        <div v-for="(item,index) in componentList" 
        :key="item.type" @click="addComponent(item)">{{item.title}}</div>
      </div>
    </div>
    <!-- 展示区 -->
    <div class="views">
      <p class="title">展示区</p>
      <div class="views-list">
        <div class="views-container" ref="phone-container" >
          <div class="phone-container" @mousedown.stop="stopClick" >
            <div :class="['phone-item',componentIndex==index?'active':'']" 
              @click.stop="changeCurrentComponent(item,index)" 
              :ref="'item-'+index" 
              v-for="(item,index) in currentComponent" 
              :key="item.id">
              <div class="item-bottom-tools" v-if="componentIndex==index">
                <!-- <Popover :show="show" @yes="sureDelete" @no="show=false"></Popover> -->
                <span @click.stop="deleteItem(index)" class="iconfont icon-shanchu"></span>
                <span v-if="index!=0" @click="topItem(index)" class="iconfont icon-jiantoushangsheng"></span>
                <span v-if="currentComponent.length-1!=index" @click="bottomItem(index)" class="iconfont icon-jiantouxiajiang"></span>
              </div>
              <component v-bind:is="viewComponentsMenu[item.type]" :data="item"></component>
            </div>
          </div>
        </div>
      </div>
      <div class="joker-form">
        <Item title="页面标题">
          <el-input v-model="title"/>
        </Item>
        <Item>
          <el-button @click="save">保存页面</el-button>
        </Item>
      </div>
    </div>
    <!-- 工具区 -->
    <div class="tools-list">
      <p class="title">编辑区</p>
      <div class="tools-container">
        <div class="tools-item" @mousedown.stop="stopClick" v-show="componentIndex!=null">
          <!-- 当前组件ID -->
          <keep-alive>
            <component 
              :class="currentTools.id"
              :data="currentTools"
              @update="update"
              v-bind:is="toolsMenu[currentTools.type]" 
            ></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product';
import OPERATION from '@/api/operation';
import { ID } from '@/lib/common';
import { config , getData } from './minx';
import Item from '@/components/Item';
import banner from './views/banner';
import bannerTools from './tools/banner';
import littleBanner from './views/littleBanner';
import littleBannerTools from './tools/littleBanner';
import nav from './views/nav';
import navTools from './tools/nav';
import shareTop from './views/shareTop';
import shareTopTools from './tools/shareTop';
import collection from './views/collection';
import collectionTools from './tools/collection';
import product from './views/product';
import productTools from './tools/product';
export default {
  data(){
    return{
      title:'',//页面标题
      // 组件库
      componentList:config,
      // 展示的组件
      viewComponentsMenu:{
        banner,
        nav,
        littleBanner,
        shareTop,
        collection,
        product
      },
      // 工具组件
      toolsMenu:{
        banner:bannerTools,
        nav:navTools,
        littleBanner:littleBannerTools,
        shareTop:shareTopTools,
        collection:collectionTools,
        product:productTools,
      },
      currentComponent:[], // 当前采用的组件
      currentTools:{  // 当前编辑的工具
        id:null
      }, 
    }
  },
  mounted(){
    this.initPage();
  },
  methods:{
    initPage(){
      this.$store.dispatch('loading',true);
      OPERATION.getPage(this.$route.params.id).then(res=>{
        if(res.code==200){
          this.title = res.data.title;
          this.currentComponent = JSON.parse(res.data.content);
        }else{
          this.notify(res.msg,'抱歉','error');
        }
      }).catch(err=>{
        this.$message.error(err);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
    // 更改
    update(data){
      const oData = this.currentComponent.findIndex(item=>item.id==data.id);
      if(oData!=-1){
        this.$set(this.currentComponent, oData, data);
      }
    },
    // 切换编辑区
    changeCurrentComponent(item,index){
      this.$store.dispatch('changeCompData',item);
      this.$store.dispatch('changeComponentIndex',index);
      this.currentTools = {...item};
    },
    // 添加组件
    addComponent(row){
      let componentData = getData(row.type);
      if(componentData){
        componentData.id = ID();
        this.currentComponent.push(componentData);
        this.$nextTick(()=>{
        // 定位到指定位置
          const lastH5Item = this.$refs[`item-${this.currentComponent.length-1}`];
          const H5DOM = this.$refs[`phone-container`];
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
      this.show = false;
    },
    // 删除组件
    deleteItem(index){
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
    // 保存创建
    save(){
      for(let i in this.currentComponent){
        if(this.currentComponent[i].data.length==0){
          this.notify('组件内容不能为空');
          this.changeCurrentComponent(this.currentComponent[i],i)
          return;
        }
      }
      const params = {
        pageType:'home',
        content:JSON.stringify(this.currentComponent),
        title:this.title,
        id:this.$route.params.id,
      }
      this.$store.dispatch('loading',true);
      if(params.id=='add'){
        // 创建
        OPERATION.add(params).then(res=>{
          if(res.code==200){
            this.notify(res.msg,'恭喜',"success");
            this.$router.push('/operation/homeConfig/'+res.data.id);
          }else{
            this.notify(res.msg,'抱歉','error');
          }
        }).catch(err=>{
          this.$message.error(err);
        }).finally(()=>{
          this.$store.dispatch('loading',false);
        })
      }else{
        // 修改
        OPERATION.save(params).then(res=>{
          if(res.code==200){
            this.notify(res.msg,'恭喜',"success");
            this.initPage();
          }else{
            this.notify(res.msg,'抱歉','error');
          }
        }).catch(err=>{
          this.$message.error(err);
        }).finally(()=>{
          this.$store.dispatch('loading',false);
        })
      }
    }
  },
  beforeCreate(){
    //点击空白处展示页面信息
    const DOM = document.getElementById('app');
    DOM.addEventListener('mousedown',(ev)=>{
      if( ev.target.className == 'el-dialog__wrapper product-dialog' || ev.target.className == 'el-color-dropdown__btns' || ev.target.className== '' || ev.target.className == 'el-color-svpanel__black'){
        this.$store.dispatch('changeComponentIndex',this.componentIndex);
        return;
      }else{
        this.$store.dispatch('changeComponentIndex',null);
      }
    })
  },
  computed:{
    // 当前操作的组件下标
    componentIndex(){
      return this.$store.state.page.componentIndex
    },
  },
  components:{
    Product,
    Item
  }
}
</script>

<style lang="scss">
#app .joker-page-operation-homeConfig{
  position: relative;
  min-height: calc(100vh - 80px);
  width: 100%;
  background: #f8f8f8;
  display: flex;
  .title{
    font-weight: 600;
  }
  .components-list{
    position: absolute;
    left: 0;
    bottom: 0;
    top: 20px;
    display: flex;
    flex-direction: column;
    .components-container{
      background: #fff;
      padding: 10px;
      margin: 10px;
      flex:1;
      border:1px solid #efefef;
      >div{
        padding: 5px 10px;
        cursor: pointer;
        &:hover{
          color: #999;
        }
      }
    }
  }
  .views{ 
    margin-top: 20px;
    margin-left: 150px;
  }
  .views-list{
    height: 700px;
    min-width: 375px;
    max-width: 375px;
    overflow: hidden;
    margin-right: 50px;
    margin: 10px;
    position: relative;
    background: #fff;
    box-shadow: 0px 0px 3px 1px rgba(7,27,37,.1);
    .views-container{
      overflow: hidden;
      width: 100%;
      overflow-y: scroll;
      height: 100%;
      .item-components{
        border:1px solid transparent;
      }
      .active .item-components{
        box-sizing: border-box;
        border:1px solid #f56c6c;
      }
      // 修改滚动条属性
      ::-webkit-scrollbar{width:3px;}
      ::-webkit-scrollbar{height:3px;}
      ::-webkit-scrollbar-track{background-color: #ccc;}
      ::-webkit-scrollbar-thumb{background-color: #000;}
      ::-webkit-scrollbar-thumb:hover {background-color: #000}
      ::-webkit-scrollbar-thumb:active {background-color: #000} 
    }
    .phone-item{
      margin-bottom: 10px;
      width: 100%;
      position: relative; 
      box-sizing: border-box;
    }
  }
  .tools-list{
    flex:1;
    margin-top: 20px;
    overflow-y:scroll;
    .tools-container{
      padding: 10px;
      .joker-form-item{
        width: 100%;
      }
    } 
  }
  .item-bottom-tools{
    position: absolute;
    z-index: 99;
    span{
      padding: 4px 4px;
      background: #f56c6c;
      color: #fff;
      display: inline-block;
    }
  }
  .active{
    .nav-list{
      overflow-x: scroll;
    }
  }
}
.joker-component-upload{
  position: relative;
}
#app .product-dialog .el-dialog{
  background:#fff;
  padding:20px;
}
</style>