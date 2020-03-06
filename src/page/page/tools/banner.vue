<template>
  <div class="h5-page-tools-banner">
    {{component}}
    <i class="el-icon-plus" @click="openMedia"></i>
    <Dialog title="媒体库" :show="dialog" @close="close">
      <Media @getImage="getImage"/>
    </Dialog>
  </div>
</template>

<script>
import {ID} from '@/lib/common';
import Dialog from '@/components/Dialog';
import Media from '@/components/Media';
export default {
  components:{
    Dialog,
    Media
  },
  props:{
    component:{
      type:Object,
      default:()=>{}
    }
  },
  data(){
    return {
      fileList:[],
      dialog:false
    }
  },
  methods:{
    openMedia(){
      this.dialog = true;
    },
    // 获取图片
    getImage(img){
      this.component.data[0].image = img;
      this.close();
      console.log(img);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      // this.uploadData.name = file
      console.log(file);
    },
    close(){
      this.dialog = false;
    }
  },
  computed:{
    currentComponent(){
      return this.$store.state.page.components[this.$store.state.page.componentIndex];
    },
  }
}
</script>

<style lang="scss">
.h5-page-tools-banner{
  .el-icon-plus{
    font-size: 24px;
    border:1px solid #eee;
    padding: 40px;
    border: 1px dashed #ccc;
  }
}
</style>