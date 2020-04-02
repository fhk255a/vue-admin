<template>
  <div class="joker-page-role">
    <el-button @click="add">添加</el-button>
    <div class="mb-20"/>
    <Card class="role-table-item" :title="item.label" v-for="item in tableList" :key="item.id">
      <div slot="right">
        <span class="iconfont icon-shezhishedingpeizhichilun" @click="edit(item)"></span>
      </div>
      <el-table
        :data="item.children"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="label" label="资源名称" />
        <el-table-column prop="value" label="资源KEY" />
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="row">
            {{$timer(row.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间">
          <template slot-scope="row">
            {{$timer(row.row.updateTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="row">
            <span class="color-blue icon-btn iconfont icon-bianjiqianbixieshuru" @click="edit(row.row)"></span>
            <span class="color-red icon-btn iconfont icon-shanchu" @click="remove(row.row)"></span>
          </template>
        </el-table-column>
      </el-table>
    </Card>
    <Dialog :show="dialog" @close="close">
      <div class="joker-form">
        <Item class="w100" title="所属父级">
          <el-cascader
            placeholder="根目录"
            :props="{children:'children',label:'label',value:'id',checkStrictly: true}"
            v-model="currentData.parentId"
            :options="tableList"
            clearable
          ></el-cascader>
        </Item>
        <Item class="w100" title="资源名称">
          <el-input v-model="currentData.label" ref="resource-label"/>
        </Item>
        <Item class="w100" title="资源KEY">
          <el-input v-model="currentData.value" ref="resource-key"/>
        </Item>
        <Item class="btns w100" >
          <el-button @click="save">保存</el-button>
        </Item>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Item from '@/components/Item';
import SearchForm from '@/components/SearchForm';
import Container from '@/components/Container';
import Table from '@/components/Table';
import Page from '@/components/Page';
import Card from '@/components/Card';
import Dialog from '@/components/Dialog';
import isPass from '@/lib/esss';
import STORE from 'store';
import {RESOURCE} from '@/api/user';
export default {
  mixins:[isPass],
  methods:{
    getData(){
      RESOURCE.list().then(res=>{
        STORE.set('vue-admin-resource',res.data);
        this.tableList = res.data;
      }).catch(err=>{

      })
    },
    close(){
      this.dialog = false;
      this.currentData={
        label:'',
        parentId:0,
        value:'',
      }
    },
    // 修改
    edit(item){
      this.dialog = true;
      this.currentData = {...item};
    },
    // 修改
    add(){
      this.dialog = true;
      this.currentData={
        label:'',
        parentId:0,
        value:'',
      }
    },
    // 保存 & 创建
    save(){
      if(this.currentData.label.trim() == ''){
        this.$message.error('资源名称不能为空');
        this.$refs['resource-label'].focus();
        return;
      }
      if(this.currentData.value.trim() == ''){
        this.$message.error('资源KEY不能为空');
        this.$refs['resource-key'].focus();
        return;
      }
      const pid = this.currentData.parentId.length>0?this.currentData.parentId[this.currentData.parentId.length-1]:0;
      let data = {
        label:this.currentData.label,
        value:this.currentData.value,
        parentId:pid,
      }
      if(this.currentData.id){
        data.id = this.currentData.id;
      }
      this.$store.dispatch('loading',true);
      RESOURCE.save(data).then(res=>{
        if(res.code == 200){
          this.notify(res.msg,'O(∩_∩)O','success');
          this.close();
          this.getData();
        }else{
          this.notify(res.msg,'EMMMMM~','error');
        }
      }).catch(err=>{

      }).finally(()=>{
        this.$store.dispatch('loading',false);
      });
    }
  },
  mounted(){
    this.getData();
  },
  data(){
    return{
      tableList:[],
      dialog:false,
      currentData:{
        label:'',
        parentId:0,
        value:'',
      }
    }
  },
  components:{
    SearchForm,
    Container,
    Page,
    Table,
    Dialog,
    Card,
    Item
  }
}
</script>

<style lang="scss">
.joker-page-role{
  .role-table-item{
    margin-bottom: 20px;
  }
}
</style>