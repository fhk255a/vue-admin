<template>
  <div class="h5-page-tools-title">
    <div class="joker-form">
      <div class="joker-form-item w100">
        <div class="joker-form-item-label">内容</div>
        <div class="joker-form-item-content">
          <el-input v-model="component.data.content" @change="changeInput"/>
        </div>
      </div>
      <div class="joker-form-item w100">
        <div class="joker-form-item-label">文本颜色</div>
        <div class="joker-form-item-content">
          <el-color-picker v-model="component.data.color"></el-color-picker>
        </div>
      </div>
      <div class="joker-form-item w100">
        <div class="joker-form-item-label">背景颜色</div>
        <div class="joker-form-item-content">
          <el-color-picker v-model="component.data.background"></el-color-picker>
        </div>
      </div>
      <div class="joker-form-item w100">
        <div class="joker-form-item-label">字体大小</div>
        <div class="joker-form-item-content">
          <el-radio v-model="component.data.fontSize" label="14px">14px</el-radio>
          <el-radio v-model="component.data.fontSize" label="16px">l6px</el-radio>
          <el-radio v-model="component.data.fontSize" label="18px">18px</el-radio>
          <el-radio v-model="component.data.fontSize" label="20px">20px</el-radio>
        </div>
      </div>
      <div class="joker-form-item w100">
        <div class="joker-form-item-label">字体加粗</div>
        <div class="joker-form-item-content">
          <el-radio v-model="component.data.fontWeight" label="normal">普通</el-radio>
          <el-radio v-model="component.data.fontWeight" label="bold">加粗</el-radio>
          <el-radio v-model="component.data.fontWeight" label="lighter">更细</el-radio>
        </div>
      </div>
      <div class="joker-form-item w100">
        <div class="joker-form-item-label">文本布局</div>
        <div class="joker-form-item-content">
          <el-radio v-model="component.data.textAlign" label="left">居左</el-radio>
          <el-radio v-model="component.data.textAlign" label="center">居中</el-radio>
          <el-radio v-model="component.data.textAlign" label="right">居右</el-radio>
        </div>
      </div>
      <div class="joker-form-item w100">
        <div class="joker-form-item-label">内边距</div>
        <div class="joker-form-item-content" style="width:200px">
          <el-slider v-model="component.data.paddingTopBottom"></el-slider>
          <el-slider v-model="component.data.paddingLeftRight"></el-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['component'],
  data(){
    return{
      currentData:{
        data:{
          content:'',
          background:'',
          color:'',
        },
      },
      value1:0
      // currentComponent:this.$store.state.page.components[this.$store.state.page.componentIndex]
    }
  },
  methods:{
    changeInput(e){
      this.update();
    },
    update(){
      this.$emit('update',this.currentData);
    }
  },
  mounted(){
    this.currentData = {...this.$store.state.page.compData};
    console.log(this.$store.state.page.compData)
    console.log(this.component)
  }
}
</script>

<style lang="scss">
.h5-page-tools-title{
  .w100{
    .joker-form-item-label{
      width: 100px;
      text-align: right;
      padding-right: 10px;
    }
  }
}
</style>