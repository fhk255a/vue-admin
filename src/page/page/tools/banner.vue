<template>
  <div class="h5-page-tools-banner">
    <el-tabs type="border-card">
      <el-tab-pane label="基本配置">
        <div class="joker-form">
          <Item title="当前组件ID：">{{component.id}}</Item>
          <Item title="楼层标题：">
            <el-input v-model="component.title" @change="update()"/>
          </Item>
          <Item title="是否显示标题：">
            <el-radio v-model="component.isShowTitle" :label="true" @change="update()">显示</el-radio>
            <el-radio v-model="component.isShowTitle" :label="false" @change="update()">隐藏</el-radio>
          </Item>
          <Item title="文本颜色：">
            <el-color-picker v-model="component.color" @change="update()"></el-color-picker>
          </Item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="内容配置">
        <div class="joker-form">
          <Item title="图片高度：">
            <el-input type="number" @change="changeBackground" v-model="component.height" >
              <template slot="append">PX</template>
            </el-Input>
          </Item>
          <Item title="标题背景色：">
            <el-color-picker @change="changeBackground" v-model="component.background" show-alpha></el-color-picker>
          </Item>
          <Item title="标题文本颜色：">
            <el-color-picker v-model="component.color" @change="changeColor"></el-color-picker>
          </Item>
          <Item title="标题位置：">
            <el-radio v-model="component.postion" @change="changePostion" label="top">顶部</el-radio>
            <el-radio v-model="component.postion" @change="changePostion" label="bottom">底部</el-radio>
          </Item>
        </div>
        <div class="banner-container" v-if="component.data.length>0">
          <div class="joker-form" style="background:#fff" v-for="(item,index) in component.data" :key="item.id">
            <Item className="w100 banner-list" >
              <el-button @click="remove" type="danger">删除</el-button>
              <Item title="标题：">
                <el-input v-model="item.title"/>
              </Item>
              <Item title="图片路径：">
                <el-input class="w100" v-model="item.image" />
              </Item>
              <Item title="图片：">
                <div style="width:80px;" v-if="item.image!=''" class="banner-img">
                  <img class="img" :src="item.image"/>
                  <span class="icon-shanchu1 iconfont" @click="item.image=''"></span>
                </div>
                <i class="el-icon-plus" @click="openMedia(index)" v-else></i>
              </Item>
            </Item>
          </div>
        </div>
        <div>
          <el-button class="add" @click="addBanner" >添加</el-button>
        </div>
        <Dialog title="媒体库" :show="dialog" @close="close">
          <Media @getImage="getImage"/>
        </Dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {ID} from '@/lib/common';
import Dialog from '@/components/Dialog';
import Media from '@/components/Media';
import Item from '@/components/Item';
export default {
  components:{
    Dialog,
    Media,
    Item
  },
  props:{
    component:{
      type:Object,
      default:()=>{}
    }
  },
  data(){
    return {
      fileList:[],
      dialog:false,
      uploadIndex:0,
    }
  },
  methods:{
    changeBackground(){
      this.$emit('update',this.component);
    },
    update(){
      this.$emit('update',this.component);
    },
    changeColor(){
      this.$emit('update',this.component);},
    changePostion(){
      this.$emit('update',this.component);},
    openMedia(index){
      this.uploadIndex = index;
      this.dialog = true;
    },
    // 获取图片
    getImage(img){
      this.component.data[this.uploadIndex].image = img;
      this.close();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      // this.uploadData.name = file
      console.log(file);
    },
    close(){
      this.dialog = false;
    },
    remove(index){
      this.component.data.splice(index,1);
    },
    // 添加banner
    addBanner(){
      this.component.data.push({
        id:ID(),
        title:'',
        image:''
      })
    }
  },
  computed:{
    currentComponent(){
      return this.$store.state.page.components[this.$store.state.page.componentIndex];
    },
  }
}
</script>

<style lang="scss">
.h5-page-tools-banner{
  .el-icon-plus{
    font-size: 24px;
    border:1px solid #eee;
    background: #fff;
    padding: 30px;
    border: 1px dashed #ccc;
  }
  .mb-20{
    margin-bottom: 0;
    padding-top: 20px;
    height: 1px;
    width: 100px;
    border-bottom:1px #070f14 dashed;
  }
  .banner-list >.joker-form-item-content{
    width: 100%;
    padding: 10px;
    border:1px solid #eee;
  }
  .banner-container{
    background: #fff;
    padding:10px;
    .banner-img{
      position: relative;
      .iconfont{
        position: absolute;
        right: 0;
        color: #000;
      }
    }
  }
  .add{
    margin-top: 10px;
    cursor: pointer;
    border: 0;
    border-top: 1px solid #eee;
    text-align: center;
  }
}
</style>