<template>
  <div class="joker-page-order">
    <Search-form @search="search" ref="searchForm" :config="searchConfig" :header="header"/>
    <div class="mb-20"/>
    <Container>
      <Table :tableList="tableList" :config="tableConfig">
        <!-- 创建时间 -->
        <template slot-scope="row" slot="createTime">
          {{$timer(row.scope.data.createTime*1)}}
        </template>
        <!-- 订单状态 -->
        <template slot-scope="row" slot="orderStatus">
          {{searchConfig[4].data[searchConfig[4].data.findIndex(item=>item.id == row.scope.data.orderStatus)].label}}
        </template>
        <!-- 支付状态 -->
        <template slot-scope="row" slot="payStatus">
          {{row.scope.data.payStatus == 1? '已支付':'未支付'}}
        </template>
        <!-- 操作 -->
        <template slot-scope="row" slot="set">
          <span class="set-text" @click="viewOrder(row.scope.data)">
            查看订单
          </span>
          <span class="set-text" v-if="isPass('order::list::cancel') && row.scope.data.orderStatus != 'CANCEL'" @click="cancelOrder(row.scope.data)">
            取消订单
          </span>
        </template>
      </Table>
    </Container>
    <div class="mb-20"/>
    <Page :page="page" @changePage="changePage"/>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm';
import Container from '@/components/Container';
import Table from '@/components/Table';
import Page from '@/components/Page';
import isPass from '@/lib/esss';
import ORDER from '@/api/order';
export default {
  mixins:[isPass],
  methods:{
    changePage(page){
      this.page = page;
      this.getData();
    },
    // 冻结订单
    viewOrder(item){
      this.$router.push({
        path:`/order/details/${item.id}`
      })
    },
    // 取消订单
    cancelOrder(row){
      this.$confirm('是否取消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('loading',true);
        ORDER.cancel(row.id).then(res=>{
          if(res.code == 200){
            this.$message.success('取消成功!');
            this.getData();
          }else{
            this.$message.error(res.msg);
          }
        })
      }).catch(() => {
        this.notify('您点了取消');          
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
    search(form){
      this.header = form;
      this.getData();
    },
    // 获取订单列表
    getData(){
      // TODO 订单列表请求
      this.$store.dispatch('loading',true);
      let params = {
        current:this.page.current,
        size:this.page.size,
        ...this.header
      }
      ORDER.list(params).then(res=>{
        this.page.total = res.data.total;
        this.tableList = res.data.data;
      }).catch(()=>{}).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    }
  },
  components:{
    SearchForm ,
    Container,
    Table,
    Page
  },
  data(){
    return{
      page:{
        total:0,
        current:1,
        size:10
      },
      header:{
        id:'',
        userId:'',
        orderStatus:'',
        payStatus:'',
      },
      tableList:[],
      tableConfig:[
        {
          label:'ID',
          value:'id',
          width:100,
        },
        {
          label:'用户ID',
          value:'userId',
          width:100,
        },
        {
          label:'订单状态',
          value:'orderStatus',
          set:true
        },
        {
          label:'订单金额',
          value:'resultPrice'
        },
        {
          label:'商品数量',
          value:'num'
        },
        {
          label:'下单时间',
          value:'createTime',
          set:true
        },
        {
          label:'操作',
          value:'set',
          set:true
        },
      ],
      searchConfig:[
        {
          type:'input',
          label:'订单ID',
          key:'id'
        },
        {
          type:'input',
          label:'用户ID',
          key:'userId'
        },
        {
          type:'time',
          label:'创建时间',
          key:'time'
        },
        {
          type:'select',
          label:'支付状态',
          key:'payStatus',
          data:[
            {
              label:'全部',
              value:'',
            },
            {
              label:'已支付',
              value:'1',
            },
            {
              label:'未支付',
              value:'2',
            },
          ]
        },
        {
          type:'select',
          label:'订单状态',
          key:'orderStatus',
          data:[
            {
              id:-1,
              label:'未付款',
            },
            {
              id:0,
              label:'未发货',
            },
            {
              id:1,
              label:'已发货',
            },
            {
              id:3,
              label:'退款',
            },
          ]
        },
      ]
    }
  },
  mounted(){
    this.getData();
  },
}
</script>