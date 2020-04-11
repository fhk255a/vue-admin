<template>
  <div class="item-components h5-page-component-banner">
    <el-carousel :indicator-position="data.showIndex?'outside':''" :height="data.height+'px'" >
     <el-carousel-item v-for="(item,index) in data.data" :key="index" >
       <div class="banner-item">
         <img src="@/assets/image/image.png" alt="" v-load-img="item.image" class="img">
         <span class="banner-title" v-if="item.title!=''" 
         :style="{
           bottom:data.postion=='bottom'?0:'unset',
           top:data.postion=='top'?0:'unset',
           color:data.color,
           background:data.background}"
         >{{item.title}}</span>
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
.h5-page-component-banner{
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