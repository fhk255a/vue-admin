<template>
  <div class="joker-page-page">
    <!-- 组件栏 -->
    <div class="h5-components-menu">
      <div class="h5-menu-title">
        组件库
      </div>
      <ul class="h5-menu-ul" >
        <li class="h5-menu-li" v-for="(item,index) in componentsList" :key="item.id" @click="addComponent(item,index)">
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
            :key="index">
            <div :is="componentsMenu[item.id]" :data="item"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 工具 -->
    <div class="h5-tools">
      <div class="tools-container">
        <div class="tools-item" 
          :is="toolsMenu[currentTools.id]">
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
import config from './minx';
export default {
  mixins:[config],
  data(){
    return{
      componentsList:[
        {
          id:'title',
          title:'公告',
        },
        {
          id:'banner',
          title:'轮播图',
        },
      ],
      componentsMenu:{
        title,
        banner
      },
      toolsMenu:{
        title:titleTools,
        banner:bannerTools,
      },
      currentTools:{} // 当前编辑的区块
    }
  },
  methods:{
    // 添加组件
    addComponent(row){
      const components = {...this.config.find(item=>item.id==row.id)};
      console.log(components);
      let componentsArr = this.currentComponent;
      if(components){
        componentsArr.push(components);
        this.$nextTick(()=>{
          // 定位到指定位置
          const lastH5Item = this.$refs[`h5-item-${this.currentComponent.length-1}`];
          const H5DOM = this.$refs[`h5-phone-container`];
          H5DOM.scrollTo(0,lastH5Item[0].offsetTop);
          this.$store.dispatch('changePageComponents',componentsArr);
          this.$store.dispatch('changeComponentIndex',this.currentComponent.length-1);
        })
      }else{
        return;
      }
    },
    // 切换编辑区
    changeCurrentComponent(item,index){
      this.$store.dispatch('changeComponentIndex',index);
      this.currentTools = {
        ...this.currentComponent[this.componentIndex]
      }
    }
  },
  computed:{
    currentComponent(){
      return this.$store.state.page.components;
    },
    componentIndex(){
      return this.$store.state.page.componentIndex;
    }
  },
  mounted(){
    // 初次加载 获取当前页面的component ==> 假设去到了
    // this.$store.state.page.components
  }
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
        margin-bottom: 20px;
        width: 100%;
        user-select: none;
        cursor: pointer;
        padding: 4px;
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
}
</style>