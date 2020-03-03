<template>
  <div class="joker-page-user">
    <Search-form :config="searchConfig" :header="header"></Search-form>
    <div class="mb-20"/>
    <Container>
      <el-button @click="add()">添加</el-button>
      <Table :config="tableConfig" :tableList="tableList">
        <template slot="status" slot-scope="row">
          <el-switch v-model="row.scope.data.status" @change="changeStatus(row.scope.data.status,row.scope.index)"></el-switch>
        </template>
        <template slot="createTime" slot-scope="row">
          {{$timer(row.scope.data.createTime)}}
        </template>
        <template slot="role" slot-scope="row">
          {{$store.state.competence.roleList.find(item=>item.id==row.scope.data.role)['name']}}
        </template>
        <template slot="set" slot-scope="row">
          <span class="set-text color-blue" @click="edit(row.scope.data)">编辑</span>
          <span class="set-text color-red" @click="remove(row.scope.index)">删除</span>
        </template>
      </Table>
      <Page :page="page" @changePage="changePage"/>
    </Container>
    <Dialog :title="dialog.edit?'编辑用户':'添加用户'" @close="close" :show="dialog.dialog" width="600px">
      <div class="setting-user joker-form">
        <div class="joker-form-item">
          <div class="joker-form-item-label">ID</div>
          <div class="joker-form-item-content">
            <span v-if="dialog.edit">{{currentData.id}}</span>
            <span v-else>系统生成</span>
          </div>
        </div>
        <div class="joker-form-item">
          <div class="joker-form-item-label">用户名</div>
          <div class="joker-form-item-content">
            <el-input v-if="dialog.add" placeholder="请输入用户名..." ref="reg-username" v-model="currentData.username"/>
            <span v-else>{{currentData.username}}</span>
          </div>
        </div>
        <div class="joker-form-item">
          <div class="joker-form-item-label">昵称</div>
          <div class="joker-form-item-content">
            <el-input placeholder="请输入昵称..." v-model="currentData.nickName" />
          </div>
        </div>
        <div class="joker-form-item">
          <div class="joker-form-item-label">等级</div>
          <div class="joker-form-item-content">
            <el-select v-model="this.currentData.role">
              <el-option v-for="item in $store.state.competence.roleList" 
                :value="item.id" :key="item.id" :label="item.name"></el-option>
            </el-select>
          </div>
        </div>
        <div class="joker-form-item">
          <div class="joker-form-item-label">手机</div>
          <div class="joker-form-item-content">
            <el-input placeholder="请输入手机..." v-model="currentData.phone" />
          </div>
        </div>
        <div class="joker-form-item">
          <div class="joker-form-item-label">邮箱</div>
          <div class="joker-form-item-content">
            <el-input placeholder="请输入邮箱..." v-model="currentData.mail" />
          </div>
        </div>
        <div class="joker-form-item">
          <div class="joker-form-item-label">QQ</div>
          <div class="joker-form-item-content">
            <el-input placeholder="请输入qq..." v-model="currentData.qq" />
          </div>
        </div>
        <div class="joker-form-item">
          <div class="joker-form-item-label">备注</div>
          <div class="joker-form-item-content">
            <el-input placeholder="请输入备注..." v-model="currentData.remark" />
          </div>
        </div>
        <div class="joker-form-item" v-if="currentData.createTime">
          <div class="joker-form-item-label">创建时间</div>
          <div class="joker-form-item-content">{{$timer(currentData.createTime)}}</div>
        </div>
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
import Dialog from '@/components/Dialog';
export default {
  methods:{
    changePage(page){
      this.page = page;
    },
    getData(){
      const RES = this.$store.state.competence.userList;
      this.tableList = RES;
      this.page.total = RES.length;
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
      this.notify('你的操作被某种神秘力量销毁了','error','OHHHHHHH',' ');
      this.tableList[index].status = !status;
    },
    add(){
      this.currentData={
        id:null,
        username:'',
        role:1,
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
        const INDEX = res.findIndex(item=>item.username == this.currentData.username);
        if(INDEX!=-1){
          this.$refs['reg-username'].focus();
          this.$message.error('用户名已经存在');
          return;
        }
        res.push({
          id:res[res.length-1].id*1+1,
          username:this.currentData.username,
          nickName:this.currentData.nickName,
          role:this.currentData.role,
          qq:this.currentData.qq,
          createTime:new Date().getTime(),
          status:true,
          phone:this.currentData.phone,
          password:123456,
          remark:this.currentData.remark,
        })
        this.$store.dispatch('changeUserList',res);
        this.notify('你添加了一个新用户','success','老铁',' ');
        this.dialog = {
          dialog:false,
          edit:false,
          add:false
        }
        this.getData();
      }
    },
    // 删除用户
    remove(INDEX){
      let res = this.$store.state.competence.userList;
      const ID = res[INDEX].id;
      this.$confirm('是否删除该店铺?', '提示', {
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
    const ROLES = this.$store.state.competence.roleList;
    for(let item in ROLES){
      this.searchConfig[3].data.push({
        label:ROLES[item].name,
        value:ROLES[item].id,
      })
    }
    this.getData();
  },
  data(){
    return{
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
          value:'id',
          type:'input'
        },
        {
          label:'用户名',
          value:'username',
          type:'input'
        },
        {
          label:'昵称',
          value:'nickname',
          type:'input'
        },
        {
          label:'等级',
          value:'role',
          type:'select',
          data:[]
        },
      ],
      // 当前信息
      currentData:{
        id:null,
        username:'',
        role:1,
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