<template>
  <div class="h5-page-component-banner">
    <el-carousel indicator-position="outside">
     <el-carousel-item v-for="(item,index) in data.data" :key="index">
       {{item.title}}
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

<style>

</style>