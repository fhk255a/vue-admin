<template>
  <div class="joker-page-role">
    <SearchForm @search="search" :config="searchConfig" :header="header"></SearchForm>
    <div class="mb-20"/>
    <Container>
      <el-button @click="add()">添加</el-button>
      <Table :tableList="tableList" :config="tableConfig">
        <template slot-scope="row" slot="createTime">
          {{$timer(row.scope.data.createTime)}}
        </template>
        <template slot-scope="row" slot="set">
          <p>
            <span class="color-blue set-text" @click="edit(row.scope.index)">编辑</span>
            <span class="color-red set-text" @click="remove(row.scope.index)">删除</span>
          </p>
          <p>
            <span class="color-green set-text" @click="menu(row.scope.index)">配置菜单</span>
            <span class="color-yellow set-text" @click="resource(row.scope.index)">配置资源</span>
          </p>
        </template>
      </Table>
      <Page @changePage="changePage" :page="page"/>
    </Container>
    <Dialog :title="dialog.edit?'编辑':'添加'" :show="dialog.dialog" @close="close">
      <div class="joker-form">
        <div class="joker-form-item w100" v-if="dialog.add">
          <div class="joker-form-item-label" style="width:100px;padding-right:20px;text-align:right">编号</div>
          <div class="joker-form-item-content">
            <el-input placeholder="请输入编号..." ref="roleIdInput" v-model="currentData.id" type="number"/>
            <span class="color-red">编号不可重复</span>
          </div>
        </div>
        <div class="joker-form-item w100">
          <div class="joker-form-item-label" style="width:100px;padding-right:20px;text-align:right">名称</div>
          <div class="joker-form-item-content">
            <el-input ref="roleNameInput" placeholder="名称..." v-model="currentData.name"/>
          </div>
        </div>
        <div class="joker-form-item w100">
          <div class="joker-form-item-label" style="width:100px;padding-right:20px;text-align:right">说明</div>
          <div class="joker-form-item-content">
            <el-input placeholder="请输入备注..." v-model="currentData.remark"/>
          </div>
        </div>
        <div class="joker-form-item w100" style="border-top: 1px solid #eee;padding-top:10px;justify-content: center;">
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
    getData(){
      this.searchConfig[0].data = [];
      const ROLES = [...this.$store.state.competence.roleList];
      for(let item in ROLES){
        this.searchConfig[0].data.push({
          label:ROLES[item].name,
          value:ROLES[item].id,
        })
      }
      this.tableList = [...ROLES];
      this.page.total = ROLES.length;
    },
    // 分页
    changePage(page){
      this.page = page;
    },
    // 搜索结果
    search(form){
      this.header = form;
    },
    // 配置菜单
    menu(index){
      this.getData();
    },
    // 配置资源
    resource(index){
      this.getData();
    },
    // 编辑
    edit(index){
      this.currentData={...this.tableList[index]};
      this.dialog={
        dialog:true,
        edit:true,
        add:false,
      };
    },
    // 删除
    remove(index){
      let res = [...this.$store.state.competence.roleList];
      const ID = res[index].name;
      this.$confirm('是否删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        res.splice(index,1);
        this.$store.dispatch('changeRoleList',res);
        this.getData();
        this.notify(`您手滑删掉了<span class="color-red"> [ ${ID} ] </span>`,'error','我的天！',' ');
      }).catch(() => {
        this.$message.info('您点了取消');          
      });
    },
    // 添加
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
    // 提交
    submit(){
      // 编辑
      if(this.dialog.edit){
        if(this.currentData.name==''){
          this.$message.error('名称不能为空');
          this.$refs['roleNameInput'].focus();
          return;
        }
        let res = [...this.$store.state.competence.roleList];
        const INDEX = res.findIndex(item=>item.id==this.currentData.id);
        res[INDEX] = this.currentData;
        this.$store.dispatch('changeRoleList',res);
        this.notify('修改成功','success','OHHH',' ');
        this.close(false);
        this.getData();
      }
      // 添加
      else{
        if(this.currentData.id==''){
          this.$message.error('编号不能为空');
          this.$refs['roleIdInput'].focus();
          return;
        }
        if(this.currentData.name==''){
          this.$message.error('名称不能为空');
          this.$refs['roleNameInput'].focus();
          return;
        }
        let res = [...this.$store.state.competence.roleList];
        const INDEX = res.findIndex(item=>item.id==this.currentData.id);
        if(INDEX!=-1){
          this.$message.error('该编号已存在');
          this.$refs['roleIdInput'].focus();
          return;
          res.push({
            ...this.currentData,
            createTime:new Date().getTime(),
            createUser:'Joker' ,// 后面改创建人
            createUserId:'10000' ,// 后面改创建人
          })
          this.close(false);
          this.$store.dispatch('changeRoleList',res);
          this.notify('保存成功','success','OHHH',' ');
          this.getData();
        }
      }
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
        id:null,
        name:'',
        resource:[],
        menu:[],
        remark:'',
        createTime:null,
        createUser:'',
        createUserId:'',
      },
      dialog:{
        dialog:false,
        edit:false,
        add:false,
      },
      searchConfig:[
        {
          label:'等级',
          key:'id',
          type:'select',
          data:[]
        }
      ],
      header:{
        id:''
      },
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

<style lang="scss">
.joker-page-role{

}
</style>