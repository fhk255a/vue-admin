<template>
  <div class="joker-page-operation-categroy">
    <Search-form @search="search" ref="searchForm" :config="searchConfig" :header="header"/>
    <div class="mb-20"/>
    <Container>
      <el-button @click="add">添加</el-button>
      <div class="mb-20"/>
      <el-table
        :data="tableList"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          width="50">
        </el-table-column>
        <el-table-column 
          prop="id"
          label="ID"
          sortable
          width="100"/>
        <el-table-column
          prop="label"
          label="分类名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="baseCategoryId"
          label="对应基础分类">
        </el-table-column>
        <el-table-column
          prop="imgUrl"
          label="图标">
          <template slot-scope="row" v-if="row.row.imgUrl">
            <img :src="row.row.imgUrl" width="40px" height="40px" alt="">
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="row">
            <span class="set-text icon-btn">编辑</span>
            <span class="set-text icon-btn color-red">删除</span>
            <span class="set-text icon-btn color-green">新增子级</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- <Page :page="page" @changePage="changePage"></Page> -->
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container';
import {CATEGORY} from '@/api/operation';
import SearchForm from '@/components/SearchForm';
export default {
  components:{
    Container,
    SearchForm
  },
  data(){
    return{
      tableList:[],
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      this.$store.dispatch('loading',true);
      CATEGORY.getTree().then(res=>{
        if(res.code==200){
          this.tableList = res.data;
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
}
</script>

<style>

</style>