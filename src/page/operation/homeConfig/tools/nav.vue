<template>
  <div class="joker-operation-home-tools-nav">
    <el-tabs type="border-card">
      <el-tab-pane label="基本配置">
        <div class="joker-form">
          <Item title="当前组件ID：">{{data.id}}</Item>
          <Item title="排列方式：">
            <el-radio v-model="data.num" label="4" @change="update">一行4个</el-radio>
            <el-radio v-model="data.num" label="5" @change="update">一行5个</el-radio>
          </Item>
          <Item title="排列方式：">
            <el-radio v-model="data.isOne" :label="true" @change="update">一行显示</el-radio>
            <el-radio v-model="data.isOne" :label="false" @change="update">两行显示</el-radio>
          </Item>
        </div>
      </el-tab-pane>
       <el-tab-pane label="内容配置">
        <el-button @click="add">添加</el-button>
        <div class="joker-form nav-form">
          <Item v-for="(item,index) in data.data" :key="index">
            <div class="joker-form nav-item">
              <Item title="图片">
                <Upload @success="success" v-if="!item.image" :index="index"></Upload>
                <div v-else class="nav-item-img">
                  <img src="@/assets/image/image.png" v-load-img="item.mainImage" class="img" alt="">
                  <span class="delete" @click="item.image=''">删除图片</span>
                </div>
              </Item>
              <Item title="文本">
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
        </div>
       </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Upload from '@/components/Upload';
import Item from '@/components/Item';
export default {
  components:{
    Upload,
    Item,
  },
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
  }
}
</script>

<style lang="scss">
.joker-operation-home-tools-nav{
  .nav-item{
    position: relative;
    padding: 16px;
    border: 1px solid #ccc;
    width: 400px;
    .nav-item-img{
      height: 100px;
      width: 100px;
      position: relative;
      img{
        border-radius: 50%;
        display: block;
        border:1px solid #eee;
      }
    }
    .delete{
      position: absolute;
      right: -80px;
      top:0;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .nav-form{
    max-height: 70vh;
    overflow-y: scroll;
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
</style>