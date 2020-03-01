<template>
  <div class="joker-page-order">
    <Search-form @search="search" ref="searchForm" :data="searchConfig" :header="header"/>
    <div class="mb-20"/>
    <Container>
      <Table :tableList="tableList" :config="tableConfig">
        <!-- 创建时间 -->
        <template slot-scope="row" slot="createTime">
          {{$timer(row.scope.data.createTime)}}
        </template>
        <!-- 订单状态 -->
        <template slot-scope="row" slot="orderStatus">
          {{searchConfig[4].data[searchConfig[4].data.findIndex(item=>item.value == row.scope.data.orderStatus)].label}}
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
          <span class="set-text" v-if="row.scope.data.orderStatus != 'CANCEL'" @click="cancelOrder(row.scope.data)">
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
export default {
  methods:{
    changePage(page){
      this.page = page;
    },
    // 冻结订单
    viewOrder(item){
      this.$router.push({
        path:`/order/details/${item.id}`,
        query:item
      })
    },
    // 取消订单
    cancelOrder(row){
      this.$confirm('是否取消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('取消成功!');
        const INDEX = this.tableList.findIndex(item=>item.id==row.id);
        this.tableList[INDEX].orderStatus = 'CANCEL';
      }).catch(() => {
        this.notify('您点了取消');          
      });
    },
    search(form){
      this.header = form;
    },
    // 获取订单列表
    getData(){
      // TODO 订单列表请求
      const res = this.$store.state.order.list;
      if(res.code == 200){
        this.tableList = res.data.records;
      }
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
        orderId:'',
        userId:'',
        time:'',
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
          label:'支付状态',
          value:'payStatus',
          set:true
        },
        {
          label:'订单金额',
          value:'totalPrice'
        },
        {
          label:'商品数量',
          value:'goodsNumber'
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
          key:'orderId'
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
              label:'全部',
              value:'',
            },
            {
              label:'待审核',
              value:'PENDING_REVIEW',
            },
            {
              label:'已付款',
              value:'PAYSUCC',
            },
            {
              label:'已取消',
              value:'CANCEL',
            },
            {
              label:'已发货',
              value:'INTRACK',
            },
            {
              label:'未发货',
              value:'NEW',
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