<template>
  <div class="h5-page-tools-title">
    <el-tabs type="border-card">
      <el-tab-pane label="基本配置">
        <div class="joker-form">
          <div class="joker-form-item w100">
            <div class="joker-form-item-label">楼层标题：</div>
            <div class="joker-form-item-content">
              <el-input v-model="currentData.title" @change="changeInput()"/>
            </div>
          </div>
          <div class="joker-form-item w100">
            <div class="joker-form-item-label">文本颜色</div>
            <div class="joker-form-item-content">
              <el-color-picker v-model="currentData.color" @change="changeInput()"></el-color-picker>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="内容配置">
        <div class="joker-form">
          <div class="joker-form-item w100">
            <div class="joker-form-item-label">格局</div>
            <div class="joker-form-item-content">
              <el-radio v-model="currentData.itemType" @change="changeInput()" label="50%">一行2个</el-radio>
              <el-radio v-model="currentData.itemType" @change="changeInput()" label="33.3%">一行3个</el-radio>
            </div>
          </div>
          <div class="joker-form-item w100">
            <div class="joker-form-item-label">显示名称</div>
            <div class="joker-form-item-content">
              <el-radio v-model="currentData.showTitle" @change="changeInput()" label="1">是</el-radio>
              <el-radio v-model="currentData.showTitle" @change="changeInput()" label="0">否</el-radio>
            </div>
          </div>
          <div class="joker-form-item w100">
            <div class="joker-form-item-label">显示备注</div>
            <div class="joker-form-item-content">
              <el-radio v-model="currentData.showRemark" @change="changeInput()" label="1">是</el-radio>
              <el-radio v-model="currentData.showRemark" @change="changeInput()" label="0">否</el-radio>
            </div>
          </div>
          <div class="joker-form-item w100">
            <div class="joker-form-item-label">显示价格</div>
            <div class="joker-form-item-content">
              <el-radio v-model="currentData.showPrice" @change="changeInput()" label="1">是</el-radio>
              <el-radio v-model="currentData.showPrice" @change="changeInput()" label="0">否</el-radio>
            </div>
          </div>
          <div class="joker-form-item w100">
            <div class="joker-form-item-label">显示按钮</div>
            <div class="joker-form-item-content">
              <el-radio v-model="currentData.showBtn" @change="changeInput()" label="1">是</el-radio>
              <el-radio v-model="currentData.showBtn" @change="changeInput()" label="0">否</el-radio>
            </div>
          </div>
          <div class="joker-form-item w100">
            <div class="joker-form-item-label">商品</div>
            <div class="joker-form-item-content">
              <ul class="product-list">
                <li :key="index" class="product-list-item" v-for="(item,index) in currentData.data">
                  <div>
                    <img width="80px" height="80px" :src="item.mainImage" alt="">
                  </div>
                  {{item.remark}}
                  <el-input v-model="item.remark" @change="changeRemark()"/>
                  <span class="iconfont icon-shanchu1" @click="remove(index)"></span>
                </li>
                <li class="product-list-add" @click="dialog=true">
                  <i class="el-icon-plus" />
                </li>
              </ul>
            </div>
          </div>
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
import Dialog from '@/components/Dialog';
export default {
  props:['component'],
  data(){
    return{
      currentData:{
        data:{
          content:'',
          background:'',
          color:'',
        },
      },
      dialog:false,
      tableData:[]
      // currentComponent:this.$store.state.page.components[this.$store.state.page.componentIndex]
    }
  },
  methods:{
    changeInput(e){
      this.update();
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
    },
    // 添加商品
    add(){
      let res = this.$refs['productTable'].selection;
      res.forEach(item=>{
        if(this.component.data.findIndex(it=>it.id == item.id)==-1){
          this.currentData.data.push(item);
        }
      });
      this.close();
    }
  },
  mounted(){
    this.currentData = {...this.$store.state.page.compData};
    this.tableData = this.$store.state.product.list.data.items.map(item=>{
      item.remark = '这是默认商品备注';
      item.status = item.status == 1? true:false;
      return item;
    })
  },
  components:{
    Dialog
  }
}
</script>

<style lang="scss">
.h5-page-tools-title{
  .w100{
    .joker-form-item-label{
      width: 100px;
      min-width: 100px;
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
  .product-list{
    flex-wrap: wrap;
    display: flex;
    .product-list-item{
      margin-right: 8px;
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #eee;
      .el-input{
        margin-left: 10px;
      }
      .icon-shanchu1{
        margin-left: 10px;
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