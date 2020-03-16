<template>
  <div :class="['joker-form-item',className]">
    <div class="joker-form-item-label" 
    :style="{minWidth:width!='' && width,width:width!='' && width,textAlign:width!=''?'right':'left'}" 
    v-if="title">{{title}}</div>
    <div class="joker-form-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:()=>'',
    },
    className:{
      type:String,
      default:()=>'',
    },
    width:{
      type:String,
      default:()=>''
    }
  },
}
</script>

<style scoped lang="scss">
  #app>.joker-form>.joker-form-item{
    margin-bottom: 20px;
    >.joker-form-item-content{
      flex:1;
    }
  }
  #app .joker-form .w100{
    text-align: right;
    margin-right: 10px;
    display:flex;
    .joker-form-item-label{
      min-height:40px;
    }
  }
</style>