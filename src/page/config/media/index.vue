
  <template>  
    <div class="joker-page-media">
      <div class="joker-form" v-if="newUpload" style="margin-bottom:10px">
        <Item title="最新上传的链接">
          <Popover :show="show" @no="show=false" @yes="show=false">
            <img :src="newUpload" alt="" >
          </Popover>
          <i ref="new-upload-link" @click="show=true">{{newUpload}}</i>
          <span v-if="newUpload" class="color-blue icon-btn" @click="copy">复制</span>
        </Item>
      </div>
      <Media >
        <template slot="upload">
          <el-upload 
            :action="$request.defaults.baseURL+'/function/upload'"
            :headers="{'Authorization': getToken()}"
            :with-credentials="true"
            name="image"
            class="upload-img"
            :show-file-list="false"
            :before-upload="beforeUploadImg"
            :on-success="uploadImageSuccess"
            :on-error="uploadImageError"
          >
            <i class="el-icon-plus avatar-uploader-icon" ></i>
            <p style="font-size:14px">上传图片</p>
          </el-upload>
        </template>
      </Media>
    </div>
  </template>
  
  <script>
    import Media from '@/components/Medias';
    import Item from '@/components/Item';
    import Popover from '@/components/Popover';
    import {getToken} from '@/lib/token';
    export default {
      components:{
        Media,
        Item,
        Popover
      },
      data(){
        return{
          show:false,
          getToken,
          newUpload:'http://img.fhk255.cn/2020041/15857240448687197.png',
        }
      },
      methods:{
        copy(){
          let oLink = this.$refs['new-upload-link'];
          window.getSelection().selectAllChildren(oLink);
          if (document.execCommand('copy')) {
            document.execCommand('copy');
            this.notify('已经复制到剪切板','上传成功','success','Ctrl+v 即可粘贴');
          }
        },
        // 最终从媒体库选择得图
        submit(url){
          console.log(url);
          this.dialog = false;
        },
        // 上传失败
        uploadImageError(err, file, fileList) {
          this.$message.error('上传失败;'+err);
        },
        // 上传成功
        uploadImageSuccess(response, file, fileList) {
          this.$store.dispatch('loading',false);
          if(response.code==200){
            this.newUpload = response.data;
            this.$message.success(response.msg);
            this.copy();
          }else{
            this.$message.success(response.msg);
          }
        },
        // 上传图片判断
        beforeUploadImg(file) {
          const isJPG = file.type === 'image/jpeg';
          const isPng = file.type === 'image/png';
          let kb = Math.floor((file.size / 1024 / 1024)*100)/100; 
          let maxSize =  500;
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
            return isJPG || isPng && isPassSize;
          }
          this.$store.dispatch('loading',true);
        },
      },
    }
  </script>
  
  <style lang="scss">
  .joker-page-media{
    .upload-img{
      width: 100%;
      height: 100%;
      color: #666;
      >.el-upload--text{
        width: 100%;
        color: #666;
        height: 100%;
        display: flex;  
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
  </style>