<template>
  <div class="h5-page-tools-title">
    <div class="joker-form">
      <div class="joker-form-item">
        {{$store.state.page.components}}
    {{$store.state.page.componentIndex}}
        <div class="joker-form-item-label">内容</div>
        <div class="joker-form-item-content">
          <el-input v-model="currentComponent.data.content"/>
        </div>
      </div>
      <div class="joker-form-item">
        <div class="joker-form-item-label">文本颜色</div>
        <div class="joker-form-item-content">
          <el-color-picker v-model="currentComponent.data.color"></el-color-picker>
        </div>
      </div>
      <div class="joker-form-item">
        <div class="joker-form-item-label">背景颜色</div>
        <div class="joker-form-item-content">
          <el-color-picker v-model="currentComponent.data.background"></el-color-picker>
        </div>
      </div>
    </div>
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
  data(){
    return{
      currentData:{},
      currentComponent:this.$store.state.page.components[this.$store.state.page.componentIndex]
    }
  },
}
</script>

<style lang="scss">
.h5-page-tools-title{

}
</style>