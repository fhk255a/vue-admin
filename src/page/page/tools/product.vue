<template>
  <div class="h5-page-tools-title">
    <el-tabs type="border-card">
      <el-tab-pane label="基本配置">
        <div class="joker-form">
          <Item title="当前组件ID：">{{currentData.id}}</Item>
          <Item title="楼层标题：">
            <el-input v-model="currentData.title" @change="changeInput()"/>
          </Item>
          <Item title="是否显示标题：">
            <el-radio v-model="currentData.isShowTitle" :label="true" @change="update()">显示</el-radio>
            <el-radio v-model="currentData.isShowTitle" :label="false" @change="update()">隐藏</el-radio>
          </Item>
          <Item title="文本颜色：">
            <el-color-picker v-model="currentData.color" @change="changeInput()"></el-color-picker>
          </Item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="内容配置">
        <div class="joker-form">
          <Item title="商品布局：">
            <el-radio v-model="currentData.itemType" @change="changeInput()" label="50%">一行2个</el-radio>
            <el-radio v-model="currentData.itemType" @change="changeInput()" label="33.3%">一行3个</el-radio>
          </Item>
          <Item title="显示名称：">
            <el-radio v-model="currentData.showTitle" @change="changeInput()" label="1">是</el-radio>
            <el-radio v-model="currentData.showTitle" @change="changeInput()" label="0">否</el-radio>
          </Item>
          <Item title="显示备注：">
            <el-radio v-model="currentData.showRemark" @change="changeInput()" label="1">是</el-radio>
            <el-radio v-model="currentData.showRemark" @change="changeInput()" label="0">否</el-radio>
          </Item>
          <Item title="显示价格：">
            <el-radio v-model="currentData.showPrice" @change="changeInput()" label="1">是</el-radio>
            <el-radio v-model="currentData.showPrice" @change="changeInput()" label="0">否</el-radio>
          </Item>
          <Item title="显示按钮：">
            <el-radio v-model="currentData.showBtn" @change="changeInput()" label="1">是</el-radio>
            <el-radio v-model="currentData.showBtn" @change="changeInput()" label="0">否</el-radio>
          </Item>
          <Item title="商品："></Item>
          <Item className="w100">
            <ul class="product-list">
              <li :key="index" class="product-list-item" v-for="(item,index) in currentData.data">
                <el-button type="danger" class="delete-btn" @click="remove(index)">删除</el-button>
                <div class="item-body">
                  <div>
                    <img width="80px" height="80px" v-if="item.mainImage" :src="item.mainImage" alt="" >
                    <!-- <span class="iconfont icon-shuanchu" >删除</span> -->
                    <Upload @success="success" :index="index" :data="item.mainImage" @remove="item.mainImage=''"></Upload>
                  </div>
                </div>
                <Item title="商品名称：" width="120px">
                  <el-input v-model="item.title_zh" @change="changeRemark()"/>
                </Item>
                <Item title="售价：" width="120px">
                  <el-input v-model="item.priceRange" @change="changeRemark()"/>
                </Item>
                <Item title="跳转链接：" width="120px">
                  <el-input v-model="item.link" @change="changeRemark()"/>
                </Item>
                <Item title="备注：" width="120px">
                  <el-input v-model="item.remark" @change="changeRemark()"/>
                </Item>
              </li>
              <li class="product-list-add" @click="dialog=true">
                <i class="el-icon-plus" />
              </li>
            </ul>
          </Item>
        </div>
      </el-tab-pane>
    </el-tabs>
    <Dialog :show="dialog" title="商品列表" @close="close" width="80%">
      <el-table
        height="70vh"
        ref="productTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="id" label="商品ID" width="100px"></el-table-column>
        <el-table-column prop="mainImage" label="商品图片" width="100px">
          <template slot-scope="row">
            <img :src="row.row.mainImage" width="80px" height="80px" alt="">
          </template>
        </el-table-column>
        <el-table-column width="200px" prop="title_th" label="商品标题"></el-table-column>
        <el-table-column prop="status" label="商品状态">
          <template slot-scope="row">
            <el-switch v-model="row.row.status"/>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer-btn">
        <el-button @click="add">确认</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Upload from '@/components/Upload';
import Dialog from '@/components/Dialog';
import Media from '@/components/Media';
import Item from '@/components/Item';
export default {
  props:['component'],
  data(){
    return{
      dialog:false,
      tableData:[],
    }
  },
  methods:{
    successUpload(data){
      console.log(data);
    },
    changeInput(e){
      this.update();
    },
    success(data){
      console.log(data);
      if(data.code == 200){
        this.currentData.data[data.index].mainImage = data.data;
      }
      console.log(this.currentData.data[data.index].mainImage)
    },
    changeRemark(e){
      console.log(e);
    },
    remove(index) {
      this.currentData.data.splice(index,1);
    },
    update(){
      this.$emit('update',this.currentData);
    },
    close(){
      this.dialog = false;
      this.$refs['productTable'].clearSelection();
    },
    // 添加商品
    add(){
      let res = this.$refs['productTable'].selection;
      res.forEach(item=>{
        if(this.component.data.findIndex(it=>it.id == item.id)==-1){
          this.currentData.data.push({
            mainImage:item.mainImage,
            title_zh:item.title_zh,
            id:item.id,
            link:'#',
            remark:item.remark,
            priceRange:item.priceRange
          });
        }
      });
      this.close();
    }
  },
  computed:{
    currentData(){
      return this.$store.state.page.compData;
    }
  },
  mounted(){
    this.tableData = this.$store.state.product.list.data.items.map(item=>{
      item.status = item.status == 1? true:false;
      return item;
    })
  },
  components:{
    Dialog,
    Upload,
    Media,
    Item
  }
}
</script>

<style lang="scss">
.h5-page-tools-title{
  .w100{
    .joker-form-item-label{
      text-align: right;
      padding-right: 10px;
    }
  }
  .font{
    .joker-form-item-label{
      width: 60px;
      min-width: 50px;
    }
  }
  .w100{
    .joker-form-item-content{
      width: 100%;
    }
  }
  .product-list{
    flex-wrap: wrap;
    display: flex;
    .product-list-item{
      width: 100%;
      position: relative;
      margin-right: 8px;
      .delete-btn{
        position: absolute;
        right: 10px;
      }
      .item-body{
        display: flex;
        align-items: center;
      }
      .item-remark{
        font-size: 12px;
      } 
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #eee;
      .el-input{
        display: block;
      }
    } 
    .product-list-add{
      border: 1px solid #eee;
      padding: 30px;
      cursor: pointer;
    }
  }
  .footer-btn{
    margin-top: 10px;
  }
}
</style>