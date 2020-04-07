<template>
  <el-upload 
    :action="$request.defaults.baseURL+'/function/uploadProduct'"
    :headers="{'Authorization': getToken()}"
    :with-credentials="true"
    :data="{id:pid}"
    name="image"
    class="upload-img"
    :show-file-list="false"
    :before-upload="beforeUploadImg"
    :on-success="uploadImageSuccess"
    :on-error="uploadImageError"
  >
    <i class="el-icon-plus avatar-uploader-icon" ></i>
  </el-upload>
</template>

<script>
import {getToken} from '@/lib/token';
import FUNCTION from '@/api/function';
export default {
  props:{
    index:{
      type:Number,
      default:()=>0
    },
    pid:{
      type:String,
      default:()=>'default'
    },
    maxSize: { //最大一张上传大小 默认500K
      type: Number,
      default: 0.5
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
  },
  data(){
    return{
      getToken,
    }
  },
  methods:{
    // 最终从媒体库选择得图
    submit(url){
      this.dialog = false;
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
         this.$emit(response.msg, {
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
      if (isJPG || isPng) {

      } else {
        this.$message.error('请上传"PNG"与"JPG"格式!');
        return false;
      }
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
}
</script>

<style scoped lang="scss">
.upload-img{
  border: 1px solid #eee;
  text-align: center;
  font-size: 28px;
  height: 80px;
  line-height: 80px;
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