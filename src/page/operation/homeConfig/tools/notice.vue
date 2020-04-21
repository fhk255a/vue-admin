<template>
  <div class="joker-operation-home-tools-notice">
    <el-tabs type="border-card">
      <el-tab-pane label="基本配置">
        <div class="joker-form">
          <Item title="当前组件ID：">{{data.id}}</Item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="内容配置">
        <div class="joker-form banner-form">
          <Item title="文本颜色">
            <el-color-picker v-model="data.data.color" @change="update()"></el-color-picker>
          </Item>
          <Item title="背景颜色">
            <el-color-picker v-model="data.data.background" @change="update()"></el-color-picker>
          </Item>
          <Item title="文本内容">
            <el-input type="textarea" v-model="data.data.content" @change="update()"></el-input>
          </Item>
          <Item title="左侧图标">
            <div style="display:flex">
              <el-input v-model="data.data.icon"/>
              <span style="width:140px;line-height:40px;margin-left:10px">参照icon表</span>
            </div>
          </Item>
          <Item title="可否滚动">
            <el-radio v-model="data.data.scroll" @change="update" :label="true">是</el-radio>
            <el-radio v-model="data.data.scroll" @change="update" :label="false">否</el-radio>
          </Item>
          <Item title="可否关闭">
            <el-radio v-model="data.data.close" @change="update" :label="true">是</el-radio>
            <el-radio v-model="data.data.close" @change="update" :label="false">否</el-radio>
          </Item>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Upload from '@/components/Upload';
import Item from '@/components/Item';
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    }
  },
  data(){
    return{
      event:[
        {
          value:'url',
          label:'跳转链接',
        },
        {
          value:'product',
          label:'商品详情',
        },
        {
          value:'collection',
          label:'商品集合（商品列表）',
        },
        {
          value:'',
          label:'默认',
        },
      ]
    }
  },
  methods:{
    update(){
      this.$emit('update',this.data);
    },
  },
  components:{
    Item,
    Upload
  }
}
</script>

<style lang="scss">
.joker-operation-home-tools-notice {
 
}
</style>