<template>
  <div class="joker-page-home">
    <div class="home-container">
      <Card :title="userInfo.userInfo && userInfo.userInfo.nickName?`<span class='color-blue'>${userInfo.userInfo.nickName}  </span> <span >${msg}</span>`:'游客，'+msg">
        <div>
          <span class="title">{{goodsMsg}}</span>
          <span class="color-red" v-if="userInfo && !userInfo.token">你还未登录噢？去 <router-link to="/login" class="set-text color-blue">登录</router-link></span>
        </div>
        <div class="home-container-body">
          <p>今天是 <span class="color-red">{{day[timer.day]}}</span></p>
          <p>{{timer.time}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
export default {
  data(){
    return{
      msg:'您好！', // 提示语
      timer:{
        time:'',
        day:'',
      },
      day:['周日','周一','周二','周三','周四','周五','周六'],
      TIME:new Date(),
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo; 
    },
    goodsMsg(){
      return this.TIME.getHours()>18?'晚上好！':this.TIME.getHours()<12?'早上好！':'下午好！';
    }
  },
  components:{
    Card,
  },
  mounted(){
    let Y = this.TIME.getFullYear();
    let M = (this.TIME.getMonth()*1+1)>10?this.TIME.getMonth()*1+1:'0'+(this.TIME.getMonth()*1+1);
    let D = this.TIME.getDate()>10?this.TIME.getDate():'0'+this.TIME.getDate();
    let H = this.TIME.getHours()>10?this.TIME.getHours():'0'+this.TIME.getMonth();
    let m = this.TIME.getMinutes()>10?this.TIME.getMinutes():'0'+this.TIME.getMinutes();
    this.timer = {
      time:`${Y}-${M}-${D}  ${H}:${m}`,
      day:this.TIME.getDay()
    }
  }
}
</script>

<style lang="scss">
.joker-page-home{
  display: flex;
  min-height: 60vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .home-container{
    max-width: 100%;
    width: 700px;
    .title{
      font-weight: 600;
      font-size: 30px;
      margin: 10px 0;
    }
    p{
      line-height: 36px;
    }
    .home-container-body{
      padding-top: 30px;
    }
  }
}
</style>