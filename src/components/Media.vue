<template>
  <div class="joker-components-media">
    <div class="media-container">
      <ul class="media-list">
        <li :class="['media-item',mediaIndex == index?'active':'']" @click="mediaIndex = index" v-for="(item,index) in list" :key="item">
          <img :src="item" class="img" alt="">
        </li>
      </ul>
    </div>
    <div class="media-button">
      <span @click="submit">提交</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      mediaIndex:0,
      list:[
        'http://project.fhk255.cn/media/1.png',
        'http://project.fhk255.cn/media/2.jpg',
        'http://project.fhk255.cn/media/3.png',
        'http://project.fhk255.cn/media/4.jpg',
        'http://project.fhk255.cn/media/5.jpg',
        'http://project.fhk255.cn/media/6.jpg',
        'http://project.fhk255.cn/media/7.jpg',
      ]
    }
  },
  methods:{
    submit(){
      this.$emit('getImage',this.list[this.mediaIndex]);
    }
  }
}
</script>

<style lang="scss">
.joker-components-media{
  .media-list{
    display: flex;
    max-height: 70vh;
    flex-wrap: wrap;
    overflow-y: scroll;
    .media-item{
      margin: 5px;
      width: 100px;
      height: 100px;
      border:4px solid transparent;
      opacity: .5;
    }
    .active{
      opacity: 1;
      border:4px solid #04080a;
    }
  }
  .media-button{
    margin:20px 10px;
    span{
      padding: 5px 20px;
      border: 1px solid #ddd;
    }
  }
}
</style>