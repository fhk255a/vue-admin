<template>
  <div class="joker-page-404">
    <div class="page-container">
      <!-- <Card :show="true" title="页面不存在" > -->
        <div>
          <div class="iconfont icon-jingshi"><span style="font-weight:600;">404</span></div>
          <p>页面不存在</p>
          <p>你似乎来到了一个不存在的领域</p>
          <p>
            <a href="/#/home" class="color-blue set-text">回到首页</a>
          </p>
          <p class="joker-blog">
            <a href="http://fhk255.cn" class="color-default set-text">JOKER's BLOG</a>
          </p>
        </div>
      <!-- </Card> -->
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
export default {
  components:{
    Card
  }
}
</script>

<style lang="scss">
.joker-page-404{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
  background: #fcfcfc;
  color: #070f14;
  .page-container{
    max-width: 100%;
    width: 500px;
    text-align: center;
    .joker-component-card{
      background: #fff;
    }
  }
  .icon-jingshi{
    font-size: 100px;
    font-weight: 0;
    text-align: center;
    margin-bottom: 30px;
  }
  p{
    margin: 10px 0;
    color:#666;
  }
  .joker-blog{
    position: absolute;
    bottom: 10vh;
    width: 100%;
    left: 0;
    text-align: center;
    right: 0;
  }
}
</style>