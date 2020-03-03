<template>
  <div class="joker-layout">
    <div class="joker-layout-sidebar">
      <Menu/>
    </div>
    <div class="joker-layout-container">
      <div class="joker-layout-header" :style="{left:!$store.state.func.collapse?'240px':'64px'}">
        <!-- 菜单缩放开关 -->
        <div class="joker-layout-header-item collapse-btn iconfont icon-biaodan2" @click="toggleCollapse"></div>
        <!-- 面包屑 -->
        <Breadcrumb class="joker-layout-header-item"/>
      </div>
      <div class="joker-layout-main">
        <router-view/>
      </div>
    </div>
    <el-dialog
      class="j-big-img-show"
      :visible.sync="$store.state.dialog.bigImg.dialog"
      width="400px">
      <div style="width:100%;height:100%">
        <img class="img" :src="$store.state.dialog.bigImg.img" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumbs';
import Menu from './Mennu';
export default {
  components:{
    Breadcrumb,
    Menu
  },
  methods:{
    // 切换菜单的状态
    toggleCollapse(){
      this.$store.dispatch('changeCollapse',!this.$store.state.func.collapse);
    }
  }
}
</script>

<style lang="scss">
.joker-layout{
  display: flex;
    width: 100%;
    height: 100%;
  .joker-layout-sidebar {
    max-height: 100vh;
    overflow: hidden;
  }
  
  .joker-layout-container {
    flex:1;
    background-color: #fff; 
    color: #333;
    overflow-y: scroll;
    max-height: 100vh;
    position: relative;
    .joker-layout-header{
      border-bottom: 1px solid #ddd;
      padding:10px;
      z-index: 99;
      position: fixed;
      left: 0;
      right: 0;
      background:#f3f3f3;
      height: 40px;
      line-height: 20px;
      padding:10px 20px;
      top:0;
      overflow: hidden;
      .joker-layout-header-item{
        float: left;
        margin-right: 20px;
      }
      .collapse-btn{
        font-size: 24px;
        cursor: pointer;
      }
    }
    .joker-layout-main{
      padding:20px;
      margin-top: 40px;
    }
  }
}


body > .el-container {
  margin-bottom: 40px;
}
.joker-layout-container{
  .joker-layout-header{
    transition: left 0.3s;
  }
}
#app .j-big-img-show .el-dialog{
  background: #fff;
  border-radius: 0;
  .el-dialog__header {
    padding: 20px 20px 10px;
  }
  .el-dialog__body{
    border-radius: 0;
    padding: 30px 20px;
  }
}
</style>