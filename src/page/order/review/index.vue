<template>
  <div class="joker-page-order-review">
    <Search-form @search="search" ref="searchForm" :config="searchConfig" :header="header"/>
    <div class="mb-20"/>
    <Container>
      <el-table :data="tableList">
        <el-table-column label="订单ID" prop="id"></el-table-column>
        <el-table-column label="用户ID" prop="userId"></el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="row">
            {{row.row.orderStatus}}
          </template>
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="row">
            {{$timer(row.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="row">
            <span class="set-text" @click="view(row.row)">查看</span>
            <span class="set-text color-green" @click="ship(row.row)">填写单号</span>
            <span class="set-text color-red" @click="cancel(row.row)">取消订单</span>
          </template>
        </el-table-column>
      </el-table>
      <Page @changePage="changePage" :page="page"/>
    </Container>
    <el-dialog class="media-dialog"
      :visible.sync="dialog"
      @mousedown.stop=""
      :modal="false"
      top="15vh"
      :modal-append-to-body="false"
      width="500px">
      <div class="joker-form express-box">
        <Item class="w100" title="物流名称">
          <el-select v-model="currentData.expressName">
            <el-option value="yunda" label="韵达"/>
            <el-option value="shunfeng" label="顺丰"/>
            <el-option value="zhongtong" label="中通"/>
          </el-select>
        </Item>
        <Item class="w100" title="物流单号">
          <el-input v-model="currentData.expressNo"/>
        </Item>
        <Item class="w100" title="物流费用">
          <el-input v-model="currentData.expressPrice"/>
        </Item>
        <el-button @click="submit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm';
import Item from '@/components/Item';
import Container from '@/components/Container';
import Page from '@/components/Page';
import ORDER,{ REVIEW } from '@/api/order';
export default {
  components:{
    SearchForm,
    Container,
    Page,
    Item
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
      this.dialog = true;
      this.currentData = {
        orderId:item.id,
        expressName:'',
        expressNo:'',
        expressPrice:'',
      }
    },
    // 提交单号
    submit(){
      this.$store.dispatch('loading',true);
      ORDER.ship(this.currentData).then(res=>{
        if(res.code== 200){
          this.$message.success('已发货')
          this.dialog = false;
          this.getData();
        }else{
          this.$message.error(res.msg);
        }
      }).catch(err=>{
        this.$message.error(err);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
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
      tableList:[],
      currentData:{
        expressPrice:'',
        orderId:'',
        expressName:'',
        expressNo:''
      },
      dialog:false,
    }
  },
  mounted(){
    this.getData();
  }
}
</script>

<style lang="scss">
.express-box{
  padding: 15px;
}
</style>