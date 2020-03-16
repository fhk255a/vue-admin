<template>
  <div class="h5-page-tools-title">
    <el-tabs type="border-card">
      <el-tab-pane label="基本配置">
        <div class="joker-form">
          <Item title="当前组件ID：">{{currentData.id}}</Item>
          <Item title="楼层标题：">
            <el-input v-model="currentData.title" @change="changeInput()"/>
          </Item>
          <Item title="是否显示标题：">
            <el-radio v-model="currentData.isShowTitle" :label="true" @change="update()">显示</el-radio>
            <el-radio v-model="currentData.isShowTitle" :label="false" @change="update()">隐藏</el-radio>
          </Item>
          <Item title="文本颜色：">
            <el-color-picker v-model="currentData.color" @change="changeInput()"></el-color-picker>
          </Item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="内容配置">
        <div class="joker-form">
          <Item title="公告内容：">
            <el-input v-model="component.data.content" @change="changeInput"/>
          </Item>
          <Item title="文本颜色：">
            <el-color-picker v-model="component.data.color"></el-color-picker>
          </Item>
          <Item title="背景颜色：">
            <el-color-picker v-model="component.data.background"></el-color-picker>
          </Item>
          <Item title="字体大小：">
            <el-radio v-model="component.data.fontSize" label="14px">14px</el-radio>
            <el-radio v-model="component.data.fontSize" label="16px">l6px</el-radio>
            <el-radio v-model="component.data.fontSize" label="18px">18px</el-radio>
            <el-radio v-model="component.data.fontSize" label="20px">20px</el-radio>
          </Item>
          <Item title="字体加粗：">
            <el-radio v-model="component.data.fontWeight" label="normal">普通</el-radio>
            <el-radio v-model="component.data.fontWeight" label="bold">加粗</el-radio>
            <el-radio v-model="component.data.fontWeight" label="lighter">更细</el-radio>
          </Item>
          <Item title="文本布局：">
            <el-radio v-model="component.data.textAlign" label="left">居左</el-radio>
            <el-radio v-model="component.data.textAlign" label="center">居中</el-radio>
            <el-radio v-model="component.data.textAlign" label="right">居右</el-radio>
          </Item>
          <Item title="内边距：">
            <Item title="上下：">
              <el-slider style="width:200px" v-model="component.data.paddingTopBottom"></el-slider>
            </Item>
            <Item title="左右：">
              <el-slider style="width:200px" v-model="component.data.paddingLeftRight"></el-slider>
            </Item>
          </Item>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Item from '@/components/Item';
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
  },
  components:{
    Item
  }
}
</script>

<style lang="scss">
.h5-page-tools-title{
  .w100{
    .joker-form-item-label{
      text-align: right;
      padding-right: 10px;
    }
  }
  .font{
    .joker-form-item-label{
      width: 60px;
      min-width: 50px;
    }
  }
}
</style>