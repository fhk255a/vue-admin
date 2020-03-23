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
export default {
  mixins:[isPass],
  name: 'App',
  mounted(){
    if(Cookie.has('vue-admin-token') && Cookie.has('vue-admin-token')!='null'){
      MENU.list().then(res=>{
        this.$store.dispatch('changeUserMenu',res.data);
      })
      USER.getInfo().then(res=>{
        if(res.code == 200){
          Cookie.set('vue-admin-menu',res.data.menu)
          this.$store.dispatch('changeUserMenu',res.data.menu);
          this.$store.dispatch('changeUserInfo',res.data.userInfo);
          this.$store.dispatch('changeUserResource',res.data.resource);
        }else{
          this.notify(res.msg);
        }
      }).catch(err=>{
        this.notify(err);
      })
    }
  }
}
</script>

<style lang="scss">
</style>
