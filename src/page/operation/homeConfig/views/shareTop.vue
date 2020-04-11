<template>
  <div class="item-components h5-page-component-share-top" 
  :style="{height:(200+(data.showTitle?20:0)+(data.showPrice?20:0)+'px')}">
    <ItemHeader :title="data.title" className="top-title" :more="data.showMore"/>
    <ul class="product-list">
      <template v-if="data.data.length>0">
        <li class="product-item" v-for="(item,index) in data.data" :key="item.id">
          <img class="share-icon" src="@/assets/image/pageConfig/top1.png" alt="" v-if="index==0">
          <img class="share-icon" src="@/assets/image/pageConfig/top2.png" alt="" v-if="index==1">
          <img class="share-icon" src="@/assets/image/pageConfig/top3.png" alt="" v-if="index==2">
          <div class="product-image">
            <img src="@/assets/image/image.png" v-load-img="item.mainImage" class="img" alt="">
          </div>
          <p class="product-name" v-if="data.showTitle">{{item.title}}</p>
          <p class="product-price" v-if="data.showPrice">￥{{item.outPrice}}</p>
        </li>
      </template>
      <template v-else>
        <li class="product-item" v-for="(item,index) in 3" :key="item.id">
          <img class="share-icon" src="@/assets/image/pageConfig/top1.png" alt="" v-if="index==0">
          <img class="share-icon" src="@/assets/image/pageConfig/top2.png" alt="" v-if="index==1">
          <img class="share-icon" src="@/assets/image/pageConfig/top3.png" alt="" v-if="index==2">
          <div class="product-image">
            <img src="@/assets/image/image.png" class="img" alt="">
          </div>
          <p class="product-name" v-if="data.showTitle">商品标题</p>
          <p class="product-price" v-if="data.showPrice">￥商品价格</p>
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
      default:()=>{}
    }
  },
  components:{
    ItemHeader
  }
}
</script>

<style lang="scss">
#app .h5-page-component-share-top{
  .top-title{
    color: #fe5d33;
  }
  height: 200px;
  padding: 12px;
  background: #fff;
  overflow: hidden;
  >.product-list{
    display: flex;
    overflow-x: scroll;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
    padding-bottom: 25px;
    .product-item{
      width: 138px;
      min-width: 138px;
      margin-right: 8px;
      text-align: center;
      position: relative;
      .share-icon{
        position: absolute;
        left: 12px;
      }
      &:last-child{
        margin-right: 0;
      }
      .product-image{
        width: 138px;
        height: 138px;
        border-radius: 6px;
        overflow: hidden;
      }
      .product-price{
        color: #FE5427;
        font-weight: 500;
        font-size: 16px;
        margin: 8px 0;
      }
      .product-name{
        font-weight: 400;
        font-size: 14px;
        color: #666;
        margin-top: 4px;
        height: 14px;
        overflow: hidden;
      }
    }
  }
}
</style>