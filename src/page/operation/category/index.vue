<template>
  <div class="joker-page-operation-categroy">
    <div class="mb-20"/>
    <Container>
      <el-button @click="create">添加</el-button>
      <div class="mb-20"/>
      <div class="table-title">
        <div class="info">
          <span class="w20">ID</span>
          <span class="w25">分类名称</span>
          <span class="w25">图标</span>
          <span class="w20">绑定基础分类</span>
        </div>
        <span class="set">操作</span>
      </div>
      <el-tree 
        :indent="0"
        node-key="id"
        @node-expand="clickNode"
        :accordion="true"
        ref="categoryRef"
        :default-expanded-keys="currentExpandedKey"
        :expand-on-click-node="false"
        :data="tableList">
        <div class="h5-category-item" slot-scope="{ node, data }">
          <div :class="['h5-category-info','level-'+data.level]">
            <span class="w20">{{ data.id }}</span>
            <span class="w25">{{ data.label }}</span>
            <span class="w25 logo">
              <img src="@/assets/image/image.png" :load-img="data.imgUrl" width="30" height="30" alt="">
            </span>
            <span class="w20">{{ data.baseCategoryId }}</span>
          </div>
          <div class="h5-category-set">
            <span class="set-text icon-btn" @click="edit(data)">编辑</span>
            <span class="set-text icon-btn color-red" @click="deleteItem(data)">删除</span>
            <span class="set-text icon-btn color-green" @click="addChild(data)" v-if="data.level < 3">新增子级</span>
          </div>
        </div>
      </el-tree>
    </Container>
    <el-dialog class="media-dialog"
      :visible.sync="dialog"
      @mousedown.stop=""
      @close="close"
      :modal="false"
      top="15vh"
      width="500px">
      <div class="joker-form category-box">
        <!-- 新建下级 -->
        <Item class="w100" title="上级名称" v-if="dialogStatus == 'addChild'">
          {{parentData.label}}
        </Item>
        <Item class="w100" :title="dialogStatus == 'create'?'新增名称':'分类名称'">
          <el-input v-model="currentData.label"/>
        </Item>
        <Item class="w100" title="绑定的ID">
          <el-input v-model="currentData.baseCategoryId"/>
        </Item>
        <Item class="w100" title="图标">
          <el-input v-model="currentData.imgUrl"/>
        </Item>
        <el-button @click="submit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Container from '@/components/Container';
import Item from '@/components/Item';
import {CATEGORY} from '@/api/operation';
import SearchForm from '@/components/SearchForm';
export default {
  components:{
    Container,
    Item
  },
  data(){
    return{
      dialog:false,
      currentData:{
        id: null,
        label: "",
        parentId: 0,
        imgUrl: null,
        baseCategoryId:null
      },
      currentExpandedKey:[],
      parentData:{},
      tableList:[],
      dialogStatus:'',
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    clickNode(n){
      this.currentExpandedKey = [n.id];
    },
    close(){
      this.dialogStatus = '';
      this.parentData = {};
      this.currentData={
        id: null,
        label: "",
        parentId: 0,
        imgUrl: null,
        baseCategoryId:null
      }
    },
    // 删除
    deleteItem(item){
      this.$message.error('展示分类 暂时不能乱删');
    },
    // 编辑
    edit(item){
      this.dialog = true;
      this.dialogStatus = 'edit';
      this.currentData = {...item};
    },
    // 创建
    create(){
      this.dialog = true;
      this.dialogStatus = 'create';
    },
    // 保存
    submit(){ 
      let params = {
        id:this.currentData.id?this.currentData.id:null,
        label:this.currentData.label,
        parentId:this.currentData.parentId,
        baseCategoryId:this.currentData.baseCategoryId,
        imgUrl:this.currentData.imgUrl,
      };
      if(this.currentData.label.trim()==''){
        this.$message.error('分类名称不能为空');
        return;
      }
      this.$store.dispatch('loading',true);
      if(this.dialogStatus == 'edit'){
        CATEGORY.update(params).then(res=>{
        if(res.code == 200){
            this.$message.success(res.msg);
            this.getData();
            this.dialog = false;
          }else{
            this.$message.error(res.msg);
          }
        }).catch(err=>{
          this.$message.error(err);
        }).finally(()=>{
          this.$store.dispatch('loading',false);
        })
      }else{
        CATEGORY.add(params).then(res=>{
        if(res.code == 200){
            this.$message.success(res.msg);
            this.getData();
            this.dialog = false;
          }else{
            this.$message.error(res.msg);
          }
        }).catch(err=>{
          this.$message.error(err);
        }).finally(()=>{
          this.$store.dispatch('loading',false);
        })
      }
    },
    // 添加子集
    addChild(item){
      this.dialog = true;
      this.parentData = {...item};
      this.currentData.level = item.level+1;
      this.dialogStatus = 'addChild';
      this.currentData.parentId = item.id;
    },
    getData(){
      this.$store.dispatch('loading',true);
      CATEGORY.getTree().then(res=>{
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
    }
  }
}
</script>

<style lang="scss">
.joker-page-operation-categroy{
  .category-box{
    padding: 15px;
  }
  .el-tree-node__content{
    line-height: 40px;
    height: 40px;
  }
  .table-title{
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    border-bottom:1px solid #eee;
    .info{
      flex:1;
      justify-content: space-around;
      padding-left: 24px;
      font-weight: 600;
      font-size: 16px;
      display: flex;
      color:#333;
    }
    .set{
      width: 200px;
      font-weight: 600;
      color:#333;
      font-size: 16px;
    }
  }
  .w20{
    width: 20%;
    max-width: 20%;
    min-width: 20%;
  }
  .w25{
    width: 25%;
    max-width: 25%;
    min-width: 25%;
  }
  .level-1{
    color: #000;
  }
  .level-2{
    color: #666;
  }
  .level-3{
    color: #999;
  }
  .h5-category-item{
    width: 100%;
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    .h5-category-info{
      display: flex;
      flex:1;
      justify-content: space-around;
      .logo{
        width: 30px;
        padding:5px 0;
        height: 30px;
      }
    }
    .h5-category-set{
      width: 200px;
    }
  }
}
</style>