<template>
  <div class="joker-layout">
    <div class="joker-layout-sidebar">
      <Menu/>
    </div>
    <div :class="[$store.state.func.collapse?'header-collapse':'','joker-layout-container']">
      <div class="joker-layout-header">
        <!-- 菜单缩放开关 -->
        <div class="joker-layout-header-item collapse-btn iconfont icon-biaodan2" @click="toggleCollapse"></div>
        <!-- 面包屑 -->
        <Breadcrumb class="joker-layout-header-item"/>
        <!-- 用户信息 -->
        <div class="joker-userinfo">
          <el-dropdown trigger="click" @command="changeDownMenu">
            <span class="el-dropdown-link">
              <span class="iconfont icon-gerenyonghutouxiang2"></span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <template v-if="userInfo && userInfo.token">
                <el-dropdown-item command="info"> 
                  <i class="iconfont icon-houtaiguanli"></i>{{userInfo.userInfo.nickName}}
                </el-dropdown-item>
                <el-dropdown-item command="role">
                  <i class="iconfont icon-kehudongcha"></i>查看等级
                </el-dropdown-item>
                <el-dropdown-item disabled command="edit">
                  <i class="iconfont icon-quanxianmiyao"></i>修改密码
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <i class="iconfont icon-dengchutuichuguanbi"></i>退出登录
                </el-dropdown-item>
              </template>
              <template v-else>
                <el-dropdown-item command="login"> 
                  <i class="iconfont icon-houtaiguanli"></i>请登录
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="joker-layout-main">
        <router-view/>
      </div>
    </div>
    <el-dialog
      class="j-big-img-show"
      :visible.sync="$store.state.dialog.bigImg.dialog"
      width="400px">
      <div style="width:100%;height:100%">
        <img class="img" :src="$store.state.dialog.bigImg.img" alt="">
      </div>
    </el-dialog>
    <Dialog @close="close" :title="dialog.title" :show="dialog.dialog">
      <template v-if="dialog.info">
        <ul class="joker-form userinfo">
          <li class="joker-form-item w100" >
            <div class="joker-form-item-label">昵称:</div>
            <div class="joker-form-item-content">{{userInfo.userInfo.nickName}}</div>
          </li>
          <li class="joker-form-item w100" >
            <div class="joker-form-item-label">等级:</div>
            <div class="joker-form-item-content">
              <span class="color-blue">{{userInfo.userInfo.role}}</span>
            </div>
          </li>
          <li class="joker-form-item w100" >
            <div class="joker-form-item-label">手机:</div>
            <div class="joker-form-item-content">{{userInfo.userInfo.phone}}</div>
          </li>
          <li class="joker-form-item w100" >
            <div class="joker-form-item-label">QQ:</div>
            <div class="joker-form-item-content">{{userInfo.userInfo.qq}}</div>
          </li>
          <li class="joker-form-item w100" >
            <div class="joker-form-item-label">邮箱:</div>
            <div class="joker-form-item-content">{{userInfo.userInfo.mail}}</div>
          </li>
          <li class="joker-form-item w100" >
            <div class="joker-form-item-label">备注:</div>
            <div class="joker-form-item-content">{{userInfo.userInfo.remark}}</div>
          </li>
        </ul>
      </template>
      <template v-if="dialog.role">
        <div class="role-tree">
          <el-tree
            ref="resource-tree"
            :data="SOURCELIST"
            node-key="value"
            :default-checked-keys="defaultSouce"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" style="min-width: 150px; max-width:150px" slot-scope="{ node, data }">
              <span v-if="data.children && data.children.length>0">{{data.label}}</span>
              <span v-else>
                <span class="color-red">
                  <span class="color-green" v-if="roleInfo && roleInfo.resource.findIndex(item=>item==data.value)!=-1">
                    {{data.label}} <i class=" iconfont icon-queren2"></i>
                  </span>
                  <span v-else class="color-red">
                    {{data.label}} <i class="iconfont icon-shanchu1"></i>
                  </span>
                </span>
              </span>
            </span>
          </el-tree>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumbs';
import Menu from './Mennu';
import Cookie from '@/lib/cookie';
import Dialog from '@/components/Dialog';
export default {
  data(){
    return{
      dialog:{
        dialog:false,
        role:false,
        info:false,
        title:null,
      },
      defaultSouce:[], // 默认展开
      SOURCELIST:this.$store.state.competence.resource, // 全部资源
    }
  },
  components:{
    Breadcrumb,
    Menu,
    Dialog,
  },
  mounted(){
    console.log(this.userInfo);
  },
  methods:{
    close(){
      this.dialog={
        dialog:false,
        role:false,
        info:false,
        title:null,
      }
    },
    // 切换菜单的状态
    toggleCollapse(){
      this.$store.dispatch('changeCollapse',!this.$store.state.func.collapse);
    },
    // 切换下拉
    changeDownMenu(type){
      switch(type){
        case 'info':
          this.dialog.dialog=true;
          this.dialog.info=true;
          this.dialog.role=false;
          this.dialog.title='个人信息';
          break;
        case 'role':
          this.role();
          break;
        case 'logout':
          this.logout();
          break;
        case 'login':
          this.$router.push('/login');
          break;
        default:
          this.notify('你的操作被Joker取消了','warning','OH!',' ');
          break;
      }
    },
    role(){
      this.dialog={
        dialog:true,
        info:false,
        role:true,
        title:'等级权限'
      }
      const KEYS = this.roleInfo.resource;
      this.$nextTick(()=>{
        this.$refs['resource-tree'].setCheckedKeys(KEYS);
        this.defaultSouce = KEYS;
      })
    },
    // 退出
    logout(){
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Cookie.set('vue-admin-token',null);
        Cookie.set('vue-admin-userInfo',null);
        Cookie.set('vue-admin-menu',null);
        Cookie.set('vue-admin-resource',null);
        this.$store.dispatch('changeToken',null);
        this.$store.dispatch('changeUserInfo',null);
        this.$store.dispatch('changeUserMenu',null);
        this.$store.dispatch('changeUserResource',null);
        window.location.reload();
      }).catch(() => {
        this.$message.info('您点了取消');          
      });
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo;
    },
  }
}
</script>

<style lang="scss">
.joker-layout{
    width: 100%;
    height: 100%;
  .joker-layout-sidebar {
    max-height: 100vh;
    overflow: hidden;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    bottom: 0;
    transition: width .28s;
  }
  
  .joker-layout-container {
    background-color: #fff; 
    color: #333;
    margin-left: 240px;
    overflow-y: scroll;
    max-height: 100vh;
    height: calc(100vh - 20px);
    position: relative;
    transition :margin-left .28s;
    .joker-layout-header{
      transition :width .28s;
      border-bottom: 1px solid #ddd;
      padding:10px;
      z-index: 99;
      position: fixed;
      right: 0;
      width: calc(100% - 240px);
      background:#f3f3f3;
      height: 40px;
      line-height: 20px;
      padding:10px 20px;
      top:0;
      .joker-layout-header-item{
        float: left;
        margin-right: 20px;
      }
      .collapse-btn{
        font-size: 24px;
        cursor: pointer;
      }
    }
    .joker-layout-main{
      padding:20px;
      margin-top: 40px;
      height: calc(100% - 40px);
    }
  }
  .joker-userinfo{
    position: relative;
    float: right;
    padding: 5px 8px;
    top: -6px;
    .icon-gerenyonghutouxiang2{
      font-size: 24px
    }
  }
  .userinfo{
    .joker-form-item-label{
      width: 100px;
      padding-right: 20px;
      text-align: right;
    }
  }
  .role-tree{
    max-height: 60vh;
    overflow-y: scroll;
  }
}


body > .el-container {
  margin-bottom: 40px;
}
#app .header-collapse{
  .joker-layout-header{
    width: calc(100% - 64px);
  }
  margin-left: 64px;
}
#app .j-big-img-show .el-dialog{
  background: #fff;
  border-radius: 0;
  .el-dialog__header {
    padding: 20px 20px 10px;
  }
  .el-dialog__body{
    border-radius: 0;
    padding: 30px 20px;
  }
}
</style>