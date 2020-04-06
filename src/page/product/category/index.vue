<template>
  <div class="joker-components-category">
    <Container class="left" title="CATEGORY" style="width:500px;">
      <el-button @click="create">创建</el-button>
      <div class="mb-20"/>
      <el-tree
        class="trees"
        :data="treeData"
        @node-click="clickNode"
        node-key="id">
        <ul class="custom-tree-node" slot-scope="{ node, data }">
          <!-- <li>{{ node.id }}</li> -->
          <li>{{ node.label }}</li>
          <li style="float:right;font-size:14px;">
            <span
              class="color-blue set-text"
              @click="edit(data)">
              编辑
            </span>
            <span
              class="color-green set-text"
              @click="add(data)">
              添加下级
            </span>
          </li>
        </ul>
      </el-tree>
    </Container>
    <Card class="right" :title="currentData.label">
      <div class="joker-form">
        <Item className="w100" title="ID">
          <span>{{currentData.id?currentData.id:'系统生成'}}</span>
        </Item>
        <Item className="w100" title="名称">
          <el-input v-model="currentData.label"/>
        </Item>
        <Item className="w100" title="上级ID">
          <span>{{currentData.parentId}}</span>
        </Item>
      </div>
    </Card>
  </div>
</template>

<script>
import { CATEGORY } from '@/api/product';
import Container from '@/components/Container'
import Card from '@/components/Card'
import Item from '@/components/Item'
export default {
  components:{
    Container,
    Card,
    Item
  },
  data(){
    return{
      treeData:[],
      currentData:{
        label:'',
        parentId:'',
        id:null
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(){
      CATEGORY.tree().then(res=>{
        if(res.code == 200){
          this.treeData = res.data;
          this.$store.dispatch('changeCategory',res.data);
        }
      })
    },
    create(){
      this.currentData = {
        label:'',
        parentId:'',
        id:null
      }
    },
    clickNode(node,data,key){
      this.currentData = {...node}
    }
  },
}
</script>

<style lang="scss">
.joker-components-category{
  display: flex;
  .left{
    width:400px;
    min-width:400px;
    margin-right: 20px;
  }
  .el-tree-node{
    width: 100%;
    .custom-tree-node{
      width: 100%;
      overflow: hidden;
      >li{
        float: left;
      }
    }
    .el-tree-node__content{
      height: 40px;
    }
  }
}
</style>
