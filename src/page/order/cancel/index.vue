<template>
  <div class="joker-page-order-cancel">
    <Search-form @search="search" ref="searchForm" :config="searchConfig" :header="header"/>
    <div class="mb-20"/>
    <Container>
      <el-table :data="tableList">
        <el-table-column label="订单ID" prop="id"></el-table-column>
        <el-table-column label="用户ID" prop="userId"></el-table-column>
        <el-table-column label="退单原因">
          <template slot-scope="row">
            {{row.row.cancelReasion}}
          </template>
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="row">
            {{$timer(row.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="申请时间">
          <template slot-scope="row">
            {{$timer(row.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="row">
            <span class="set-text" @click="view(row.row)">查看</span>
            <span class="set-text color-green" @click="ship(row.row)">同意申请</span>
            <span class="set-text color-green" @click="ship(row.row)">拒绝申请</span>
          </template>
        </el-table-column>
      </el-table>
      <Page @changePage="changePage" :page="page"/>
    </Container>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm';
import Container from '@/components/Container';
import Page from '@/components/Page';
import { REVIEW } from '@/api/order';
export default {
  components:{
    SearchForm,
    Container,
    Page
  },
  methods:{
    changePage(page){
      this.page = page;
      this.getData();
    },
    search(form){
      this.header = form;
      this.getData();
    },
    // 查看订单
    view(item){

    },
    // 取消订单
    cancel(item){

    },
    // 发货
    ship(item){

    },
    getData(){
      const params = {
        current:this.page.current,
        size:this.page.size,
        userId:this.header.userId,
        orderId:this.header.orderId
      }
      this.$store.dispatch('loading',true);
      REVIEW.list(params).then(res=>{
        if(res.code== 200){
          this.tableList = res.data.data;
          this.page.total = res.data.total;
        }else{
          this.$message.error(res.msg);
        }
      }).catch(err=>{
        this.$message.error(err);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    }
  },
  data(){
    return{
      searchConfig:[
        {
          type:'input',
          label:'用户ID',
          key:'userId'
        },
        {
          type:'input',
          label:'订单ID',
          key:'orderId'
        },
      ],
      header:{
        userId:'',
        orderId:''
      },
      page:{
        total:0,
        current:1,
        size:10
      },
      tableList:[]
    }
  },
  mounted(){
    this.getData();
  }
}
</script>

<style>

</style>