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
      <div class="login-item" >
        <span class="color-blue" @click="qrLogin">
          扫码体验
        </span>
      </div>
      <div class="login-item btns">
        <el-button @click="login()">登陆</el-button>
      </div>
    </div>
    <Dialog @close="close" :show="dialog" width="500px" title="扫码登录体验账号">
      <div class="login-code" v-html="QRCODE" />
    </Dialog>
  </div>
</template>

<script>
import USER from '@/api/user';
import Cookie from '@/lib/cookie';
import STORE from '@/lib/store';
import Dialog from '@/components/Dialog';
import {ID} from '@/lib/common';
export default {
  data(){
    return{
      username:'',
      password:'',
      ALLUSERS:[], // 所有用户
      dialog:false, // 二维码框
      QRCODE:'',
      redata:{},
      uuid:ID(),
      websock:null,
    }
  },
  mounted(){
  },
  methods:{
    close(){
      this.dialog =false;
    },
    initWebSocket(id){ //初始化weosocket
      const wsuri = `ws://project.fhk255.cn/loginSocket/${id}`;
      // const wsuri = `ws://localhost:3000/loginSocket/${id}`;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket(this.uuid);
    },
    websocketonmessage(e){ //数据接收
      let timer = null;
      const res = JSON.parse(e.data);
      if(res && res.code && res.code == 200){
        this.notify(res.msg,'OH~YES!','success')
        Cookie.set('vue-admin-token',res.data.token)
        STORE.set('vue-admin-userinfo',res.data)
        STORE.set('vue-admin-menu',res.data.menu)
        this.$store.dispatch('changeUserMenu',res.data.menu);
        this.$store.dispatch('changeUserInfo',res.data.userInfo);
        this.$store.dispatch('changeToken',res.data.token);
        this.$store.dispatch('changeUserResource',res.data.resource);
        timer = setTimeout(()=>{
          window.location.reload();
        },500)
        this.websock = null;
      }else if(res.code == 400){
        this.notify(res.msg,'抱歉','error');
        this.websock = null;
      }
      // this.redata = JSON.parse(e.data);
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data);
    },
    websocketclose(e){  //关闭
      // console.log('断开连接',e);
    },
    // 扫码登录
    qrLogin(){
      // this.initWebSocket();
      this.initWebSocket(this.uuid);
      USER.getLoginCode(this.uuid).then(res=>{
        if(res.code==200){
          this.QRCODE = res.data.img;
          this.dialog = true;
        }else{
          this.QRCODE = res.msg;
          this.dialog = true;
          this.notify(res.msg);
        }
      }).catch(err=>{
        this.notify(err);
      })
    },
    login(){
      // this.websocketsend(this.username)
      USER.login(this.username,this.password).then(res=>{
        if(res.code == 200){
          this.notify(res.msg,'OH~YES!','success')
          Cookie.set('vue-admin-token',res.data.token)
          STORE.set('vue-admin-userinfo',res.data)
          STORE.set('vue-admin-menu',res.data.menu)
          this.$store.dispatch('changeUserMenu',res.data.menu);
          this.$store.dispatch('changeUserInfo',res.data.userInfo);
          this.$store.dispatch('changeToken',res.data.token);
          this.$store.dispatch('changeUserResource',res.data.resource);
          timer = setTimeout(()=>{
            window.location.reload();
          },500)
        }else{
          this.notify(res.msg,'EMMM~!','error');
        }
      });
    }
  },
  components:{
    Dialog
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
.login-code{
  width: 100%;
  height: 100%;
  text-align: center;
  svg{
    width: 100%;
    height: 100%;
  }
}
</style>