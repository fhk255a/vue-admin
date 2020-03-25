<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import isPass from '@/lib/esss';
import USER,{MENU} from '@/api/user';
import routes from '@/router/routes';
import Cookie from '@/lib/cookie';
import STORE from '@/lib/store';
export default {
  mixins:[isPass],
  name: 'App',
  mounted(){
    if(!STORE.get('vue-admin-menu')){
      MENU.list().then(res=>{
        this.$store.dispatch('changeMenuList',res.data);
        STORE.set('vue-admin-menu',res.data)
      })
    }
    if(Cookie.has('vue-admin-token') && Cookie.has('vue-admin-token')!='null'){
      if(!STORE.get('vue-admin-userinfo')){
        USER.getInfo().then(res=>{
          if(res.code == 200){
            STORE.set('vue-admin-userinfo',res.data)
            this.$store.dispatch('changeUserMenu',res.data.menu);
            this.$store.dispatch('changeUserInfo',res.data.userInfo);
            this.$store.dispatch('changeUserResource',res.data.resource);
          }else{
            this.notify(res.msg);
          }
        }).catch(err=>{
          this.notify(err);
        })
      }else{

      }
    }
  }
}
</script>

<style lang="scss">
</style>
