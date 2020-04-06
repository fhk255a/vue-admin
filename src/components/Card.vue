<template>
  <div class="joker-component-card" :style="{borderColor:color?color:'#eee'}">
    <div class="j-card-title" :style="{background:color?color:''}">
      <div class="left" v-html="title"></div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="j-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:()=>'默认标题'
    },
    color:{
      type:String,
      default:()=>''
    }
  }
}
</script>

<style lang="scss">
  .joker-component-card{
    width: 100%;
    border:1px solid #eee;
    border-radius: 6px;
    .j-card-title{
      color:#666;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      align-items: center;
      justify-content: space-between;
      display: flex;
      padding: 16px 20px;
      border-bottom:1px solid #eee;
    }
    .j-card-body{
      padding: 16px 20px;
    }
  }
</style>