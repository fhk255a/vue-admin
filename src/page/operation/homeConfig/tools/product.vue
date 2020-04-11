<template>
  <div class="joker-operation-home-tools-product-list">
    <el-tabs type="border-card">
      <el-tab-pane label="基本配置">
        <div class="joker-form">
          <Item title="当前组件ID：">{{data.id}}</Item>
          <Item title="组件标题：">
            <el-input v-model="data.title" @change="update"/>
          </Item>
          <Item title="更多按钮：">
            <el-radio v-model="data.showMore" :label="true" @change="update">显示</el-radio>
            <el-radio v-model="data.showMore" :label="false" @change="update">隐藏</el-radio>
          </Item>
          <Item title="商品布局：">
            <el-radio v-model="data.itemType" label="2" @change="update">一行两个</el-radio>
            <el-radio v-model="data.itemType" label="3" @change="update">一行三个</el-radio>
          </Item>
          <Item title="商品价格：">
            <el-radio v-model="data.showPrice" :label="true" @change="update">显示</el-radio>
            <el-radio v-model="data.showPrice" :label="false" @change="update">隐藏</el-radio>
          </Item>
          <Item title="商品标题：">
            <el-radio v-model="data.showTitle" :label="true" @change="update">显示</el-radio>
            <el-radio v-model="data.showTitle" :label="false" @change="update">隐藏</el-radio>
          </Item>
          <Item title="商品备注：">
            <el-radio v-model="data.showRemark" :label="true" @change="update">显示</el-radio>
            <el-radio v-model="data.showRemark" :label="false" @change="update">隐藏</el-radio>
          </Item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="内容配置">
        <el-button @click="productDialog=true">添加商品</el-button>
        <div class="joker-form product-list" v-for="(item,index) in data.data" :key="item.id">
          <Item title="商品标题">
            <el-input v-model="item.title"/>
          </Item>
          <Item title="商品图片">
            <div class="product-image">
              <img src="@/assets/image/image.png" v-load-img="item.mainImage" class="img" alt="">
            </div>
          </Item>
          <Item title="商品备注">
            <el-input v-model="item.remark"/>
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
      <Product @product="selectProduct"></Product>
    </el-dialog>
  </div>
</template>

<script>
import Item from '@/components/Item';
import Product from '@/components/Product';
export default {
  components:{
    Item,
    Product
  },
  data(){
    return{
      productDialog:false
    }
  },
  props:{
    data:{
      type:Object,
      default:()=>{}
    },
  },
  methods:{
    // 回调选择的商品
    selectProduct(data){
      this.productDialog=false;
      this.data.data = this.data.data.concat(data);
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
.joker-operation-home-tools-product-list{
  .product-list{
    .product-image{
      width: 60px;
      height: 60px;
    }
  }
}
</style>