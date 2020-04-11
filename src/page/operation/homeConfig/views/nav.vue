<template>
  <div class="item-components h5-page-component-nav">
    <ul class="nav-list" :style="{flexWrap:data.isOne?'unset':'wrap',maxHeight:(370/data.num*2)+20+'px'}">
      <li class="nav-item" :style="{minWidth:100/data.num+'%',width:100/data.num+'%'}" v-for="(item,index) in data.data" :key="index">
        <div class="">
          <img src="@/assets/image/image.png" alt="" v-load-img="item.image" class="img">
        </div>
        <p>{{item.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    }
  }
}
</script>

<style lang="scss" >
.h5-page-component-nav{
  .nav-list{
    width: 370px;
    display: flex;
    overflow: hidden;
    >li{
      padding-bottom: 10px;
      text-align: center;
      >div{
        width: 100%;
        padding-left:10px;
        padding-right: 10px;
        img{
          border-radius: 50%;
          width: 100%;
          display: block;
          height: auto;
        }
      }
      p{
        font-weight: lighter;
        font-size: 12px;
        margin-top: 4px;
      }
    }
  }
}
</style>