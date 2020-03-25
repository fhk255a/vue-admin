<template>
  <div class="joker-page-h5-">
    <div v-html="qr"></div>
  </div>
</template>

<script>
import VueQArt from 'vue-qart'
import H5 from '@/api/h5';

export default {
  data(){
    return{
      qr:''
    }
  },
  mounted(){
    H5.qrCode('ufjnh87hp1o').then(res=>{
      this.qr = res;
    })
    H5.getPid('ufjnh87hp1o');
  }
}
</script>

<style>

</style>