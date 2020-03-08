<template>
  <div class="h5-page-componen-product">
    <div class="foor-title" v-if="data.title">{{data.title}}</div>
    <div class="product-list">
      <div class="product-item" 
        :style="{width:data.itemType}" 
        v-for="(item,index ) in data.data" 
        :key="item.id+'_'+index">
        <div class="product-img">
          <img :src="item.mainImage" class="img" alt="">
        </div>
        <div class="product-info">
          <span class="title" v-if="data.showTitle*1==1?true:false">{{item.title_zh}}</span>
          <span class="remark" v-if="data.showRemark*1==1?true:false">{{item.remark}}</span>
          <span class="price" v-if="data.showPrice*1==1?true:false">{{item.priceRange}}</span>
        </div>
        <div class="product-btn" v-if="data.showBtn*1==1?true:false">
          <span>抢购</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    }
  }
}
</script>

<style lang="scss">
.product-list{
  display: flex;
  flex-wrap: wrap;
  .product-item{
    padding: 3px;
    .product-img{
      width: 100%;
      background: #fff;
      padding: 5px;
      padding-bottom: 0;
    }
    .product-info{
      padding: 5px;
      background: #fff;
      padding-top: 0;
      >span{
        display: block;
      }
      .title{
        font-size:14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: 1.3;
        overflow: hidden;
        max-height: 38px;
        min-height: 38px;
      }
      .remark{
        font-size: 12px;
        line-height: 1.5;
        color:#666;
        max-height: 20px;
        height: 20px;
        overflow: hidden;
      }
      .price{
        color:darkred;
        font-size: 14px;
      }
    }
    .product-btn{
      text-align: right;
      background: #fff;
      padding: 10px;
      height: 40px;
      font-size: 12px;
      span{
        border:1px solid #eee;
        background: #ddd;
        padding:5px 10px;
      }
    }
  }
}
</style>