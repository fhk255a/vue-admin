<template>
  <div class="vue-pageConfig-components-item-header">
    <div :class="['left',className]">
      {{title}}
    </div>
    <div class="right" v-if="more">More <span class="el-icon-arrow-right"></span> </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:()=>''
    },
    className:{
      type:String,
      default:()=>''
    },
    more:{
      type:Boolean,
      default:()=>false
    },
  }
}
</script>

<style lang="scss"> 
.vue-pageConfig-components-item-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
  >.left{
    color: #000000;
    font-size: 16px;
    font-weight: 600;
  }
  >.right{
    color: #FE5427;
    font-size: 16px;
  }
}
</style>