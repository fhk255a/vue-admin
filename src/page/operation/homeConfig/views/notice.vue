<template>
  <div class="item-components h5-page-component-notice" :style="{background:data.data.background,color:data.data.color}">
    <span class="iconfont el-icon-message-solid"></span>
    <div class="notice-container">
      <div :class="['content',data.data.scroll?'move':'',data.data.close?'close-icon':'']">{{data.data.content}}</div>
    </div>
    <span class="iconfont el-icon-error"></span>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    }
  },
}
</script>

<style lang="scss">
.h5-page-component-notice{
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  height: 24px;
  overflow: hidden;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  color: #ed6a0c;
  font-size: 14px;
  line-height: 24px;
  background-color: #fffbe8;
  
  .move{
    animation: 10s notice-auto linear infinite normal;
  }
  .el-icon-message-solid{
    position: absolute;
    left: 15px;
    top:10px;
  }
  .notice-container{
    margin: 0 20px;
    flex:1;
    height: 40px;
    align-items: center;
    overflow: hidden;
    position: relative;
    .content{    
      animation-delay: 0s;
      animation-duration: 17.6006s;
      padding: 8px 0;
      position: absolute;
      white-space: nowrap;
    }
  }
  .el-icon-error{
    position: absolute;
    right: 15px;
    top:10px;
  }
}
</style>