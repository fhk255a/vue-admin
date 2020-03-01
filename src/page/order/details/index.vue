<template>
  <div class="joker-page-order-details" v-if="orderInfo.orderInfo">
    <div class="order-title">
      {{orderInfo.orderInfo.id}}
      <el-tag>{{getOrderStatusLabel()}}</el-tag>
    </div>
    <div class="mb-20"/>
    <Card title="订单基础信息">
      <ul class="base-info">
        <li>
          <span>用户：</span>
          <span class="txt">{{orderInfo.orderInfo.userId}}</span>
        </li>
        <li>
          <span>下单时间：</span>
          <span class="txt">{{$timer(orderInfo.orderInfo.createTime*1)}}</span>
        </li>
        <li>
          <span>订单状态：</span>
          <span class="txt">{{getOrderStatusLabel()}}</span>
        </li>
        <li>
          <span>支付状态：</span>
          <span class="txt">{{orderInfo.orderInfo.payStatus==1?'已支付':'未支付'}}</span>
        </li>
      </ul>
      <div>
        <span>备注：</span>
        <span class="txt">{{orderInfo.orderInfo.remark}}</span>
      </div>
    </Card>
    <div class="mb-20"/>
    <Card title="收货人信息">
      <ul class="base-info" v-if="userInfo">
        <li>
          <span>姓名：</span>
          <span class="txt">{{userInfo.name}}</span>
        </li>
        <li>
          <span>手机：</span>
          <span class="txt">{{userInfo.mobile}}</span>
        </li>
        <li>
          <span>地址：</span>
          <span class="txt">{{userInfo.address}}</span>
        </li>
        <li>
          <span>邮政编码：</span>
          <span class="txt">{{userInfo.zipCode}}</span>
        </li>
      </ul>
    </Card>
    <div class="mb-20"/>
    <Card title="物流信息">
      <div v-if="orderInfo.orderInfo.orderStatus == 'CANCEL'" style="text-align: center;color: #999;">
        订单已取消
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
import Card from '@/components/Card';
export default {
  mounted(){
    this.getData(this.$route.params.id);
  },
  methods:{
    getData(id){
      // TODO 根据这个id去获取详情信息
      this.notify(`当前订单ID是：[ ${id} ]`)
      const first = this.$store.state.order.details;
      const req = {
        ...first,
        data:{
          ...first.data,
          orderInfo:{
            ...first.data.orderInfo,
            ...this.$route.query,
            addressSnapshot:first.data.orderInfo.addressSnapshot
          },
        }
      };
      this.$store.dispatch('changeOrderDetails',req)
      const res = this.$store.state.order.details;
      if(res.code == 200){
        this.orderInfo = res.data;
        this.routes = this.orderInfo.packageList[0].routes;
        this.userInfo = JSON.parse(this.orderInfo.orderInfo.addressSnapshot);
      }
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
    Table
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
  .joker-page-order-details{
    color:#000;
    .order-title{
      font-weight: 600;
      text-align: center;
      font-size: 24px;
    }
    .base-info{
      display: flex;
      flex-wrap: wrap;
      li{
        margin-right: 40px;
        margin-bottom: 10px;
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