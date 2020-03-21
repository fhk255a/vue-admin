<template>
  <div class="joker-page-login">
    <div class="login-text">
      VUE-ADMIN
    </div>
    <div class="login-container">
      <div class="login-title">
        LOGIN
      </div>
      <div class="login-item">
        <el-input v-model="username">
          <template slot="prepend">
            <span class="icon-yonghutouxiang iconfont"></span>
          </template>
        </el-input>
      </div>
      <div class="login-item">
        <el-input v-model="password">
          <template slot="prepend">
            <span class="icon-suo iconfont"></span>
          </template>
        </el-input>
      </div>
      <div class="login-item btns">
        <el-button @click="login()">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import USER from '@/api/user';
import Cookie from '@/lib/cookie';
export default {
  data(){
    return{
      username:'',
      password:'',
      ALLUSERS:[], // 所有用户
    }
  },
  mounted(){
    // 这一步是获取全部数据 在真实线上是发请求。
    this.ALLUSERS = this.$store.state.competence.userList;
  },
  methods:{
    login(){
      const adata = this.ALLUSERS.find(item=>item.username == this.username && item.password == this.password);
      const role = this.$store.state.competence.roleList;
      let timer = null;
      USER.login(this.username,this.password).then(res=>{
        const MENU = role.find(item=>item.id*1 == adata.role*1);
        Cookie.set('vue-admin-token',res.data.token)
        Cookie.set('vue-admin-userInfo',JSON.stringify(res));
        Cookie.set('vue-admin-menu',MENU.menu)
        Cookie.set('vue-admin-resource',MENU.resource)
        this.$store.dispatch('changeToken',res.data.token);
        this.$store.dispatch('changeUserInfo',adata);
        this.$store.dispatch('changeUserMenu',MENU.menu);
        this.$store.dispatch('changeUserResource',MENU.resource);
        window.location.reload();
      });
      return;
      if(res){
        // 假装有token 
        res.token = 'sdAOSsdgFJDOASFJdfLLFajshdGLKSFSadfPODsdgFAHSDsfdgsASDIWHSjgLDFJ';
        const MENU = role.find(item=>item.id*1 == res.role*1);
        if(MENU){
          this.notify(`尊敬的 <span class="color-blue">[ ${res.nickName} ]</span>`,'success',`登陆成功`,' ');
          Cookie.set('vue-admin-token',res.token)
          Cookie.set('vue-admin-userInfo',JSON.stringify(res));
          Cookie.set('vue-admin-menu',MENU.menu)
          Cookie.set('vue-admin-resource',MENU.resource)
          this.$store.dispatch('changeToken',res.token);
          this.$store.dispatch('changeUserInfo',res);
          this.$store.dispatch('changeUserMenu',MENU.menu);
          this.$store.dispatch('changeUserResource',MENU.resource);
          // this.$router.push('/');
          window.location.reload();
        }
      }else{
        this.$message.error('账户与密码错误');
        return;
      }
    }
  }
}
</script>

<style lang="scss">
.joker-page-login{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: baseline;
  min-height: 100vh;
  background: #070f14;
  padding: 0 10px;
}
.login-text{
  margin-top: 20vh;
  color: #fff;
  font-weight: 600;
  font-size: 24px;
  user-select: none;
  margin-bottom: 30px;
}
.login-container{
  max-width: 100%;
  width: 400px;
  padding: 20px;
  border: 1px solid #eee;
  background: #fff;
  border-radius: 6px;
  .login-item{
    margin-bottom:20px;
  }
  .btns{
    text-align: center;
    margin-bottom: 0;
    .el-button{
      min-width: 100px;
    }
  }
  .login-title{
    font-weight: 600;
    margin-bottom: 20px;
    font-size: 24px;
    color: #070f14;
    user-select: none;
  }
}
</style>