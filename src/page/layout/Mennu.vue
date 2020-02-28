<template>
  <div class="joker-component-menu">
    <p class="open" @click="isCollapse = !isCollapse">open</p>
    <el-menu class="el-menu-vertical" 
      :collapse="isCollapse"
      :unique-opened="true"  
      :default-active="$route.path"
    > 
      <!-- 
        1、有子集的菜单   1->[1-1,1-2,1-3]
        2、无子集 或者 只有自己一个菜单 1->[1-1]
       -->
      <div class="logo" v-show="!isCollapse">LOGO</div>
      <el-submenu v-for="(item) in allroutes" :key="item.path" :index="item.path">
        <template slot="title">
            <i :class="['title-icon iconfont',item.icon?item.icon:'not-icon']"></i>
            <span slot="title">{{item.title}}</span>
        </template>
        <template v-for="(ite) in item.children" >
          <el-submenu v-if="ite.children.length>0" :key="ite.path" :index="ite.path">
            <template slot="title">
              <i :class="['title-icon iconfont',ite.icon?item.icon:'not-icon']"></i>
              {{ite.title}}
            </template>
            <router-link v-for="(it) in ite.children" :key="it.path" :to="it.path">
              <el-menu-item :index="it.path">
                  <i :class="['title-icon iconfont',it.icon?it.icon:'not-icon']"></i>
                  {{it.title}}
              </el-menu-item>
            </router-link>
          </el-submenu>
          <router-link v-else :key="ite.path" :to="ite.path">
            <el-menu-item :index="ite.path">
                <i :class="['title-icon iconfont',ite.icon?ite.icon:'not-icon']"></i>
                {{ite.title}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import routes from '@/router/routes';
export default {
  data(){
    return{
      isCollapse:false,
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
  mounted(){
    this.allroutes = this.initRoute(routes);
  }
}
</script>

<style lang="scss">
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
.joker-component-menu{
  background: #070f14;
  height: 100%;
  .el-menu{
    background: #070f14;
  }    
}
.open{
  color: #fff;
}
.title-icon{
  vertical-align: middle;
  margin-right: 2px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  display: inline-block;
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
.joker-component-menu {
  .is-opened{
    background-color: #26333c;
  }
  .is-opened>ul{
    background: #26333c;
  }
}
</style>