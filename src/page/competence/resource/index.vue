<template>
  <div class="joker-page-role">
    <SearchForm :config="searchConfig" :header="header"></SearchForm>
    <Container>
      <Table :tableList="tableList" :config="tableConfig"></Table>
      <Page @changePage="changePage" :page="page"/>
    </Container>
    <Dialog :show="dialog.dialog"></Dialog>
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
    getData(){
      const ROLES = this.$store.state.competence.roleList;
      for(let item in ROLES){
        this.searchConfig[0].data.push({
          label:ROLES[item].name,
          value:ROLES[item].id,
        })
      }
      this.tableList = ROLES;
      this.page.total = ROLES.length;
    }
  },
  mounted(){
    this.getData();
  },
  data(){
    return{
      dialog:{
        dialog:false,
        edit:false,
        add:false,
      },
      searchConfig:[
        {
          label:'等级',
          value:'id',
          type:'select',
          data:[]
        }
      ],
      header:{id},
      tableList:[],
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
    Table,
    Dialog
  }
}
</script>

<style>

</style>