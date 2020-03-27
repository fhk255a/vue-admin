<template>
  <div class="item-components h5-page-component-title">
    <div class="foor-title" v-if="data.isShowTitle" :style="{color:data.color}">{{data.title}}</div>
    <div :style="{
      background:data.data.background,
      color:data.data.color,
      textAlign:data.data.textAlign,
      fontSize:data.data.fontSize,
      fontWeight:data.data.fontWeight,
      padding:`${data.data.paddingTopBottom+'px'} ${data.data.paddingLeftRight+'px'}`
    }">{{data.data.content}}</div>
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
</style>