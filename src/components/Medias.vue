<template>
  <div class="joker-components-medias">
    <Card title="媒体库" @mousedown.stop="stopFun">
      <ul class="medias-ul" @mousedown.stop="stopFun">
        <li :class="['medias-li',item.num<1?'isNull':'null']"
          @click="openFile(item,index)"
            :key="index" v-for="(item,index) in tableList" >
          <i :class="[item.dirName != currentData.dirName || !innerVisible?'el-icon-folder':'el-icon-folder-opened']"></i>
          <span class="dir-name">{{item.dirName}}</span>
          <span class="dir-item-num">({{item.num}})</span>
        </li>
      </ul>
      <el-dialog
        width="70%"
        top="5vh"
        @mousedown.stop="stopFun"
        :title="currentData.dirName"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="current-image" v-show="currentIndex!=null">
          <span>
            缩略图(100x100):
            <i ref="min-link" class="link-tag">{{info.minImage}}</i>
            <el-tag ref="copyImageUrl" @click="copyImageLink(0)" title="复制图片链接">{{info.minSize}}KB</el-tag>
          </span>
          <span>
            普通图(240x240):
            <i ref="-link" class="link-tag">{{info.image}}</i>
            <el-tag ref="copyImageUrl" @click="copyImageLink(1)" title="复制图片链接">{{info.size}}KB</el-tag>
          </span>
          <span>
            原图(原始尺寸):
            <i ref="big-link" class="link-tag">{{info.bigImage}}</i>
            <el-tag ref="copyImageUrl" @click="copyImageLink(2)" title="复制图片链接">{{info.bigSize}}KB</el-tag>
          </span>
        </div>
        <el-dialog
          @mousedown.stop="stopFun"
          width="600px"
          :title="showImage.image"
          :visible.sync="showDialg"
          top="5vh"
          append-to-body>
          <div style="width:100%;height:100%">
            <img style="width:100%;height:100%" v-load-img="showImage.image" src="./404.png" alt="">
          </div>
        </el-dialog>
        <div class="joker-form media-form" @mousedown="stopFun">
          <Item
            :class="['media-item',index==currentIndex?'active':'']" 
            v-for="(item,index) in currentData.files" :key="index">
            <div 
              @click="selectIamge(item,index)">
              <img src="./404.png" width="100" height="100" v-load-img="item.minImage">
              <span>{{item.fileName}}</span>
              <span class="size">{{item.bigSize}}KB</span>
            </div>
          </Item>
        </div>
        <div class="media-form-footer">
          <el-button type="primary" style="float:left" class="set-text color-blue icon-btn" @click="submit">确认</el-button>
          <el-button type="info" style="float:left" 
            :disabled="currentIndex==null"
            class="set-text color-green icon-btn" @click="view">查看原图</el-button>
          <el-button type="danger" style="float:right"
            :disabled="currentIndex==null" 
            class="set-text color-red icon-btn" @click="remove">删除</el-button>
        </div>
      </el-dialog>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card';
import Item from '@/components/Item';
import MEDIA  from '@/api/media';
export default {
  components:{
    Card,
    Item
  },
  data(){
    return{
      outerVisible:true,
      innerVisible:false,
      currentIndex:null,
      currentData:{},
      bigDialog:false,
      showDialg:false,
      showImage:{
        image:'',
        fileName:'',
      },
      info:{},
      tableList:[]
    }
  },
  mounted(){
    this.getDirName();
  },
  methods:{
    // 阻止冒泡
    stopFun(){
      console.log('11');
    },
    // 获取所有文件夹及其数量
    getDirName(){
      MEDIA.dirList().then(res=>{
        if(res.code==200){
          this.tableList = res.data;
        }
      })
    },
    // 根据文件夹名称获取文件夹下得图片
    dirQueryFiles(name,index){
      MEDIA.dirQueryFiles(name).then(res=>{
        this.tableList[index].files = res.data;
        this.currentData = this.tableList[index];
        console.log(this.currentData)
      }).catch(err=>{

      })
    },
    openFile(item,index){
      this.dirQueryFiles(item.dirName,index);
      this.innerVisible=true
      this.currentIndex = null;
      this.info={};
    },
    selectIamge(item,index){
      this.currentIndex = index;
      this.info = {...item,
        bigImage:item.minImage.replace('x100',''),
        image:item.minImage.replace('x100','x240'),
      };
    },
    // 确认按钮
    submit(){
      this.innerVisible = false;
      this.$emit('submit',this.currentData.minImage);
    },
    // 删除操作
    remove(){
      this.$confirm('是否删除该图片,该操作不可逆!?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.info.id){
          MEDIA.deleteFileItem(this.info.id).then(res=>{
            if(res.code==200){
              
            }else{

            }
          }).catch(err=>{

          })
        }
      }).catch(() => {
        this.$message.info('您点了取消');          
      });
    },
    // 复制图片链接
    copyImageLink(type){
      let oLink;
      if(type == 0){
        oLink = this.$refs['min-link'];
      }
      else if(type == 1){
        oLink = this.$refs['-link'];
      }
      else{
        oLink = this.$refs['big-link'];
      }
      window.getSelection().selectAllChildren(oLink);
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        this.$message.success('复制成功');
      }
    },
    // 查看大图
    view(){
      this.showDialg = true;
      const ITEM = {...this.currentData.files[this.currentIndex]};
      this.showImage = ITEM;
      console.log(ITEM);
      this.showImage.image = ITEM.minImage.replace('x100','');
    }
  }
}
</script>

<style lang="scss">
.joker-components-medias{
  .medias-ul{
    display: flex;
    .medias-li{
      padding: 10px;
      font-size: 40px;
      color: darkgray;
      display: flex;
      flex-direction: column;
      align-items: center;
      .dir-name{
        margin: 10px;
        margin-bottom: 0;
        font-size: 14px;
      }
      .dir-item-num{
        margin: 10px;
        font-size: 12px;
      }
    }
    .isNull{
      cursor: no-drop; 
      color: #e0dfdf;
    }
    .null{
      cursor: pointer;
      &:hover{
        background: rgba(125,125,125,0.1);
        .dir-item-num{
          color:#409EFF;
        } 
      }
    }
  }
}
.el-dialog__body{
  padding:10px 20px;
}
.link-tag{
  overflow: hidden;
  position: absolute;
  z-index: -9999;
  top: -100vh;
  left: -100vh;
}
.current-image{
  text-align: center;
  padding-bottom: 10px;
  >span{
    margin-right: 30px;
  }
  .el-tag{
    cursor: pointer;
  }
}
.media-form-footer{
  padding-top: 10px;
  overflow: hidden;
}
.media-form{
  display: flex;
  flex-wrap: wrap;
  max-height: 70vh;
  overflow-y: scroll;
  .media-item{
    margin: 5px;
    padding: 10px;
    width: 100px;
    height: 130px;
    position: relative;
    color: darkgray;
    cursor: pointer;
    border:1px solid #eee;
    img{
      width: 80px;
      height: 80px;
      min-width: 80px;
      min-height: 80px;
    }
    span{
      font-size: 12px;
    }
    &:hover{
      border-color: dimgray;
      color: #666;
      .size{
        background: dimgray;
      }
    }
  }
  .active{
    color: #333;
    border-color: dimgray;
    .size{
      background: dimgray;
    }
  }
  .size{
    position: absolute;
    right: -14px;
    background: #eee;
    top: 10px;
    color: #fff;
    padding: 2px 5px;
    transform: rotate(38deg);
  }
}
</style>