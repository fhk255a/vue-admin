<template>
  <div class="joker-components-medias">
      <Card title="媒体库">
        <ul class="medias-ul">
          <li class="medias-li isNull">
            <i class="el-icon-folder"></i>
            <span class="dir-name">20200309</span>
            <span class="dir-item-num">(0)</span>
          </li>
          <li class="medias-li null">
            <i class="el-icon-folder"></i>
            <span class="dir-name">20200319</span>
            <span class="dir-item-num">(10)</span>
          </li>
          <li class="medias-li null" @click="innerVisible=true">
            <i class="el-icon-folder"></i>
            <span class="dir-name">20200329</span>
            <span class="dir-item-num">(880)</span>
          </li>
        </ul>
        <el-dialog
          width="70%"
          title="20200329"
          :visible.sync="innerVisible"
          append-to-body>
        </el-dialog>
      </Card>
  </div>
</template>

<script>
import Card from '@/components/Card';
export default {
  components:{
    Card
  },
  data(){
    return{
      outerVisible:true,
      innerVisible:false,
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
</style>