<template>
  <div 
    :style="{
      background:data.data.background,
      color:data.data.color,
      textAlign:data.data.textAlign,
      fontSize:data.data.fontSize,
      fontWeight:data.data.fontWeight,
      padding:`${data.data.paddingTopBottom+'px'} ${data.data.paddingLeftRight+'px'}`
    }"
    class="h5-page-component-title">
    <div>{{data.data.content}}</div>
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
.h5-page-component-title{
  padding: 10px;
}
</style>