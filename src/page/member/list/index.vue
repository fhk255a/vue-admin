<template>
  <div class="joker-page-member">
    <Search-form @search="search" ref="searchForm" :config="searchConfig" :header="header"/>
    <div class="mb-20"/>
    <Container>
      <el-button @click="add">添加</el-button>
      <Table :config="tableConfig" :tableList="tableList">
        <template slot-scope="row" slot="set">
          <span class="icon-btn color-blue" @click="edit(row.scope.data)">编辑</span>
          <span class="icon-btn color-blue" @click="view(row.scope.data)">查看</span>
        </template>
        <template slot-scope="row" slot="status">
          <el-switch @change="changeStatus(row.scope)" v-model="row.scope.data.status"/>
        </template>
        <template slot-scope="row" slot="createTime">
          {{$timer(row.scope.data.createTime*1)}}
        </template>
      </Table>
      <Page :page="page" @changePage="changePage"></Page>
    </Container>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm';
import Container from '@/components/Container';
import Dialog from '@/components/Dialog';
import Page from '@/components/Page';
import Table from '@/components/Table';
import MEMBER from '@/api/member';
export default {
  methods:{
    // 关闭弹框
    close(){
      this.dialog = {
        dialog:false,
      }
    },
    // 搜索回调
    search(from){
      this.header = from;
      this.getData();
    },
    // 获取用户列表
    getData(){
      this.$store.dispatch('loading',true);
      MEMBER.list(this.header).then(res=>{
        if(res.code==200){
          this.tableList = res.data.data;
          this.page.total = res.data.total;
        }else{
          this.notify(res.msg,'抱歉','error');
        }
      }).catch(err=>{
        this.$message.error(err);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
    // 解冻 & 冻结用户
    changeStatus(){
      this.notify('Joker偷懒还没做出来');
    },
    // 添加会员
    add(){
      this.notify('Joker偷懒还没做出来');
    },
    // 查看
    view(){
      this.notify('Joker偷懒还没做出来');
    },
    // 编辑
    edit(){
      this.notify('Joker偷懒还没做出来');
    },
    // 分页
    changePage(page){
      this.page = page;
    }
  },
  mounted(){
    this.getData();
  },
  components:{
    SearchForm,Container,Dialog,Page,Table
  },
  data(){
    return{
      currentData:{
        id:null,
      },
      dialog:{
        dialog:false,
      },
      searchConfig:[
        {
          type:'input',
          key:'id',
          label:'用户ID'
        },
        {
          type:'input',
          key:'username',
          label:'账号'
        },
        {
          type:'input',
          key:'nickname',
          label:'昵称'
        },
        {
          type:'select',
          key:'isFirst',
          label:'是否新用户'
        },
      ],
      page:{
        total:0,
        current:1,
        size:10
      },
      header:{
        id:'',
        username:'',
        isFirst:'',
      },
      tableList:[],
      tableConfig:[
        {
          label:'ID',
          value:'id',
        },
        {
          label:'账号',
          value:'username',
        },
        {
          label:'用户昵称',
          value:'nickname',
        },
        {
          label:'新用户',
          value:'isFirst',
        },
        {
          label:'用户状态',
          value:'status',
          set:true
        },
        {
          label:'创建时间',
          value:'createTime',
          set:true
        },
        {
          label:'最后登录时间',
          value:'lastLoginTime',
          set:true
        },
        {
          label:'操作',
          value:'set',
          set:true
        },
      ]
    }
  }
}
</script>

<style>

</style>