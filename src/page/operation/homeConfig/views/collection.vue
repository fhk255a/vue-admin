<template>
  <div class="item-components h5-page-component-collection">
    <ItemHeader :title="data.title" className="top-title" :more="data.showMore"/>
    <div class="container">
      <template v-for="(item,index) in data.data">
        <div v-if="index==0" class="flex-one" :key="item.id">
          <div class="item-title">
            <span class="title">{{item.title?item.title:'默认商品集标题'}}</span>
            <span class="count">{{item.count?item.count:0}}件商品</span>
          </div>
          <template v-if="item.productIds && item.productIds.length>0">
            <template v-for="(item,index) in item.productIds" >
              <div v-if="index<3" :key="'one-1'+index" class="flex-one-list">
                <img src="@/assets/image/image.png" v-load-img="item.mainImage" class="img" alt="">
              </div>
            </template>
            <template v-if="(3-item.productIds.length)>0">
              <template v-for="(it,ind) in (3-item.productIds.length)" >
                <div :key="'one-2'+ind" class="flex-one-list">
                  <img src="@/assets/image/image.png" class="img" alt="">
                </div>
              </template>
            </template>
          </template>
          <template v-else>
            <template v-for="(it,ind) in 3" >
               <div :key="'one-3'+ind" class="flex-one-list">
                <img src="@/assets/image/image.png" class="img" alt="">
              </div>
            </template>
          </template>
        </div>
        <div v-else :key="item.id" :class="['flex-arr w50',(index != data.data.length-1 && index != data.data.length-2)?'bb':'']">
          <span class="title">{{item.title?item.title:'默认商品集标题'}}</span>
          <div class="product-list">
            <template v-if="item.productIds && item.productIds.length>0">
              <template v-for="(it,ind) in item.productIds" >
                <img src="@/assets/image/image.png" v-if="ind<2" :key="'arr-1'+ind" v-load-img="it.mainImage" class="img" alt="">
              </template>
              <template v-if="(2-item.productIds.length)>0">
                <template v-for="(it,ind) in (2-item.productIds.length)" >
                  <img src="@/assets/image/image.png" :key="'arr-2'+ind" class="img" alt="">
                </template>
              </template>
            </template>
            <template v-else>
              <template v-for="(it,ind) in 2" >
                <img src="@/assets/image/image.png" :key="'arr-3'+ind" class="img" alt="">
              </template>
            </template>
          </div>
        </div>
      </template>
    </div>
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
#app .h5-page-component-collection{
  padding: 10px;
  >.container{
    border-radius: 6px;
    display: flex;
    flex-wrap: wrap;
    // padding: 12px 0;
    background: #fff;
  }
  .flex-one{
    padding: 12px;
    display: flex;
    height: 99px;
    width: 100%;
    .item-title{
      height: 75px;
      overflow: hidden;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-around;
    }
    border-bottom: 1px solid #EEEEEE;
  }
  .title{
    font-weight: 600;
    font-size:13px;
  }
  .count{
    color: #A4A4A4;
    font-size: 12px;
  }
  .flex-one-list{
    border-radius: 4px;
    min-width:74px;
    overflow: hidden;
    margin-left: 5px;
    min-height: 74px;
    .img{
      width: 74px;
      height: 74px;
    }
  }
  .flex-arr{
    display: flex;
    .product-list{
      padding: 12px;
    }
  }
  .w50{
    width: 50%;
    display: flex;
    box-sizing: border-box;
    padding:12px;
    flex-direction: column;
    border-right: 1px solid #EEEEEE;
    &:nth-child(2n-1){
      border-right: 0;
    }
    >.title{
      margin-bottom: 8px;
    }
    .product-list {
      overflow: hidden;
      display: flex;
      height: 74px;
      min-height: 74px;
      justify-content: space-between;
      padding: 0;
      img{
        width: 73px;
        height: 73px;
        border-radius: 6px;
      }
    }
    >.title{
      width: 100%;
      display: block;
    }
  }
  .bb{
    border-bottom: 1px solid #EEEEEE;
  }
}
</style>