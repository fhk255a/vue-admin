<template>
  <div class="joker-page-page">
    <!-- 组件栏 -->
    <div class="h5-components-menu">
      <div class="h5-menu-title">
        组件库 
      </div>
      <ul class="h5-menu-ul" >
        <li class="h5-menu-li" v-for="(item,index) in pageConfig" 
          :key="item.type" 
          @click.stop="addComponent(item,index)">
          <span class="color-blue">{{item.title}}</span>
        </li>
      </ul>
    </div>
    <!-- 手机展示区 -->
    <div class="h5-phone">
      <div class="h5-phone-layout">
        <div ref="h5-phone-container" class="h5-container">
          <div class="h5-phone-container" ref="container" @mousedown.stop="stopClick" >
            <div :class="['h5-phone-item',componentIndex==index?'active':'']" 
              @click="changeCurrentComponent(item,index)" 
              :ref="'h5-item-'+index" 
              v-for="(item,index) in currentComponent" 
              :key="item.id">
              <component v-bind:is="componentsMenu[item.type]" :data="item"></component>
              <div :key="item.id" 
                :class="['center-title',componentIndex==index?'title-active':'']"
              >{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 工具 -->
    <div class="h5-tools">
      <div class="tools-container">
        <div class="page-info" v-if="componentIndex==null">
          <Card title="页面信息">
            <div class="joker-form">
              <Item title="页面ID(随机生成)：">{{pageInfo.id}}</Item>
              <Item title="页面状态：">
                <el-switch v-model="pageInfo.status"></el-switch>
              </Item>
              <Item title="页面链接：">{{pageInfo.link}}</Item>
              <Item title="页面名称：">
                <el-input v-model="pageInfo.name" @change="changeInput()"/>
              </Item>
              <Item title="备注：">
                <el-input type="textarea" style="width:300px" :autosize="{ minRows: 3,maxRows:10}" v-model="pageInfo.remark" @change="changeInput()"/>
              </Item>
            </div>
          </Card>
        </div>
        <div class="tools-item" @mousedown.stop="stopClick" v-show="componentIndex!=null">
          <!-- 当前组件ID -->
          <keep-alive>
            <component 
              :class="currentTools.id"
              :component="currentTools"
              @update="update"
              v-bind:is="toolsMenu[currentTools.type]" 
            ></component>
          </keep-alive>
        </div>
      </div>
    </div>
    <div class="footer-btns">
      <el-button @click="save()" >保存</el-button>
    </div>
  </div>
</template>

<script>
import title from './components/title.vue';
import titleTools from './tools/title.vue';
import banner from './components/banner.vue';
import bannerTools from './tools/banner.vue';
import product from './components/product.vue';
import productTools from './tools/product.vue';
import { ID } from '@/lib/common';
import Card from '@/components/Card';
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
      console.log('点了工具栏')
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
      console.log('当前数据');
      let result = {
        info:this.pageInfo,
        components:this.currentComponent
      }
      console.log(JSON.stringify(result));
    },
    // 初始化
    init(){
      const ID = this.$route.params.id;
      // 编辑
      if(ID!='add'){ 
        const list = this.$store.state.page.list;
        const componentLib = this.$store.state.page.componentLib;
        const page = componentLib.find(item=>ID == item.info.id);// 查看是否存在该页面组件信息
        if(page){
          this.pageInfo = page.info; 
          this.currentComponent = page.components?page.components:[];
        }else{
          this.pageInfo = pageInit;
          this.currentComponent = [];
        }
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
    document.addEventListener('mousedown',(ev)=>{
      this.$store.dispatch('changeComponentIndex',null);
    })
  },
  computed:{
    componentIndex(){
      return this.$store.state.page.componentIndex
    }
  },
  components:{
    Item,
    Card
  }
} 
</script>

<style lang="scss">
.joker-page-page{
  position: relative;
  min-height: calc(100% - 80px);
  background: #f8f8f8;
  background: #fff;
  height: 100%;
  display: flex;
}
.h5-menu-title{
  font-weight: 600;
  margin: 10px 5px;
}
.h5-components-menu{
  width: 300px;
  background: #fff;
  position: absolute;
  left: 0;
  border:1px solid #efefef;
  padding: 10px;
  bottom: 0;
  top: 0;
  .h5-menu-ul{
    display: flex;
    .h5-menu-li{
      margin:5px;
      cursor: pointer;
      border:1px solid #409EFF;
      padding:5px 10px;
    }
  }
}
.right{
  flex:1;
}
.h5-phone{
  margin-left: 350px;
  height: 700px;
  min-width: 375px;
  margin-right: 50px;
  position: relative;
  background: transparent;
  .h5-phone-layout{
    width: 500px;
    height: 700px;
    background: url('../../assets/iphonex.png') center right / 375px 100%  no-repeat ; 
    padding: 45px 20px 20px;
    overflow: hidden;
    max-height: 700px;
    .foor-title{
      padding: 10px 0;
    }
    .h5-container{
      width: 100%;
      height: 625px;
      background: transparent;
      overflow-y: scroll;
    }
    .h5-phone-container{
      padding: 10px;
      width: 330px;
      margin-left: 126px;
      .center-title{
          position: absolute;
          box-shadow: 3px 0px 4px 0px rgba(0,7,17,0.2);
          max-width: 100px;
          left: -130px;
          top:40%;
          border-width: 2px;
          -webkit-filter: drop-shadow(0 2px 12px rgba(0,0,0,0.03));
          filter: drop-shadow(0 2px 12px rgba(0,0,0,0.03));
          border-top-width: 0;
          border-bottom-color: #ebeef5;
          position: absolute;
          display: block;
          border-radius: 4px;
          background: #fff;
          border-color: transparent;
          border-style: solid;
          padding: 5px 10px;
        &::after{
          content: " ";
          border-width: 6px;
          top: 4px;
          position: absolute;
          display: block;
          width: 0;
          right: -8px;
          height: 0;
          border-color: transparent;
          border-style: solid;
          margin-left: -6px;
          border-right-width: 0;
          border-left-color: #fff;
        }
      }
      .title-active{
        z-index: 999;
      }
      .h5-phone-item{
        margin-bottom: 8px;
        position: relative;
        width: 100%;
        user-select: none;
        cursor: pointer;
        padding: 3px;
        border: 1px solid transparent;
      }
      .active{
        border-color :#070f14;
      }
    }
  }
}
.h5-tools{
  background: #fff;
  flex:1;
  overflow-y:scroll;
  .tools-container{
    padding: 20px;
    .joker-form-item{
      width: 100%;
    }
  }
}
.footer-btns{
  position: fixed;
  right: 80px;
  top: 4px;
  z-index: 100;
  .el-button{
    background: #070f14;
    color: #fff;
    padding: 8px 20px;
  }
}
</style>