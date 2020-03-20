<template>
  <div class="joker-page-product-details">
<!-- 商品基本信息 -->
    <div class="df">
      <Card title="商品主图" class="j-product-img">
        <div class="j-product-details-main-image">
          <div class="product-img">
            <img class="img" :src="mainImage" alt="">
          </div>
          <div class="product-list-box">
            <ul class="product-list">
              <li>
                <img @click="mainImage = productInfo.mainImage" class="img" :src="productInfo.mainImage" alt="">
              </li>
              <li @click="mainImage = item" v-for="(item,index) in productDetails.images" :key="index">
                <img :src="item" class="img" alt="">
              </li>
            </ul>
          </div>
        </div>
      </Card>
      <Card title="商品基础信息" class="j-product-base-info">
        <div class="joker-form">
          <Item title="标题" width="80px">
            <el-input style="width:500px" v-model="productInfo.title_zh"/>
          </Item>
          <Item title="国际标题" width="80px">
            <el-input style="width:500px" v-model="productInfo.title"/>
          </Item>
          <Item title="进货价" width="80px">
            <el-input v-model="productInfo.purchaseRange" disabled/>
          </Item>
          <Item title="销售价" width="80px">
            <el-input v-model="productInfo.priceRange"/>
          </Item>
          <Item title="分类" width="80px">
            {{productInfo.baseCategoryName}}
          </Item>
          <Item title="入库时间" width="80px">
            {{productInfo.create_time}}
          </Item>
          <Item title="更新时间" width="80px">
            {{productInfo.update_time}}
          </Item>
          <li class="joker-form-item" v-for="(item,index) in attrList" :key="index">
            <div class="joker-form-item-label">{{item.attributeNameZH}}</div>
            <div class="joker-form-item-content attr-list">
              <div v-for="(it,i) in item.features" :key="i" class="joker-product-info-attr">
                <template v-if="it.imgUrl">
                  <img :class="['img',mainImage == it.imgUrl?'active':'']" @click="mainImage = it.imgUrl" :src="it.imgUrl" :alt="it.featureNameZH">
                </template>
                <template v-else>
                  <el-tag type="info">{{it.featureNameZH}}</el-tag>
                </template>
              </div>
            </div>
          </li>
        </div>
      </Card>
    </div>
<!-- SKU -->
    <div class="mb-20"/>
    <Card title="商品SKU">
      <div>
        <el-table :data="productDetails.skuList">
          <el-table-column label="SKU ID" prop="skuId"></el-table-column>
          <el-table-column label="SKU 名称">
            <template slot-scope="row">
              <span v-for="(item,index) in row.row.attrs" :key="index">
                {{index==row.row.attrs.length-1?item.featureNameZH:item.featureNameZH+'-'}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="row">
              <div style="width:80px;height:80px">
                <img class="img" :src="row.row.attrs[0].imgUrl" alt="" 
                @click="$store.dispatch('imgDialog',{status:true,img:row.row.attrs[0].imgUrl})">
              </div>
            </template>
          </el-table-column>
          <el-table-column label="进货价">
            <template slot-scope="row">
              <el-input v-model="row.row.pricesIn[0].price" disabled/>
            </template>
          </el-table-column>
          <el-table-column label="销售价">
            <template slot-scope="row">
              <el-input v-model="row.row.pricesOut[0].price"/>
            </template>
          </el-table-column>
          <el-table-column label="库存" prop="count" />
          <el-table-column label="状态">
            <template slot-scope="row">
              <el-switch v-model="row.row.status" :disabled="!isPass('product::details::skuStatus')"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </Card>
<!-- 商品简介 -->
    <div class="mb-20"/>
    <Card title="商品简介" class="j-product-shop">
      <template v-if="isPass('product::details::editJianJie')" slot="right">
        <div class="iconfont icon-shezhishedingpeizhichilun" @click="editOther"></div>
      </template>
      <div>
        <div class="joker-form">
          <Item :title="item.propKeyZH" 
            v-for="(item,index) in productDetails.propList" :key="index">
            {{item.propValue.propValueZH}}
          </Item>
        </div>
      </div>
    </Card>
<!-- 商品详情 -->
    <div class="mb-20"/>
    <Card title="商品详情页" class="j-product-details">
      <template slot="right" v-if="isPass('product::details::editDetails')" >
        <div class="iconfont icon-shezhishedingpeizhichilun" @click="editDetails"></div>
      </template>
      <div class="desc" v-html="productDetails.desc"></div>
    </Card>
<!-- 弹框 -->
    <el-dialog 
      :visible.sync="otherDialog"
      width="800px"
      top="5vh"
      >
      <Card title="编辑简介" class="edit-html-editor">
        <template slot="right">
          <el-button class="j-btn" @click="saveProps">保存</el-button>
        </template>
        <div class="edit-prop-list">
          <el-table :data="propList">
            <el-table-column label="编号" width="80px">
              <template slot-scope="row">{{row.$index+1}}</template>
            </el-table-column>
            <el-table-column label="名称">
              <template slot-scope="row">
                <el-input v-model="row.row.propKeyZH" :ref="'props-'+row.$index"/>
              </template>
            </el-table-column>
            <el-table-column label="内容">
              <template slot-scope="row">
                <el-input v-model="row.row.propValue.propValueZH"/>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60px">
              <template slot-scope="row">
                <span class="icon-shanchu iconfont" @click="removeProps(row.row)"></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-button @click="addProps">添加</el-button>
        </div>
      </Card>
    </el-dialog>
    <el-dialog 
      :visible.sync="editDialog"
      width="80%"
      top="5vh"
      >
      <Card title="编辑商品" class="edit-html-editor">
        <template slot="right">
          <el-button class="j-btn" @click="saveDesc">保存</el-button>
        </template>
        <Editor :content="htmlDesc" @update="updateHtml"/>
      </Card>
    </el-dialog>
    <div class="footer-btns">
      <el-button @click="saveProduct" v-if="isPass(('product::details::save'))" >保存</el-button>
    </div>
  </div>
</template>

<script>
import PRODUCT from '@/api/product';
import Card from '@/components/Card';
import Item from '@/components/Item';
import Editor from '@/components/Editor';
import productData from '@/store/data/product';
import isPass from '@/lib/esss';
export default {
  mixins:[isPass],
  methods:{
    // 获取商品详情
    getData(id){
      const info = productData.data.items.find(item=>item.id == id);
      PRODUCT.details(id).then(res=>{
        if(res.code == 200){
          this.productInfo = res.data;
          this.mainImage = res.data.mainImage;
          // 假数据
          const falseData = this.$store.state.product.details;
          this.productDetails = falseData.data.details;
          this.mainImage = this.productInfo.mainImage;
          this.skuList = falseData.data.details.skuList.map(item=>{
            item.status = item.status == 1 ? true : false;
            return item;
          });
          this.attrList = falseData.data.details.attributes;
          this.propList = falseData.data.details.propList;
          this.htmlDesc = falseData.data.details.desc;
          this.notify(`<span class="color-blue">你已进入商品详情页，除了基础信息，其他均为假数据</span>`,'提示','warning');
        }else{
          this.notify(`<span class="color-red">${res.msg}</span>`,'EMMMMM...','error');
        }
      }).catch(err=>{
        
      })
    },
    // 修改详情页
    editDetails(){
      this.editDialog = true;
      this.htmlDesc = this.productDetails.desc;
    },
    updateHtml(desc){
      this.htmlDesc = desc;
    },
    // 保存商品
    saveDesc(){
      this.$confirm('是否保存商品详情?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.productDetails.desc = this.htmlDesc;
        this.editDialog = false;
        this.notify(`<span class="color-red">您更改了商品详情.</span>`);
      }).catch(() => {
        this.notify('您点了取消');          
      });
    },
    // 编辑商品简介
    editOther(){
      this.otherDialog = true;
      this.propList = [...this.productDetails.propList];
    },
    // 保存简介
    saveProps(){
      this.$confirm('是否保存商品简介?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for(let i = 0 ; i < this.propList.length;i++){
          if(this.propList[i].propKeyZH == ''){
            this.$refs['props-'+i].focus();
            this.$message.error('简介名称不能为空');
            return;
          }
        }
        this.productDetails.propList = this.propList;
        this.otherDialog = false;
        this.notify(`<span class="color-red">您更改了商品简介.</span>`);
      }).catch(() => {
        this.notify('您点了取消');          
      });
    },
    // 删除简介
    removeProps(row){
      const INDEX = this.propList.findIndex(item=>{
        return (item.propValue.propValueZH==row.propValue.propValueZH && item.propKeyZH == row.propKeyZH)
      });
      if(INDEX != -1){
        this.propList.splice(INDEX,1);
      }
    },
    // 添加简介
    addProps(){
      this.propList.push({
        propValue:{
          propValueZH:''
        },
        propKeyZH:'',
      })
    },
    // 保存全部商品信息
    saveProduct(){
      let timer = null;
      this.$confirm('是否确定更改商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearTimeout(timer);
        this.$store.dispatch('changeProductDetails',this.productDetails);
        this.$store.dispatch('changeProductInfo',this.productDetails);
        this.notify(`您修改了<span class="color-blue">[ ${this.productInfo.id} ] </span>`,'success','修改成功','1秒后跳回列表');
        timer = setTimeout(()=>{
          this.$router.push('/product/list');
        },1000)
      }).catch(() => {
        this.notify('您点了取消');          
      });
    }
  },
  data(){
    return{
      productInfo:{},  // 商品基础信息
      productDetails:{},  //  商品详情
      mainImage:'', // 主图
      propList:[], // 简介列表
      skuList:[], // sku列表
      attrList:[], // 规格
      editDialog:false, // 编辑详情页
      otherDialog:false, // 修改简介页
      htmlDesc:'',// 商品详情页
    }
  },
  mounted(){
    this.getData(this.$route.params.id);
  },
  components:{
    Card,
    Editor,
    Item
  }
}
</script>

<style lang="scss">
#app .joker-page-product-details {
  .j-product-img{
    width: 440px;
    ::-webkit-scrollbar{height:5px;}
    ::-webkit-scrollbar-track{background-color: #fff;}
    ::-webkit-scrollbar-thumb{background-color: #070f14;}
    ::-webkit-scrollbar-thumb:hover {background-color: #070f14}
    ::-webkit-scrollbar-thumb:active {background-color: #070f14}
    .j-product-details-main-image{
      overflow: hidden;
      .product-img{
        width: 400px;
        height: 400px;
        overflow: hidden;
      }
      .product-list-box{
        overflow-y:scroll;
        // 修改滚动条属性
        .product-list{
          display: flex;
          border:1px solid #eee;
          li{
            width: 80px;
            height: 80px;
            border:1px solid #eee;
            margin:5px ;
            min-width: 80px;
          }
        }
      }
    }
  }
  .j-product-base-info{
    flex:1;
    margin-left: 20px;
    .joker-form-item{
      width: 100%;
    }
    .joker-form-item-label{
      width: 80px;
      text-align: right;
      margin-right: 20px;
    }
    .joker-form-item-content{
      input{
        color: #999;
      }
    }
    .attr-list{
      display: flex;
      align-items: center;
      align-content: center;
      .joker-product-info-attr{
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin: 0 5px;
        .img{
          border:1px solid #eee;
          opacity: 0.8;
        }
        .active{
          border-color:#070f14;
          opacity: 1;
        }
      }
    }
  }
  .j-product-shop{
    .joker-form-item{
      margin-right: 50px;
      min-width: 10%;
    }
  }
  .j-product-details{
    .iconfont{
      cursor: pointer;
    }
    .desc{
      max-height: 70vh;
      overflow-y: scroll;
      text-align: center;
    }
  }
  .edit-html-editor{
    text-align: center;
  }
  .joker-component-editor{
    .ql-editor{
      max-height: 60vh;
      overflow-y: scroll;
    }
  }
  .edit-prop-list{
    max-height: 50vh;
    overflow-y: scroll;
  }
  .footer-btns{
    position: fixed;
    right: 80px;
    top: 4px;
    z-index: 100;
    .el-button{
      background: #070f14;
      color: #fff;
      padding: 8px 20px;
    }
  }
}
</style>