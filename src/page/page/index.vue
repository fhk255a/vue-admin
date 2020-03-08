<template>
  <div class="joker-page-page">
    <!-- 组件栏 -->
    <div class="h5-components-menu">
      <div class="h5-menu-title">
        组件库  当前已经添加了 <span class="color-red">{{componentIndex}}</span>
      </div>
      <ul class="h5-menu-ul" >
        <li class="h5-menu-li" v-for="(item,index) in pageConfig" 
          :key="item.type" 
          @click="addComponent(item,index)">
          <span class="color-blue">{{item.title}}</span>
        </li>
      </ul>
    </div>
    <!-- 手机展示区 -->
    <div class="h5-phone">
      <div class="h5-phone-layout">
        <div ref="h5-phone-container" class="h5-phone-container">
          <div :class="['h5-phone-item',componentIndex==index?'active':'']" 
            @click="changeCurrentComponent(item,index)" 
            :ref="'h5-item-'+index" 
            v-for="(item,index) in currentComponent" 
            :key="item.id">
            <component v-bind:is="componentsMenu[item.type]" :data="item"></component>
            <div class="center-title" :key="item.id">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 工具 -->
    <div class="h5-tools">
      <div class="tools-container">
        <div class="tools-item">
          <!-- 当前组件ID -->
          <div class="joker-form" v-if="currentTools.id">
            <div class="joker-form-item w100">
              <div class="joker-form-item-label">当前组件ID：</div>
              <div class="joker-form-item-content">
                <div class="tools-title">{{currentTools.id}}</div>
              </div>
            </div>
          </div>
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
import { config , getData } from './minx';
export default {
  data(){
    return{
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
    // 切换编辑区
    changeCurrentComponent(item,index){
      console.log(item);
      this.$store.dispatch('changeCompData',item);
      this.$store.dispatch('changeComponentIndex',index);
      this.currentTools = {...item};
    },
    // 更改
    update(data){
      const oData = this.currentComponent.findIndex(item=>item.id==data.id);
      console.log(oData,data)
      if(oData!=-1){
      this.$set(this.currentComponent, oData, data)
        // this.currentComponent[oData] = data;
      }
      console.log(this.currentComponent,data.postion);
    }
  },
  computed:{
    componentIndex(){
      return this.$store.state.page.componentIndex
    }
  },
  mounted(){
  },
} 
</script>

<style lang="scss">
.joker-page-page{
  position: relative;
  min-height: calc(100% - 80px);
  background: #f8f8f8;
  height: 100%;
  display: flex;
}
.h5-components-menu{
  width: 300px;
  border: 1px solid #eee;
  border-left:0;
  position: absolute;
  left: 0;
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
  .h5-phone-layout{
    width: 500px;
    height: 700px;
    padding: 40px 20px 20px;
    background: url('../../assets/iphonex.png') center right / 375px 100%  no-repeat ; 


    height: 700px;
    padding: 40px 20px 20px;
    max-height: 700px;
    overflow-y: scroll;
    .foor-title{
      padding: 10px 0;
    }
    .h5-phone-container{
      padding: 10px;
      width: 330px;
      margin-left: 126px;

      .center-title{
          position: absolute;
          left: -120px;
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
  background: #f5f5f5;
  flex:1;
  overflow-y:scroll;
  border: 1px solid #eee;
  border-right: 0;
  .tools-container{
    padding: 20px;
    .joker-form-item{
      width: 100%;
    }
  }
}
</style>