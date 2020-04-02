<template>
  <div class="joker-page-key">
    <Container title="SELECT">
      <el-button>添加</el-button>
      <div class="mb-20"/>
      <div class="joker-form">
        <el-tag type='info' class="tag-item"
          @click="viewItem(item,index)"
          :effect="currentIndex==index?'dark':'plain'"
          v-for="(item,index) in tableList" :key="item.id">{{item.name}}</el-tag>
      </div>
    </Container>
    <div class="mb-20"/>
    <Container title="OPTIONS" class="container">
      <div :title="currentData.item.name" class="right" v-show="currentData.item.id">
        <div class="joker-form key-form">
          <Item title="KEY">{{currentData.item.key}}</Item>
          <Item title="类型名称">{{currentData.item.name}}</Item>
          <Item title="状态">
            <el-switch disabled v-model="currentData.item.status"/>
          </Item>
          <Item title="备注说明">{{currentData.item.node}}</Item>
          <Item title="创建事件">{{currentData.item.createTime}}</Item>
          <Item className="w100">
            <span class="icon-btn el-icon-edit-outline"></span>
          </Item>
          <ul class="key-table">
            <li class="title-menu key-table-item">
              <span class="title">名称</span>
              <span class="value">value</span>
              <span class="node">说明</span>
              <span class="status">状态</span>
              <span class="sort">排序</span>
              <span class="set">操作</span>
            </li>
            <li class="key-table-item" 
              v-for="(item,index) in currentData.children" :key="index">
              <span class="title">
                <el-input v-model="item.name"/>
              </span>
              <span class="value">
                <el-input v-model="item.value"/>
              </span>
              <span class="node">
                <el-input v-model="item.node"/>
              </span>
              <span class="sort">
                <el-input type="number" v-model="item.sort"/>
              </span>
              <span class="status">
                <el-switch v-model="item.status"/>
              </span>
              <span class="set">
                <i class=" color-red set-text">删除</i>
              </span>
            </li>
          </ul>
        </div>
      </div> 
      <div class="no-data" v-show="!currentData.item.id">内容不存在</div>
    </Container>
    <div class="mb-20"/>
  </div>
</template>

<script>
import Container from '@/components/Container';
import Card from '@/components/Card';
import Item from '@/components/Item';
import {KEY} from '@/api/config';
import SearchForm from '@/components/SearchForm';
export default {
  components:{
    Container,
    SearchForm,
    Card,
    Item
  },
  mounted(){
    this.getData();
  },
  methods:{
    search(form){
      this.header = form;
      this.getData();
    },
    getData(){
      this.$store.dispatch('loading',true);
      KEY.list(this.header).then(res=>{
        if(res.code==200){
          this.tableList = res.data;
        }else{
          this.notify(res.msg,'抱歉','error');
        }
      }).catch(err=>{
        this.$message.error(err);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
    // 查看下线
    viewItem(item,index){
      this.currentIndex = index;
      this.currentData.item = {...item};
      this.$store.dispatch('loading',true);
      KEY.getItem(item.id).then(res=>{
        if(res.code==200){
          this.currentData.children = res.data;
        }else{
          this.notify(res.msg,'抱歉','error');
        }
      }).catch(err=>{
        this.$message.error(err);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
  },
  data(){
    return{
      tableList:[],
      currentIndex:null, // 选择的值
      currentData:{
        item:{},
        children:[],
      }
    }
  }
}
</script>

<style lang="scss">
.joker-page-key{
  .tag-item{
    cursor: pointer;
    margin-right: 10px;
  }
  .container{
    display: flex;
    >.left{
      width: 300px;
      margin-right: 10px;
      background: #fff;
      ul{
        color: #666;
        .left-li{
          padding: 10px 0;
          font-size: 16px;
          border-bottom: 1px solid #eee;
          box-sizing: border-box;
          cursor: pointer;
          &:last-child{
            border:none;
          }
          &:hover{
            color:#409EFF;
          }
          >.el-icon-view{
            float: right;
          }
        }
        .active{
          color:#409EFF;
        }
      }
    }
    >.right{
      flex:1;
      .key-form{
        .joker-form-item{
          min-width: 200px;
        }
      }
      .key-table{
        width: 100%;
        margin-top: 10px;
        border-top:1px solid #ddd;
        min-width: 600px;
        overflow-y: hidden;
        overflow-x: auto;
        .title-menu{
          font-weight: 600;
          background: #eee;
          padding: 10px;
        }
        .title{width: 30%;}
        .value{width: 15%;}
        .node{width: 20%;}
        .status{width: 10%;}
        .sort{width: 10%;}
        .set{width: 15%}
        .key-table-item{
          width: 100%;
          display: flex;
          margin: 10px 0;
          align-items: center;
          >span{
            margin:0 10px;
          }
        }
      }
    }
  }
}
</style>