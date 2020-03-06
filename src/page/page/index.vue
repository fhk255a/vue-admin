<template>
  <div class="joker-page-page">
    <!-- 组件栏 -->
    <div class="h5-components-menu">
      <div class="h5-menu-title">
        组件库{{componentIndex}}
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
          </div>
        </div>
      </div>
    </div>
    <!-- 工具 -->
    <div class="h5-tools">
      <div class="tools-container">
        <div class="tools-item">
          <keep-alive>
            <component 
              :class="currentTools.pid"
              :component="currentTools"
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
import { ID } from '@/lib/common';
import { config , getData } from './minx';
export default {
  data(){
    return{
      dialog:false,
      componentsMenu:{
        title,
        banner
      },
      toolsMenu:{
        title:titleTools,
        banner:bannerTools,
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
          console.log(componentData.pid);
        })
      }else{
        return;
      }
    },
    // 切换编辑区
    changeCurrentComponent(item,index){
      this.$store.dispatch('changeCompData',item);
      this.$store.dispatch('changeComponentIndex',index);
      this.currentTools = {...item};
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
  width: 375px;
  margin-left: 350px;
  height: 700px;
  background: #f5f5f5;
  border-radius:50px;
  min-width: 375px;
  margin-right: 50px;
  .h5-phone-layout{
    width: 375px;
    height: 700px;
    padding: 40px 20px 20px;
    background: url('../../assets/iphonex.png') center / 100% 100%  no-repeat;
    .h5-phone-container{
      padding: 10px;
      max-height: 625px;
      overflow-y: scroll;
      .h5-phone-item{
        margin-bottom: 8px;
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
  border: 1px solid #eee;
  border-right: 0;
  .tools-container{
    padding: 20px;
  }
}
</style>