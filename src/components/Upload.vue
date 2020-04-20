<template>
  <div class="joker-component-upload">
    <template v-if="!data">
      <el-upload 
        :action="$request.defaults.baseURL+'/function/upload'"
        :headers="{'Authorization': getToken()}"
        :with-credentials="true"
        :data="path?{path:path,size:size}:{size:size}"
        name="image"
        class="upload-img"
        :show-file-list="false"
        :before-upload="beforeUploadImg"
        :on-success="uploadImageSuccess"
        :on-error="uploadImageError"
        :style="{
          width: width,
          height: height,
          lineHeight: height,
        }"
      >
        <i class="el-icon-plus avatar-uploader-icon" ></i>
      </el-upload>
      <span class="upload-text color-blue" @click="dialog=true">从媒体库添加</span>
    </template>
    <template v-else>
      <span class="upload-text color-blue" @click="$emit('remove')">重新上传</span>
      <span class="upload-text color-blue" @click="dialog=true">从媒体库添加</span>
    </template>
    <el-dialog class="media-dialog"
      :visible.sync="dialog"
      @mousedown.stop=""
      :modal="false"
      top="5vh"
      :modal-append-to-body="false"
      width="80%">
      <Media @submit="submit" />
    </el-dialog>
  </div>
</template>

<script>
import {getToken} from '@/lib/token';
import Media from '@/components/Medias';
import FUNCTION from '@/api/function';
export default {
  props:{
    index:{
      type:Number,
      default:0
    },
    data:{
      type:String,
      default:()=>''
    },
    maxSize: { //最大一张上传大小 默认500K
      type: Number,
      default: 0.5
    },
    size:{ // 返回的尺寸 有 3个选择 0:原图，1:240，3:80
      type: Number,
      default: 3,
    },
    maxNum: {//最大上传数
      type: Number,
      default:1
    },
    width:{
      type: String,
      default:()=>'80px'
    },
    height:{
      type: String,
      default:()=>'80px'
    },
    path:{
      type: String,
      default:()=>null
    },
  },
  data(){
    return{
      getToken,
      dialog:false,
    }
  },
  methods:{
    submit(data){
      this.dialog = false; 
      this.$emit('success', {
        code: '200',
        data: data,
        index:this.index,
      });
    },
    // 上传失败
    uploadImageError(err, file, fileList) {
      this.$message.error('上传失败;'+err);
    },
    // 上传成功
    uploadImageSuccess(response, file, fileList) {
      // this.$store.dispatch('loading',false);
      if(response.code==200){
         this.$emit('success', {
          code: '200',
          data: response.data,
          index:this.index,
        });
      }else{
         this.$emit('error', {
          code: '500',
          data: null,
          index:this.index,
        });
      }
    },
    // 上传图片判断
    beforeUploadImg(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png';
      let kb = Math.floor((file.size / 1024 / 1024)*100)/100; 
      let maxSize =  this.maxSize;
      const isPassSize = kb < maxSize;
      if (!isPassSize) {
        this.$message.error("Upload an image size can't exceed " + Math.ceil(maxSize * 1024) + "KB !");
        return false;
      }
      if (isJPG || isPng) {
        // this.$store.dispatch('loading',true);
        return isJPG || isPng && isPassSize;
      }
    },
  },
  components:{
    Media
  }
}
</script>

<style lang="scss">
.upload-img{
  border: 1px solid #eee;
  text-align: center;
  font-size: 28px;
}
.joker-component-upload{
  text-align: left;
  .upload-text{
    text-decoration: underline;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>