<template>
  <div class="joker-page-user">
    <Search-form :config="searchConfig" :header="header" @search="search"></Search-form>
    <div class="mb-20"/>
    <Container>
      <el-button @click="add()" v-if="isPass('competence::user::add')" >添加</el-button>
      <Table :config="tableConfig" :tableList="tableList">
        <template slot="status" slot-scope="row">
          <el-switch v-model="row.scope.data.status" @change="changeStatus(row.scope.data.status,row.scope.index)"></el-switch>
        </template>
        <template slot="createTime" slot-scope="row">
          {{$timer(row.scope.data.createTime)}}
        </template>
        <template slot="role" slot-scope="row">
          {{roleList.find(item=>item.value==row.scope.data.role)&&roleList.find(item=>item.value==row.scope.data.role)['label']}}
        </template>
        <template slot="set" slot-scope="row">
          <span class="set-text color-blue" v-if="isPass('competence::user::edit')" @click="edit(row.scope.data)">编辑</span>
          <span class="set-text color-red" v-if="isPass('competence::user::remove')" @click="remove(row.scope.index)">删除</span>
        </template>
      </Table>
      <Page :page="page" @changePage="changePage"/>
    </Container>
    <Dialog :title="dialog.edit?'编辑用户':'添加用户'" @close="close" :show="dialog.dialog" width="600px">
      <div class="setting-user joker-form">
        <Item title="ID">
          <span v-if="dialog.edit">{{currentData.id}}</span>
          <span v-else>系统生成</span>
        </Item>
        <Item title="用户名">
          <el-input v-if="dialog.add" placeholder="请输入用户名..." ref="reg-username" v-model="currentData.username"/>
          <span v-else>{{currentData.username}}</span>
        </Item>
        <Item title="昵称">
          <el-input placeholder="请输入昵称..." v-model="currentData.nickName" />
        </Item>
        <Item title="等级">
          <el-select v-model="this.currentData.role">
            <el-option v-for="item in roleList" 
              :value="item.value+''" :key="item.value" :label="item.label"></el-option>
          </el-select>
        </Item>
        <Item title="手机">
          <el-input placeholder="请输入手机..." v-model="currentData.phone" />
        </Item>
        <Item title="邮箱">
          <el-input placeholder="请输入手机..." v-model="currentData.mail" />
        </Item>
        <Item title="QQ">
          <el-input placeholder="请输入手机..." v-model="currentData.qq" />
        </Item>
        <Item title="备注">
          <el-input placeholder="请输入手机..." v-model="currentData.remark" />
        </Item>
        <Item title="创建时间" v-if="currentData.createTime">
          {{$timer(currentData.createTime)}}
        </Item>
        <div clsas="joker-form-item" style="text-align: center;border-top: 1px solid #eee;padding-top: 10px;">
          <el-button @click="submit()">保存</el-button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm';
import Container from '@/components/Container';
import Table from '@/components/Table';
import Page from '@/components/Page';
import Item from '@/components/Item';
import Dialog from '@/components/Dialog';
import isPass from '@/lib/esss';
import USER,{ROLE} from '@/api/user';
export default {
  mixins:[isPass],
  methods:{
    changePage(page){
      this.page = page;
      this.getData();
    },
    search(form){
      this.header = form;
      this.getData();
    },
    getData(){
      // const RES = this.$store.state.competence.userList;
      // this.tableList = RES;
      // this.page.total = RES.length;
      const params = {
        current:this.page.current,
        size:this.page.size,
        ...this.header
      }
      USER.userList(params).then(res=>{
        if(res.code == 200){
          this.page.total = res.data.total;
          this.tableList = res.data.data;
        }
      }).catch(err=>{

      })
    },
    // 编辑用户
    edit(item){
      this.currentData = {...item};
      this.dialog={
        dialog:true,
        edit:true,
        add:false
      }
    },
    // 切换状态
    changeStatus(status,index){
      this.notify('你的操作被某种神秘力量销毁了','error','淦',' ');
      this.tableList[index].status = !status;
    },
    add(){
      this.currentData={
        id:null,
        username:'',
        role:'10000',
        createTime:'',
        remark:'',
        password:123456,
        mail:'',
        qq:'',
        status:true,
        phone:'',
        nickName:'',
      };
      this.dialog={
        dialog:true,
        edit:false,
        add:true
      }
    },
    // 提交
    submit(){
      if(this.currentData.id){
        const INDEX = this.tableList.findIndex(item=>this.currentData.id == item.id);
        this.tableList[INDEX] = {...this.currentData};
        this.$store.dispatch('changeUserList',this.tableList);
        this.notify(`你修改了<span class="color-red"> [ ${this.currentData.id} ] </span>`,'success','老铁',' ');
        this.dialog = {
          dialog:false,
          edit:false,
          add:false
        }
        this.getData();
      }else{
        let res = this.$store.state.competence.userList;
        if(this.currentData.username==''){
          this.$refs['reg-username'].focus();
          this.$message.error('用户名不能为空');
          return;
        }
        USER.register(this.currentData).then(res=>{
          if(res.code == 200){
            this.notify('你添加了一个新用户','success','老铁',' ');
            this.dialog = {
              dialog:false,
              edit:false,
              add:false
            }
            this.getData();
          }else{
            this.notify(res.msg,'错误提示','error');
            this.$refs['reg-username'].focus();
          }
        })
      }
    },
    // 删除用户
    remove(INDEX){
      let res = this.$store.state.competence.userList;
      const ID = res[INDEX].id;
      this.$confirm('是否删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        res.splice(INDEX,1);
        this.$store.dispatch('changeUserList',res);
        this.getData();
        this.notify(`您手滑删掉了<span class="color-red"> [ ${ID} ] </span>用户`,'error','我的天！',' ');
      }).catch(() => {
        this.$message.info('您点了取消');          
      });
    },
    // 关闭
    close(status){
      this.dialog={
        dialog:status,
        edit:false,
        add:false
      }
    }
  },
  mounted(){
    ROLE.list().then(res=>{
      this.roleList = res.data.map(item=>{
        return {
          label:item.name,
          value:item.id*1,
        }
      })
      this.searchConfig[3].data = this.roleList;
    })
    this.getData();
  },
  data(){
    return{
      // 角色列表
      roleList:[],
      // 分页
      page:{
        total:0,
        current:1,
        size:10
      },
      // 表格配置
      tableConfig:[
        {
          label:'ID',
          value:'id'
        },
        {
          label:'用户名',
          value:'username'
        },
        {
          label:'昵称',
          value:'nickName'
        },
        {
          label:'等级',
          value:'role',
          set:true,
        },
        {
          label:'状态',
          value:'status',
          set:true,
        },
        {
          label:'创建时间',
          value:'createTime',
          set:true,
        },
        {
          label:'操作',
          value:'set',
          set:true,
        },
        {
          label:'备注',
          value:'remark'
        },
      ],
      // 表格数据
      tableList:[],
      // 搜索内容
      header:{
        id:'',
        role:'',
        nickName:'',
        username:''
      },
      // 搜索配置
      searchConfig:[
        {
          label:'用户ID',
          key:'id',
          type:'input'
        },
        {
          label:'用户名',
          key:'username',
          type:'input'
        },
        {
          label:'昵称',
          key:'nickName',
          type:'input'
        },
        {
          label:'等级',
          key:'role',
          type:'select',
          data:[]
        },
      ],
      // 当前信息
      currentData:{
        id:null,
        username:'',
        role:1000,
        createTime:'',
        remark:'',
        password:123456,
        mail:'',
        qq:'',
        status:true,
        phone:'',
        nickName:'',
      },
      // 弹框
      dialog:{
        dialog:false,
        edit:false,
        add:false,
      }
    }
  },
  components:{
    SearchForm,
    Container,
    Page,
    Table,
    Item,
    Dialog
  }
}
</script>

<style lang="scss">
.joker-page-user{
  .footer-btns{
    text-align: center;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
  .setting-user{
    .joker-form-item{
      width: 100%;
      .joker-form-item-label{
        width: 100px;
        text-align: right;
        padding-right: 30px;
      }
    }
  }
}
</style>