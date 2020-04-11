<template>
  <div class="joker-operation-home-tools-collection">
    <el-tabs type="border-card">
      <el-tab-pane label="基本配置">
        <div class="joker-form">
          <Item title="当前组件ID：">{{data.id}}</Item>
          <Item title="组件标题：">
            <el-input v-model="data.title" @change="update"/>
          </Item>
          <Item title="更多按钮：">
            <el-radio v-model="data.showMore" :label="true" @change="update">展示</el-radio>
            <el-radio v-model="data.showMore" :label="false" @change="update">隐藏</el-radio>
          </Item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="内容配置">
        <el-button @click="productDialog= true" v-if="data.data.length<5">添加商品集</el-button>
        <div class="joker-form collection-item" v-for="(item,index) in data.data" :key="index"> 
          <Item title="商品集ID">
            <el-tag>{{item.id}}</el-tag>
          </Item>
          <Item title="商品集标题">
            <el-input v-model="item.title" @change="update"/>
          </Item>
          <div class="tools-box">
            <span @click="deleteItem(index)" class="el-icon-delete"></span>
            <span @click="topItem(index)" v-if="index!=0" class="el-icon-arrow-up"></span>
            <span @click="bottomItem(index)" v-if="index!=data.data.length-1" class="el-icon-arrow-down"></span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="商品列表"
      top="5vh"
      class="product-dialog"
      :visible.sync="productDialog"
      width="80%">
      <Collection @collection="selectCollection"></Collection>
    </el-dialog>
  </div>
</template>

<script>
import Item from '@/components/Item';
import Collection from '@/components/Collection';
export default {
  components:{
    Item,
    Collection
  },
  props:{
    data:{
      type:Object,
      default:()=>{}
    },
  },
  data(){
    return{
      productDialog:false,
    }
  },
  methods:{
    // 回调选择的商品
    selectCollection(data){
      this.productDialog=false;
      for(let i in data){
        if(this.data.data.length<5){
          if(this.data.data.findIndex(item=>item.id==data[i].id)==-1){
            data[i].remark = '';
            this.data.data.push(data[i]);
          }
        }else{
          this.notify(`最多只能放 <i class="color-blue"> 5 </i> 个商品集`,'不好意思.','error');
          return;
        }
      }
      this.update();
    },
    update(){
      this.$emit('update',this.data);
    },
    add(){
      this.$store.dispatch('productDialog',true);
    },
    deleteItem(index){
      this.data.data.splice(index,1);
      this.update();
    },
    // 向上移动
    topItem(index){
      if(index == 0){
        return;
      }else{
        this.data.data[index] = this.data.data.splice(index-1,1,this.data.data[index])[0];
      this.update();
      }
    },
    // 向下移动
    bottomItem(index){
      if(index == this.data.data.length-1){
        return;
      }else{
        this.data.data[index] = this.data.data.splice(index+1,1,this.data.data[index])[0];
        this.update();
      }
    },
  }
}
</script>

<style lang="scss">
.joker-operation-home-tools-collection{
  .collection-list{
    margin-top: 20px;
    max-height: 70vh;
    overflow-y: scroll;
  }
  .collection-item{
    padding: 16px;
    width: 400px;
    margin-top: 10px;
    border:1px solid #eee;
    position: relative;
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