<template>
  <div class="item-components h5-page-component-product-list">
    <ItemHeader :title="data.title" :more="data.showMore"/>
    <ul :class="['product-list','p-'+data.itemType]">
      <template v-if="data.data.length>0">
        <li class="product-item" v-for="(item) in data.data" :key="item.id">
          <div class="product-image" >
            <img class="img" v-load-img="item.mainImage" src="@/assets/image/image.png" alt="">
          </div>
          <div class="product-info">
            <p class="product-title line-2" v-if="data.showTitle">{{item.title}}</p>
            <p class="product-remark" v-if="data.showRemark">{{item.remark}}</p>
            <p class="product-price" v-if="data.showPrice">￥{{item.outPrice}}</p>
            <p class="product-old-price" v-if="data.showPrice">￥{{(item.outPrice*1+item.outPrice*.5).toFixed(2)}}</p>
          </div>
        </li>
      </template>
      <template v-else>
        <li class="product-item" v-for="(item) in 4" :key="item">
          <div class="product-image" >
            <img class="img" src="@/assets/image/image.png" alt="">
          </div>
          <div class="product-info">
            <p class="product-title line-2" v-if="data.showTitle">虚拟标题</p>
            <p class="product-remark" v-if="data.showRemark">默认备注</p>
            <p class="product-price" v-if="data.showPrice">虚拟价格</p>
            <p class="product-old-price" v-if="data.showPrice">虚拟价格</p>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import ItemHeader from '../header';
export default {
  props:{
    data:{
      type:Object,
      default:()=>{},
    }
  },
  components:{
    ItemHeader
  }
}
</script>

<style lang="scss">
.h5-page-component-product-list{
  padding: 12px;
  background: #f0f0f2;
  .p-1{

  }
  .p-2{
    .product-item{
      width: 168px;
      margin-right: 10px;
      &:nth-child(2n){
        margin-right: 0;
      }
    }
    .product-image{
      width: 168px;
      height: 168px;
    }
  }
  .p-3{
    .product-item{
      width: 110px;
      margin-right: 7px;
      &:nth-child(3n){
        margin-right: 0;
      }
    }
    .product-image{
      width: 110px;
      height: 110px;
    }
  }
  >.product-list{
    background: #F0F0F2;
    display: flex;
    flex-wrap: wrap;
    >.product-item{
      margin-bottom: 7px;
      .product-image{
        .img{
          width: 100%;
          height: 100%;
        }
      }
      .product-info{
        border-radius: 0 0 8px 8px;
        overflow: hidden;
        background: #fff;
        padding: 8px;
        .product-title{
          line-height: 18px;
          font-size: 13px;
          font-weight: 400;
          height: 36px;
          color: #000;
        }
        .product-remark{
          line-height: 14px;
          overflow: hidden;
          height: 14px;
          color: #ccc;
          font-size: 12px;
        }
        .product-price{
          font-size: 16px;
          line-height: 21px;
          font-weight: 600;
          color: #FE5427;
          margin-top: 4px;
        }
        .product-old-price{
          text-decoration: line-through;
          font-size: 12px;
          color: #b2b2b2;
          margin-top: 2px;
        }
      }
    }
  }
}
</style>