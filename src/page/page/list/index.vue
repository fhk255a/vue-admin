<template>
  <div class="joker-page-h5-list">
    <Search-form @search="search" ref="searchForm" :config="searchConfig" :header="header"/>
    <div class="mb-20"/>
    <Container>
      <Table :config="tableConfig" :tableList="tableList">
        <template slot-scope="row" slot="set">
          <span class="icon-btn color-blue" @click="edit(row.scope)">编辑</span>
          <span class="icon-btn color-blue" @click="view(row.scope)">查看</span>
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
import Table from '@/components/Table';
import Page from '@/components/Page';
import H5 from '@/api/h5';
import PRODUCT from '@/api/product';
export default {
  mounted(){
    this.getData();
  },
  methods:{
    search(form){
      this.header = form;
      this.getData();
    },
    changePage(page){
      this.page = page;
      this.getData();
    },
    // 编辑
    edit(item){
      this.$router.push({
        path:'/h5/details/'+item.data.pid
      })
    },
    // 查看
    view(item){
      console.log(item);
    },
    // 获取列表页数据
    getData(){
      let params = {
        ...this.header,
        current:this.page.current,
        size:this.page.size
      }
      H5.list(params).then(res=>{
        if(res.code == 200){
          this.tableList = res.data.data;
          this.page.total = res.data.total;
        }
      })
    }
  },
  components:{
    SearchForm,
    Container,
    Table,
    Page
  },
  data(){
    return{
      page:{
        total:0,
        current:1,
        size:10
      },
      tableList:[],
      tableConfig:[
        {
          label:'ID',
          value:'pid',
        },
        {
          label:'页面名称',
          value:'name',
        },
        {
          label:'页面备注说明',
          value:'remark',
        },
        {
          label:'页面链接',
          value:'link',
        },
        {
          label:'发布状态',
          value:'status',
        },
        {
          label:'创建时间',
          value:'createTime',
          set:true
        },
        {
          label:'操作',
          value:'set',
          set:true
        },
      ],
      searchConfig:[
        {
          type:'input',
          label:'页面ID',
          key:'pid',
        },
        {
          type:'input',
          label:'页面名称',
          key:'name',
        },
        {
          type:'input',
          label:'备注',
          key:'remark',
        },
        {
          type:'select',
          label:'页面状态',
          key:'status'
        }
      ],
      header:{
        pid:'',
        name:'',
        status:'',
        remark:'',
      },
    }
  }
}
</script>

<style>

</style>