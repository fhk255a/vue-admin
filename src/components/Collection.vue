<template>
  <div class="joker-components-product-collection">
    <Search-form @search="search" ref="searchForm" :config="searchConfig" :header="header" ></Search-form>
    <div class="mb-20" />
    <el-table :data="tableList" max-height="500px" ref="multipleTable" show-overflow-tooltip tooltip-effect="dark">
      <el-table-column  type="selection" width="50"></el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="商品数量" prop="num"></el-table-column>
      <el-table-column label="说明" prop="remark"></el-table-column>
    </el-table>
    <div class="table-footer">
      <el-button @click="addBtn">确定</el-button>
      <Page @changePage="changePage" :page="page" align="right"/>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Page';
import Container from '@/components/Container';
import SearchForm from '@/components/SearchForm';
import {COLLECTION} from '@/api/product';
import {KEY} from '@/api/config';
export default {
  components:{
    SearchForm,
    Container,
    Page
  },
  data(){
    return{
      tableList:[],
      page:{
        current:1,
        size:10,
        total:0
      },
      tableList:[],
      header:{
        id:'',
        status:'',
        title:'',
      },
      searchConfig:[
        {
          label:'商品集ID',
          type:'input',
          inputType:'number',
          key:'id',
        },
        {
          label:'商品集标题',
          type:'input',
          key:'title',
        },
        {
          type:'select',    
          label:'状态',
          key:'status',
          data:[]
        }
      ]
    }
  },
  methods:{
    changePage(page){
      this.page = page;
      this.getList();
    },
    search(from){
      this.header = from;
      this.getList();
    },
    getList(){
      const params = {
        current:this.page.current,
        size:this.page.size,
        ...this.header
      }
      this.$store.dispatch('loading',true);
      COLLECTION.list(params).then(res=>{
        if(res.code==200){
          this.tableList = res.data.data;
          this.page.total = res.data.total;
        }else{
          this.notify(res.msg,'抱歉','error');
        }
      }).catch(err=>{
        this.$message.error(err);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
    addBtn(){
      this.$emit('collection',this.$refs['multipleTable'].selection);
    }
  },
  mounted(){
    this.getList();
    KEY.get('PRODUCT_STATUS').then(res=>{
      if(res.code==200){
        this.searchConfig[2].data = res.data;
      }
    })
  },
}
</script>

<style lang="scss">
#app .joker-components-product-collection{
  .joker-component-search-form .joker-form .joker-form-item{
    width: auto;
  }
  .table-footer{
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button{
      margin-top: 20px;
    }
  }
}
</style>