<template>
  <div class="joker-page-menu">
      <el-button @click="add()" v-if="isPass" >添加</el-button>
    <div class="mb-20"/>
    <Container>
      <el-tree
        :data="tableList"
        node-key="path"
        default-expand-all
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.meta.title }}</span>
        </span>
      </el-tree>
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
        <div class="joker-form-item w100" style="border-top: 1px solid #eee;padding-top:10px;justify-content: center;">
          <el-button @click="submit()">保存</el-button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Container from '@/components/Container';
import Dialog from '@/components/Dialog';
import isPass from '@/lib/esss';
export default {
  mixins:[isPass],
  methods:{
    getData(){
      const MENU = [...this.$store.state.competence.menuList];
      this.tableList = [...MENU];
      this.page.total = MENU.length;
    },
    // 编辑
    edit(index){
      this.notify('你的操作被某种神秘力量销毁了','error','淦',' ');
      return;
      this.currentData={...this.tableList[index]};
      this.dialog={
        dialog:true,
        edit:true,
        add:false,
      };
    },
    // 删除
    remove(index){
      this.notify('你的操作被某种神秘力量销毁了','error','淦',' ');
      return;
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
      this.notify('你的操作被某种神秘力量销毁了','error','淦',' ');
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
      tableList:[],
    }
  },
  components:{
    Container,
    Dialog
  }
}
</script>

<style lang="scss">
.joker-page-menu{
  .el-tree{
    .el-tree-node__content{
      height: 36px;
      line-height: 36px;
      border-bottom:1px solid #eee;
    }
  }
}
</style>