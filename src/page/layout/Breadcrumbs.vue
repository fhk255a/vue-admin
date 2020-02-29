<template>
  <div class="joker-page-layout-breadcrumbs">
    <template v-for="(item,index) in router">
      <div class="breadcrumbs-item" :key="item.path">
        <template v-if="index == router.length-1">
          <a >
            <span :class="item.path==$route.path?'currentPath':''">{{item.meta.title}}</span>
          </a>
        </template>
        <template v-else>    
          <router-link :to="item.path">
            <span :class="item.path==$route.path?'currentPath':''">{{item.meta.title}}</span>
          </router-link>
          <span :style="item.path==$route.path?'color:#000':'color:#999'" class="spilt-line">{{index==router.length-1?'':'/'}}</span>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  computed:{
    router() {
      return this.$route.matched;
    },
  },
  mounted(){
    console.log(this.$route.path)
  }
}
</script>

<style lang="scss">
.joker-page-layout-breadcrumbs{
  display: flex;
  align-items: center;
  
    user-select: none;
  .breadcrumbs-item{
    font-size: 14px;
  }
  a span{
    color:#999;
    &:hover{
      color:#000;
    }
  }
}
.spilt-line{
  margin: 0 8px;
}
.joker-page-layout-breadcrumbs{
  a .currentPath{
  color:#000;
  }
} 
</style>