<template>
  <div class="joker-page-order-details" v-if="orderInfo.orderInfo">
    <div class="order-title">
      {{orderInfo.orderInfo.id}}
      <el-tag>{{getOrderStatusLabel()}}</el-tag>
    </div>
    <div class="mb-20"/>
    <Card title="订单基础信息">
      <div class="base-info joker-form">
        <Item title="用户：">{{orderInfo.orderInfo.userId}}</Item>
        <Item title="下单时间：">{{$timer(orderInfo.orderInfo.createTime*1)}}</Item>
        <Item title="订单状态：">{{getOrderStatusLabel()}}</Item>
        <Item title="支付状态：">{{orderInfo.orderInfo.payStatus==1?'已支付':'未支付'}}</Item>
        <Item title="备注：">{{orderInfo.orderInfo.remark}}</Item>
      </div>
    </Card>
    <div class="mb-20"/>
    <Card title="收货人信息">
      <div class="base-info joker-form" v-if="userInfo">
        <Item title="姓名：">{{userInfo.name}}</Item>
        <Item title="手机：">{{userInfo.mobile}}</Item>
        <Item title="地址：">{{userInfo.address}}</Item>
        <Item title="邮政编码：">{{userInfo.zipCode}}</Item>
      </div>
    </Card>
    <div class="mb-20"/>
    <Card :title="orderInfo.orderInfo.orderStatus != 'CANCEL'?'物流信息':'订单已取消'">
      <div v-if="orderInfo.orderInfo.orderStatus == 'CANCEL'" class="base-info joker-form">
        <Item title="取消人：">{{orderInfo.orderInfo.cancelUser}}</Item>
        <Item title="取消原因：">{{orderInfo.orderInfo.cancelCode}}</Item>
        <Item title="取消时间：">{{$timer(orderInfo.orderInfo.cancelDate*1)}}</Item>
      </div>
      <el-steps v-else direction="vertical" :active="15">
        <el-step 
          v-for="(item,index) in routes" :key="index"
          :title="`${item.scanDateTime}  -  ${item.remark}`" 
        />
      </el-steps>
    </Card>
    <div class="mb-20"/>
    <Card color="#eee" title="订单商品">
      <Table :tableList="orderInfo.packageList[0].erpPackageDetailInfoDtos" :config="tableConfig">
        <template slot-scope="row" slot="image">
          <div style="width:80px;height:80px">
            <img class="img" :src="row.scope.data.image" @click="$store.dispatch('imgDialog',{status:true,img:row.scope.data.image})" alt="">
          </div>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import Container from '@/components/Container';
import Table from '@/components/Table';
import Item from '@/components/Item';
import Card from '@/components/Card';
import isPass from '@/lib/esss';
import ORDER from '@/api/order';
export default {
  mixins:[isPass],
  mounted(){
    this.getData(this.$route.params.id);
  },
  methods:{
    getData(id){
      // TODO 根据这个id去获取详情信息
      this.notify(`当前订单ID是：[ ${id} ]`)
      const first = this.$store.state.order.details;
      ORDER.details(id).then(res=>{
        if(res.code == 200){
          this.orderInfo = {
            ...first.data,
            orderInfo:{
              ...res.data,
              addressSnapshot:first.data.orderInfo.addressSnapshot
            },
          };
          this.routes = this.orderInfo.packageList[0].routes;
          this.userInfo = JSON.parse(this.orderInfo.orderInfo.addressSnapshot);
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    // 获取订单状态
    getOrderStatusLabel(){
      switch(this.orderInfo.orderInfo.orderStatus){
        case "PENDING_REVIEW":
          return '待审核';
        case "PAYSUCC":
          return '已付款';
        case "CANCEL":
          return '已取消';
        case "INTRACK":
          return '已发货';
        case "NEW":
          return '未发货';
      }
    }
  },
  components:{
    Container,
    Card,
    Table,
    Item
  },
  data(){
    return{
      orderInfo:{},
      userInfo:{},
      routes:[], // 物流信息
      tableConfig:[
        {
          label:'商品ID',
          value:'spuId',
        },
        {
          label:'商品图片',
          value:'image',
          set:true,
        },
        {
          label:'商品名称',
          value:'title',
        },
        {
          label:'数量',
          value:'num',
        },
        {
          label:'金额',
          value:'price',
        },
      ]
    }
  }
}
</script>

<style lang="scss">
#app .joker-page-order-details{
    color:#000;
    .order-title{
      font-weight: 600;
      text-align: center;
      font-size: 24px;
    }
    .base-info{
      display: flex;
      flex-wrap: wrap;
      .joker-form-item{
        margin-right: 40px;
        min-height: auto;
      }
    }
    .txt{
      color:#666;
    }
    .el-step .el-step__main{
      margin-bottom: 10px;
    }
  }
</style>