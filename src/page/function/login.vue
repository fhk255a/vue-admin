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
import STORE from '@/lib/store';
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
      USER.login(this.username,this.password).then(res=>{
        if(res.code == 200){
          Cookie.set('vue-admin-token',res.data.token)
          STORE.set('vue-admin-userinfo',res.data)
          STORE.set('vue-admin-menu',res.data.menu)
          this.$store.dispatch('changeUserMenu',res.data.menu);
          this.$store.dispatch('changeUserInfo',res.data.userInfo);
          this.$store.dispatch('changeToken',res.data.token);
          this.$store.dispatch('changeUserResource',res.data.resource);
          window.location.reload();
        }else{
          this.notify(res.msg);
        }
      });
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