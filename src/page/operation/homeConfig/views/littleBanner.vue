<template>
  <div class="item-components h5-page-component-little-banner">
    <div v-if="data.data.length<=1" :style="{height:data.height+'px'}">
      <img src="@/assets/image/image.png" alt="" v-load-img="data.data[0].image" class="img">
    </div>
    <el-carousel v-else :height="data.height+'px'" >
     <el-carousel-item v-for="(item,index) in data.data" :key="index" >
       <div class="banner-item">
         <img src="@/assets/image/image.png" alt="" v-load-img="item.image" class="img">
       </div>
     </el-carousel-item>
    </el-carousel>
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
.h5-page-component-little-banner{
  padding: 0 10px;
  >div{
    overflow: hidden;
    border-radius: 6px;
  }
  .banner-item{
    width: 100%;
    height: 100%;
    position: relative;
    .banner-title{
      background: rgba(0, 0, 0, 0.13);
      padding: 10px;
      right: 0;
      left: 0;
      position: absolute;
    }
    img{
      width: 100%;
    }
  }
  .el-carousel__indicators {
    bottom: 0;
    position: absolute;
    right: 0;
    left: 0;
  }
}
</style>