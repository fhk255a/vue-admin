<template>
  <div class="joker-component-container">
    <span class="container-title" v-if="title">{{title}}</span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props:['title']
}
</script>
<style lang="scss">
.joker-component-container{
  border:1px solid #eee;
  padding:20px;
  border-radius: 6px;
  position: relative;
  >.container-title{
    position: absolute;
    left: 20px;
    top: -12px;
    background: #fff;
    font-size: 20px;
    color: #666;
    font-weight: 100;
  }
}
</style>