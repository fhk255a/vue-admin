<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <sidebar/>
      </el-aside>
      <el-main>
          <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sidebar from './Sidebar';
export default {
  components:{
    sidebar
  }
}
</script>

<style lang="scss">
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
  
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>