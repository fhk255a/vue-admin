<template>
  <div class="joker-operation-home-tools-banner">
    <el-tabs type="border-card">
      <el-tab-pane label="基本配置">
        <div class="joker-form">
          <Item title="当前组件ID：">{{data.id}}</Item>
          <Item title="文本颜色：">
            <el-color-picker v-model="data.color" @change="update()"></el-color-picker>
          </Item>
          <Item title="文本背景颜色：">
            <el-color-picker v-model="data.background" show-alpha @change="update()"></el-color-picker>
          </Item>
          <Item title="显示下标">
            <el-radio v-model="data.showIndex" @change="update" :label="true">是</el-radio>
            <el-radio v-model="data.showIndex" @change="update" :label="false">否</el-radio>
          </Item>
          <Item title="图片高度：">
            <el-input type="number" @change="update" v-model="data.height" >
              <template slot="append">PX</template>
            </el-Input>
          </Item>
          <Item title="标题位置：">
            <el-radio v-model="data.postion" @change="update" label="top">顶部</el-radio>
            <el-radio v-model="data.postion" @change="update" label="bottom">底部</el-radio>
          </Item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="内容配置">
        <div class="joker-form banner-form">
          <Item v-for="(item,index) in data.data" :key="index">
            <div class="joker-form banner-item">
              <Item title="图片">
                <Upload @success="success" v-if="!item.image" :index="index"></Upload>
                <div v-else class="banner-item-img">
                  <img src="@/assets/image/image.png" v-load-img="item.image" class="img" alt="">
                  <span @click="item.image=''">删除图片</span>
                </div>
              </Item>
              <Item title="图片标题">
                <el-input v-model="item.title"></el-input>
              </Item>
              <Item title="点击行为">
                <el-select v-model="item.event">
                  <el-option v-for="(label,v) in event" :key="label.value" 
                  :label="label.label" :value="label.value"></el-option>
                </el-select>
                <template v-if="item.event!=''">
                  <el-input v-model="item.eventValue"/>
                </template>
              </Item>
              <div class="tools-box">
                <span @click="deleteItem(index)" class="el-icon-delete"></span>
                <span @click="topItem(index)" v-if="index!=0" class="el-icon-arrow-up"></span>
                <span @click="bottomItem(index)" v-if="index!=data.data.length-1" class="el-icon-arrow-down"></span>
              </div>
            </div>
          </Item>
          <Item>
            <el-button @click="add">添加</el-button>
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
    success(data){
      this.data.data[data.index].image = data.data;
      this.update();
    },
    update(){
      this.$emit('update',this.data);
    },
    add(){
      this.data.data.push({
        event:'',
        eventValue:'',
        image:'',
        title:'',
      })
    },
    deleteItem(index){
      this.data.data.splice(index,1);
    },
    // 向上移动
    topItem(index){
      if(index == 0){
        return;
      }else{
        this.data.data[index] = this.data.data.splice(index-1,1,this.data.data[index])[0];
      }
    },
    // 向下移动
    bottomItem(index){
      if(index == this.data.data.length-1){
        return;
      }else{
        this.data.data[index] = this.data.data.splice(index+1,1,this.data.data[index])[0];
      }
    },
  },
  components:{
    Item,
    Upload
  }
}
</script>

<style lang="scss">
.joker-operation-home-tools-banner {
  .banner-item{
    border: 1px solid #ccc;
    padding: 16px;
    width:550px;
    position: relative;
    .banner-item-img{
      height: 100px;
      width: 200px;
      position: relative;
      .img{
        border:1px solid #eee;
        width: 100%;
        height: 100%;
        display: block;
      }
      span{
        position: absolute;
        right: -80px;
        top:0;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .tools-box{
      right: -25px;
      top: 0;
      position: absolute;
      >span{
        display: block;
        margin-bottom: 10px;
        color: #fff;
        padding: 5px 3px;
        background: #f56c6c;
        cursor: pointer;
        &:hover{
          color: #333;
        }
      }
    }
  }
}
</style>