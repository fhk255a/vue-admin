<template>
  <div class="joker-page-product">
    <Search-form @search="search" ref="searchForm" :config="searchConfig" :header="header" :btns="true" >
      <template slot="btns" slot-scope="row">
        <div class="joker-form-item" >
          <el-button class="j-btn" @click="$refs.searchForm.search()">查询</el-button>
          <el-button @click="clear(row.scope)">清空</el-button>
        </div>
      </template>
    </Search-form>
    <div class="mb-20" />
    <Container>
      <el-button @click="create">创建</el-button>
      <Table ref="table" :tableList="tableList" :config="table" @get="getData">
        <!-- 图片 -->
        <template slot="mainImage" slot-scope="row">
          <div class="product-img">
            <img class="img" 
            @click="$store.dispatch('imgDialog',{status:true,img:row.scope.data.mainImage})" 
            :src="row.scope.data.mainImage" />
          </div>
        </template>
        <!-- 状态 -->
        <template slot="status" slot-scope="row">
          <div>
            <el-switch :disabled="!isPass('product::details::status')" @change="changeStatus(row.scope)" v-model="row.scope.data.status"></el-switch>
          </div>
        </template>
        <!-- 操作 -->
        <template slot="set" slot-scope="row">
          <div>
            <span class="icon-btn iconfont icon-bianjiqianbixieshuru" @click="view(row.scope.data)"></span>
            <span v-if="isPass('product::list::remove')" class="icon-btn iconfont icon-shanchu" @click="remove(row.scope)"></span>
            <span v-if="isPass('product::list::add')" class="icon-btn iconfont icon-qushuchakanshuxing" @click="set(row.scope.data)"></span>
          </div>
        </template>
      </Table>
    </Container>
    <div class="mb-20" />
    <Page @changePage="changePage" :page="page" align="right"/>
  </div>
</template>

<script>
import Index from './index.js';
export default Index;
</script>

<style lang="scss">
.joker-page-product{
  .product-img{
    width: 80px;
    height: 80px;
  }
}
</style>