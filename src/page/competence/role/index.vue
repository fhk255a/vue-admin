<template>
  <div class="joker-page-role">
    <SearchForm @search="search" :config="searchConfig" :header="header"></SearchForm>
    <div class="mb-20"/>
    <Container>
      <el-button @click="add()" v-if="isPass('competence::role::add')">添加</el-button>
      <Table :tableList="tableList" :config="tableConfig">
        <template slot-scope="row" slot="createTime">
          {{$timer(row.scope.data.createTime)}}
        </template>
        <template slot-scope="row" slot="set">
          <p>
            <span class="color-blue set-text" v-if="isPass('competence::role::edit')" @click="edit(row.scope.data)">编辑</span>
            <span class="color-red set-text" v-if="isPass('competence::role::remove')" @click="remove(row.scope.data)">删除</span>
          </p>
          <p>
            <span class="color-green set-text" v-if="isPass('competence::role::menu')" @click="menu(row.scope.data)">配置菜单</span>
            <span class="color-yellow set-text" v-if="isPass('competence::role::resource')" @click="resource(row.scope.data)">配置资源</span>
          </p>
        </template>
      </Table>
      <Page @changePage="changePage" :page="page"/>
    </Container>
    <Dialog :title="dialog.edit?'编辑':'添加'" :show="dialog.dialog" @close="close">
      <div class="joker-form">
        <Item title="名称" className="w100" width="100px">
          <el-input ref="roleNameInput" placeholder="名称..." v-model="currentData.name"/>
          <span style="display: block;text-align: left;" class="color-red">编号不可重复</span>
        </Item>
        <Item title="说明" className="w100" width="100px">
          <el-input placeholder="请输入备注..." v-model="currentData.remark"/>
        </Item>
        <Item className="w100" style="border-top: 1px solid #eee;padding-top:20px;margin-top:20px;justify-content: center;">
          <el-button @click="submit()">保存</el-button>
        </Item>
      </div>
    </Dialog>
    <Dialog :title="setting.menu?'设置菜单':'设置资源'" 
      width="800px"
      :show="setting.dialog" @close="settingClose">
      <template v-if="setting.menu">
        <div class="role-menu">
          <el-tree
            ref="menu-tree"
            :data="MENULIST"
            node-key="id"
            :default-checked-keys="defaultMenu"
            default-expand-all
            :check-change="changeMenu"
            show-checkbox
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.title }}</span>
            </span>
          </el-tree>
        </div>
        <div class="btns">
          <el-button @click="submitMenu()">提交</el-button>
        </div>
      </template>
      <template v-if="setting.resource">
        <div class="resource-container">
          <el-tree
            ref="resource-tree"
            :data="SOURCELIST"
            node-key="id"
            :default-checked-keys="defaultSouce"
            default-expand-all
            show-checkbox
            :expand-on-click-node="false">
            <span class="custom-tree-node" style="min-width: 150px; max-width:150px" slot-scope="{ node, data }">
              <span v-if="data.children && data.children.length>0">{{data.label}}</span>
              <span v-else>
                <i class="color-red"> 按钮 - </i>{{data.label}}
              </span>
            </span>
          </el-tree>
        </div>
        <div style="border-top:1px solid #eee;padding-top:10px;">
          <el-button @click="saveResource()">保存</el-button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm';
import Container from '@/components/Container';
import Table from '@/components/Table';
import Item from '@/components/Item';
import Page from '@/components/Page';
import Dialog from '@/components/Dialog';
import isPass from '@/lib/esss';
import {ROLE,RESOURCE,MENU} from '@/api/user';
export default {
  mixins:[isPass],
  methods:{
    // 获取数据
    getData(){
      const params = {
        current:this.page.current,
        size:this.page.size,
        ...this.header,
      }
      ROLE.list(params).then(res=>{
        if(res.code == 200){
          this.tableList = res.data.data;
          this.page.total = res.data.total;
        }
      })
    },
    // 分页
    changePage(page){
      this.page = page;
      this.getData();
    },
    // 搜索结果
    search(form){
      this.header = form;
      this.getData();
    },
    // 编辑事件
    edit(item){
      this.currentData={...item};
      this.dialog={
        dialog:true,
        edit:true,
        add:false,
      };
    },
    // 删除事件
    remove(item){
      this.$confirm('是否删除该角色?删除后该角色下的所有用户都会变为普通用户哦', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ROLE.delete(item.id).then(res=>{
          if(res.code == 200){
            this.notify(`您手滑删掉了<span class="color-red"> [ ${item.name} ] </span>`,'EMMMMM~~~~~','warning');
            this.getData();
          }else{
            this.notify(res.msg);
          }
        })
      }).catch(() => {
        this.$message.info('您点了取消');          
      });
    },
    // 添加事件
    add(){
      this.currentData={
        id:null,
        name:'',
        resource:[],
        menu:[],
        remark:'',
        createTime:null,
        createUser:'',
        createUserId:'',
      };
      this.dialog={
        dialog:true,
        edit:false,
        add:true,
      };
    },
    // 提交编辑与添加操作
    submit(){
      const data = {
        name:this.currentData.name,
        remark:this.currentData.remark
      }
      if(data.name==''){
        this.$message.error('名称不能为空');
        this.$refs['roleNameInput'].focus();
        return;
      }
      // 编辑
      if(this.dialog.edit){
        data.id = this.currentData.id;
        ROLE.update(data).then(res=>{
          if(res.code == 200){
            this.notify('修改成功','OHHH!!!','success');
            this.getData();
            this.close(false);
          }else{
            this.notify(res.msg,'EMMMMM~','error');
          }
        })
      }
      // 添加
      else{
        ROLE.create(data).then(res=>{
          if(res.code == 200){
            this.notify('添加成功','OHHH!!!','success');
            this.getData();
            this.close(false);
          }else{
            if(res.code == 202){
              this.$refs['roleNameInput'].focus();
              this.notify('该名称已存在','EMMMMM~','error');
            }else{
              this.notify(res.msg,'EMMMMM~','error');
            }
          }
        })
      }
    },
    // 关闭弹框
    close(status){
      this.dialog={
        dialog:status,
        edit:false,
        add:true,
      };
    },
    // 关闭配置的弹框
    settingClose(status){
      this.setting={
        dialog:status,
        menu:false,
        resource:false
      };
    },
    // 保存菜单
    submitMenu(index){
      const menu = this.$refs['menu-tree'].getCheckedKeys();
      const MENU = menu.concat(this.$refs['menu-tree'].getHalfCheckedKeys());
      ROLE.setMenu(this.currentData.id,MENU.join(',')).then(res=>{
        if(res.code == 200){
          this.notify(res.msg,'OH','success');
          this.setting={
            dialog:false,
            resource:false,
            menu:false,
          }
          this.getData();
        }else{
          this.notify(res.msg,'EMMMMMM~','error');
        }
      }).catch(err=>{

      })
    },
    // 配置菜单事件
    menu(item){
      this.setting={
        dialog:true,
        menu:true,
        resource:false
      }
      this.currentData = {...item};
      const KEYS = this.currentData.menu;
      this.$nextTick(()=>{
        this.$refs['menu-tree'].setCheckedKeys(KEYS);
        this.defaultMenu = KEYS;
      })
    },
    saveResource(){
      const resource = this.$refs['resource-tree'].getCheckedKeys();
      const RESOURCE = resource.concat(this.$refs['resource-tree'].getHalfCheckedKeys());
      ROLE.setResource(this.currentData.id,RESOURCE.join(',')).then(res=>{
        if(res.code == 200){
          this.notify(res.msg,'OH','success');
          this.setting={
            dialog:false,
            resource:false,
            menu:false,
          }
          this.getData();
        }else{
          this.notify(res.msg,'EMMMMMM~','error');
        }
      }).catch(err=>{
        
      })
    },
    // 配置资源事件
    resource(item){
      this.setting={
        dialog:true,
        menu:false,
        resource:true
      }
      this.currentData = {...item};
      const KEYS = this.currentData.resource;
      this.$nextTick(()=>{
        this.$refs['resource-tree'].setCheckedKeys(KEYS);
        this.defaultSouce = KEYS;
      })
    },
    // 更改菜单
    changeMenu(d,n,t){
      console.log(d,n,t)
    }
  },
  mounted(){
    this.getData();
    RESOURCE.list().then(res=>{
      if(res.code == 200){
        this.SOURCELIST = res.data;
      }
    })
    MENU.list().then(res=>{
      if(res.code == 200){
        this.MENULIST = res.data;
      }
    })
  },
  data(){
    return{
      defaultSouce:[],
      SOURCELIST:[],// 资源列表
      MENULIST:[],// 菜单列表
      // 分页
      page:{
        total:0,
        size:10,
        current:1,
      },
      // 当前操作的内容
      currentData:{
        id:null,
        name:'',
        resource:[],
        menu:[],
        remark:'',
        createTime:null,
        createUser:'',
        createUserId:'',
      },
      // 分配菜单与资源弹框状态
      setting:{
        dialog:false,
        menu:true,
        resource:true
      },
      // 编辑添加弹框状态
      dialog:{
        dialog:false,
        edit:false,
        add:false,
      },
      // 搜索配置
      searchConfig:[
        {
          label:'名称',
          key:'name',
          type:'input',
          data:[]
        }
      ],
      // 搜索内容
      header:{
        name:''
      },
      // 默认打开
      defaultMenu:[],
      // 表格数据
      tableList:[],
      // 表格配置
      tableConfig:[
        {
          label:'编号',
          value:'id',
        },
        {
          label:'名称',
          value:'name',
        },
        {
          label:'说明',
          value:'remark'
        },
        {
          label:'创建人',
          value:'createUser',
        },
        {
          label:'创建时间',
          value:'createTime',
          set:true
        },
        {
          label:'操作',
          value:'set',
          set:true,
        },
      ]
    }
  },
  components:{
    SearchForm,
    Container,
    Page,
    Item,
    Table,
    Dialog
  }
}
</script>

<style lang="scss">
.joker-page-role{
  .role-menu{
    max-height: 600px;
    overflow-y: scroll;
  }
  .btns{
    border-top:1px solid #eee;
    padding-top:10px;
    text-align: center;
  }
  .source-title{
    font-weight: 600;
    color: #333;
    font-size: 16px;
    border-bottom:1px solid #eee;    
    padding: 10px 20px;
    background: aliceblue;
  }
  .source-sub-title{
    display: flex;
    font-weight: 600;
    font-size: 15px;
    padding: 8px 0;
    color:#666;
  }
  .source-content{
    color: #999;
    display: flex;
    line-height: 30px;
    .el-checkbox{
      font-size: 13px;
      .el-checkbox__inner{
        height: 13px;
      }
      .el-checkbox__label{
        font-size: 13px;  
      }
    }
  }
  .resource-list{
    padding-bottom: 10px;
    margin-bottom: 16px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  .resource-container{
    max-height: 60vh;
    padding-right: 20px;
    overflow-y: scroll;
  }
  .el-tree-node{
    float: left;
  }
  .el-tree>.el-tree-node{
    width: 100%;
    border: 1px solid #eee;
    margin-bottom: 16px;
    overflow: hidden;
    border-radius: 6px;
    >.el-tree-node__content{
      padding: 20px 10px;
      border-bottom:1px solid #eee;
      background: #eee;
    }
    >.el-tree-node__children>.el-tree-node{
      width: 100%;
    }
  }
  .el-tree-node__content{
    height: 30px;
    line-height: 30px;
  }
}
</style>