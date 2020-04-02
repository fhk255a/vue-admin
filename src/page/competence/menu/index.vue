<template>
  <div class="joker-page-menu">
      <el-button @click="add()" v-if="isPass" >添加</el-button>
    <div class="mb-20"/>
    <Container>
      <el-table
        :data="tableList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="title" label="页面标题" />
        <el-table-column prop="path" label="页面路径" />
        <el-table-column prop="icon" label="页面图标" width="100px">
          <template slot-scope="row">
            <span :class="['iconfont',row.row.icon]"></span>
          </template>
        </el-table-column>
        <el-table-column prop="isHide" label="隐藏菜单" width="100px">
          <template slot-scope="row">
            <el-switch v-model="row.row.isHide" @change="changeStatus(row.row)"/>
          </template>
        </el-table-column>
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
    </Container>
    <Dialog :title="dialog.edit?'编辑':'添加'" :show="dialog.dialog" @close="close">
      <div class="menu-form joker-form">
        <Item title="页面父级">
          <el-cascader
            placeholder="根目录"
            :props="{children:'children',label:'title',value:'id',checkStrictly: true}"
            v-model="currentData.parentId"
            :options="tableList"
            clearable
          ></el-cascader>
        </Item>
        <Item title="页面标题">
          <el-input v-model="currentData.title" ref="menu-title"/>
        </Item>
        <Item title="页面路径">
          <el-input v-model="currentData.path" ref="menu-path"/>
        </Item>
        <Item title="页面图标">
          <el-input v-model="currentData.icon"/>
        </Item>
        <Item title="菜单隐藏">
          <el-switch v-model="currentData.isHide" />
        </Item>
        <Item >
          <el-button @click="submit">保存</el-button>
        </Item>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Container from '@/components/Container';
import Dialog from '@/components/Dialog';
import Item from '@/components/Item';
import isPass from '@/lib/esss';
import { MENU } from '@/api/user'; 
import STORE from 'store';
export default {
  mixins:[isPass],
  methods:{
    getData(){
      this.$store.dispatch('loading',true);
      MENU.list().then(res=>{
        if(res.code== 200){
          this.tableList = res.data;
          console.log(STORE.get('vue-admin-resource'))
        }else{
          this.notify(res.msg,'淦','error');
        }
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      });
    },
    // 编辑
    edit(item){
      this.currentData={...item};
      this.dialog={
        dialog:true,
        edit:true,
        add:false,
      };
    },
    // 删除
    remove(item){
      this.$confirm('是否删除该菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('loading',true);
        MENU.delete(item.id).then(res=>{
          if(res.code == 200){
            this.notify(`您手滑删掉了<span class="color-red"> [ ${item.title} ] </span>`,'我的天！','error');
            this.getData();
          }
        }).catch(err=>{

        }).finally(()=>{
          this.$store.dispatch('loading',false);
        });
      }).catch(() => {
        this.$message.info('您点了取消');          
      });
    },
    changeStatus(item){
      this.$store.dispatch('loading',true);
      MENU.changeStatus(item.id,item.isHide?1:0).then(res=>{
        if(res.code== 200){
          this.getData();
          this.notify('修改成功','提示','success');
        }else{
          this.notify(res.msg,'淦','error');
        }
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      });
    },
    // 添加
    add(){
      this.dialog={
        dialog:true,
        edit:false,
        add:true,
      };
      this.currentData={
        name:'',
        path:'',
        icon:'',
        title:'',
        isHide:false,
        parentId:''
      }
    },
    // 提交
    submit(){
      // 编辑
      if(this.currentData.title.trim()==''){
        this.$message.error('名称不能为空');
        this.$refs['menu-title'].focus();
        return;
      }
      if(this.currentData.path.trim()==''){
        this.$message.error('路径不能为空');
        this.$refs['menu-path'].focus();
        return;
      }
      let data = {
        title:this.currentData.title,
        path:this.currentData.path,
        icon:this.currentData.icon,
        isHide:this.currentData.isHide?1:0,
        parentId:this.currentData.parentId.length==0?0:this.currentData.parentId[this.currentData.parentId.length-1],
      }
      if(this.currentData.id){
        data.id = this.currentData.id;
      }
      this.$store.dispatch('loading',true);
      MENU.save(data).then(res=>{
        if(res.code == 200){
          this.notify(res.msg,'OHHH','success');
          this.close(false);
          this.getData();
        }else{
          this.notify(res.msg,'EMMMMM','error');
        }
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      });
    },
    // 关闭弹框
    close(status){
      this.dialog={
        dialog:status,
        edit:false,
        add:true,
      };
    }
  },
  mounted(){
    this.getData();
  },
  data(){
    return{
      page:{
        total:0,
        size:10,
        current:1,
      },
      currentData:{
        name:'',
        path:'',
        icon:'',
        title:'',
        isHide:false,
        parentId:''
      },
      dialog:{
        dialog:false,
        edit:false,
        add:false,
      },
      tableList:[],
    }
  },
  components:{
    Container,
    Dialog,
    Item
  }
}
</script>

<style lang="scss">
.joker-page-menu{
  .menu-form{
    .joker-form-item{
      width: 100%;
    }
  }
}
</style>