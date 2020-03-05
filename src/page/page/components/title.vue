<template>
  <div class="h5-page-component-title">
    <div :style="{background:data.data.background,color:data.data.color}">{{data.data.content}}</div>
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

}
</style>