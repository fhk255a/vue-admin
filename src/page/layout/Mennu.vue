<template>
  <div class="joker-component-menu">
    <div class="logo" v-show="!$store.state.func.collapse">LOGO</div>
    <el-menu class="joker-menu el-menu-vertical" 
      :collapse="$store.state.func.collapse"
      :unique-opened="true"  
      :default-active="$route.path"
    > 
      <!-- 
        1、有子集的菜单   1->[1-1,1-2,1-3]
        2、无子集 或者 只有自己一个菜单 1->[1-1]
        3、只做了3层 超过3层可优化成递归组件 但是这里用不上。
       -->
       <!-- v-for="(item) in allroutes" 2020-2-28 初始化菜单 -->
       <!-- v-for="(item) in $store.state.competence.menuList" 2020-3-3 读取vuex菜单 -->
      <template v-for="(item) in $store.state.competence.menuList" >
        <el-submenu  
          :key="item.path"
          v-if="userMenu && userMenu.findIndex(menu=>menu==item.name)!=-1"
          :index="item.path">
          <template slot="title">
            <i :class="['title-icon iconfont',item.icon?item.icon:'not-icon']"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <template v-for="(ite) in item.children" >
            <template v-if="userMenu && userMenu.findIndex(menu=>ite.name==menu)!=-1">
              <el-submenu v-if="ite.children.length>0" :key="ite.path" :index="ite.path">
                <template slot="title">
                  <i :class="['title-icon iconfont',ite.icon?item.icon:'not-icon']"></i>
                  {{ite.meta.title}}
                </template>
                <router-link v-for="(it) in ite.children" :key="it.path" :to="it.path">
                  <template v-if="userMenu && userMenu.findIndex(menu=>it.name==menu)!=-1">
                    <el-menu-item :index="it.path" v-if="!it.isHide">
                      <i :class="['title-icon iconfont',it.icon?it.icon:'not-icon']"></i>
                      {{it.meta.title}}
                    </el-menu-item>
                  </template>
                </router-link>
              </el-submenu>
              <router-link v-else :key="ite.path" :to="ite.path">
                <el-menu-item :index="ite.path" v-if="!ite.isHide">
                  <i :class="['title-icon iconfont',ite.icon?ite.icon:'not-icon']"></i>
                  {{ite.meta.title}}
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import Cookie from '@/lib/cookie';
import routes from '@/router/routes';
export default {
  data(){
    return{
      allroutes:[], // 默认路由表
    }
  },
  methods:{
    initRoute(data,path=''){
      return data.map(item=>{
        item.path=path+item.path;
        item.icon=item.icon?item.icon:'';
        item.children=item.children?item.children:[];
        if(item.children && item.children.length>0){
          this.initRoute(item.children,item.path+'/',item);
          return item;
        }
        return item;
      })
    }
  },
  computed:{
    userMenu(){
      return this.$store.state.userInfo.menu;
    }
  },
}
</script>

<style lang="scss">
  .joker-component-menu{
    background: #070f14;
    overflow-x: hidden;
    height: 100%;
    overflow-y: scroll;
    .el-menu{
      background: #070f14;
      border-right:0;
    }    
    .el-menu-vertical:not(.el-menu--collapse) {
      width: 240px;
    }
    .joler-menu{
      border-right:0;
    }
    .title-icon{
      vertical-align: middle;
      margin-right: 2px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      display: inline-block;
      font-weight: lighter;
    }
    .not-icon{
      width: 10px;
    }
    .logo{
      text-align: center;
      padding: 40px 20px;
      font-weight: 600;
      font-size: 36px;
      color: #fff;
    }
    .el-submenu .el-menu-item ,.el-menu-item, .el-submenu__title{
      height: 40px;
      line-height: 40px;
      font-weight: 600;
      color: #a3a396;
      a{
        color: #a3a396;
        text-decoration: none;
      }
    }
    .el-menu-item-group__title{
      padding: 0;
    }
    .el-menu .el-submenu .is-active{
      color: #fff;
      >a{
        color: #fff;
      }
    }
    .el-menu-item:focus, .el-menu-item:hover{
      background: #26333c;
    }
    .el-submenu__title:hover{
      background: #26333c;
    }
    .is-opened{
      background-color: #26333c;
    }
    .is-opened>ul{
      background: #26333c;
    }
    .joker-menu{
    .el-submenu__title{
      color:#909087;
    }
    .el-menu-item:focus, .el-menu-item:hover{
      background: #ecf5ff4a;
    }
  }
}
</style>