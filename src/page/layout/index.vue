<template>
  <div class="joker-layout">
    <div class="joker-layout-sidebar">
      <Menu/>
    </div>
    <div class="joker-layout-container">
      <div class="joker-layout-header">Header</div>
      <div class="joker-layout-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './Sidebar';
import Menu from './Mennu';
export default {
  components:{
    sidebar,
    Menu
  }
}
</script>

<style lang="scss">
.joker-layout{
  display: flex;
    width: 100%;
    height: 100%;
  .joker-layout-sidebar {
  }
  
  .joker-layout-container {
    flex:1;
    background-color: #fff;
    min-height: 100vh;
    color: #333;
    position: relative;
    .joker-layout-header{
      border-bottom: 1px solid #ddd;
      padding:10px;
      position: absolute;
      left: 0;
      right: 0;
      background:#f3f3f3;
      height: 40px;
      padding:10px 20px;
      top:0;
      overflow: hidden;
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
</style>