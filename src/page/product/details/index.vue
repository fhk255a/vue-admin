<template>
  <div class="joker-page-product-details">
<!-- 商品基本信息 -->
    <div class="df">
      <Card title="商品主图" class="j-product-img">
        <div class="j-product-details-main-image">
          <div class="product-img">
            <img class="img" :src="mainImage" alt="">
            <span @click="setMainImage" class="set-text">设置为主图</span>
          </div>
          <div class="product-list-box">
            <ul class="product-list" >
              <li v-if="productInfo.mainImage">
                <img @click="mainImage = productInfo.mainImage" class="img" :src="productInfo.mainImage" alt="">
              </li>
              <li @click="mainImage = item" v-for="(item,index) in productInfo.images" :key="index" class="product-image-item">
                <img :src="item.image" class="img" alt="" v-if="item.image">
                <img :src="item" class="img" alt="" v-else>
                <span class="delete-image el-icon-error" @click="deleteImage(index)"></span>
              </li>
              <li>
                <Upload @success="uploadSuccess" :pid="productInfo.id?productInfo.id+'':'default'"></Upload>
              </li>
            </ul>
          </div>
        </div>
      </Card>
      <Card title="商品基础信息" class="j-product-base-info">
        <div class="joker-form">
          <Item title="标题" width="80px">
            <el-input style="width:500px" v-model="productInfo.title"/>
          </Item>
          <Item title="副标题" width="80px">
            <el-input style="width:500px" v-model="productInfo.subTitle"/>
          </Item>
          <Item title="来源链接" width="80px">
            <el-input style="width:500px" v-model="productInfo.fromUrl"/>
          </Item>
          <Item title="进货价" width="80px">
            <el-input v-model="productInfo.inPrice"/>
          </Item>
          <Item title="销售价" width="80px">
            <el-input v-model="productInfo.outPrice"/>
          </Item>
          <Item title="店铺" width="80px">
            <div style="line-height:40px">
              <span>{{productInfo.shopName}}</span>
              <span class="set-text" @click="changeShopDialog">修改</span>
            </div>
          </Item>
          <Item title="分类" width="80px">
            <div v-if="!categoryDialog" style="line-height:40px">
              <span>{{productInfo.categoryName}}</span>
              <span class="set-text" @click="getCategory">修改</span>
            </div>
            <el-cascader
              v-else
              v-model="productInfo.categoryId"
              :props="{value:'id',label:'label',children:'children'}"
              :options="category"></el-cascader>
          </Item>
          <Item title="入库时间" width="80px" v-if="$route.params.id!='add'">
            <span style="line-height:30px">{{$timer(productInfo.createTime)}}</span>
          </Item>
          <Item title="更新时间" width="80px" v-if="$route.params.id!='add'">
            <span style="line-height:30px">{{$timer(productInfo.updateTime)}}</span>
          </Item>
          <li class="joker-form-item" v-for="(item,index) in productInfo.attrList" :key="index">
            <div class="joker-form-item-label">{{item.key}}</div>
            <div class="joker-form-item-content attr-list">
              <div v-for="(it,i) in item" :key="i" class="joker-product-info-attr">
                <template v-if="it.imgUrl">
                  <img :class="['img',mainImage == it.imgUrl?'active':'']" @click="mainImage = it.imgUrl" :src="it.imgUrl" :alt="it.key">
                </template>
                <template v-else>
                  <el-tag type="info">{{it.key}}</el-tag>
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
        <el-button @click="addSku">新增SKU</el-button>
        <el-table :data="productInfo.skuList">
          <el-table-column label="SKU ID" prop="id"></el-table-column>
          <el-table-column label="SKU 名称" prop="label">
            <template slot-scope="row">
              <el-input v-model="row.row.label"/>
            </template>
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="row">
              <div style="width:80px;height:80px" class="sku-item">
                <img class="img" :src="row.row.imgUrl" alt="" 
                @click="$store.dispatch('imgDialog',{status:true,img:row.row.imgUrl})">
                <span @click="openSku(row.$index)" class="set-text">选择图片</span>
                <Dialog :show="skuDialog" @close="closeSku">
                  <ul class="sku-item-list">
                    <li v-for="(item,index) in productInfo.images" 
                      class="sku-item-img"
                      :key="`sku-${index}`" @click="selectSku(item)">
                      <img class="img" :src="item" alt="">
                    </li>
                  </ul>
                </Dialog>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="进货价">
            <template slot-scope="row">
              <el-input v-model="row.row.inPrice" :disabled="$route.params.id!='add'"/>
            </template>
          </el-table-column>
          <el-table-column label="销售价">
            <template slot-scope="row">
              <el-input v-model="row.row.outPrice"/>
            </template>
          </el-table-column>
          <el-table-column label="库存" prop="count" >
            <template slot-scope="row">
              <el-input v-model="row.row.count" type="number"/>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="row">
              <el-switch v-model="row.row.status" :disabled="!isPass('product::details::skuStatus')"/>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="row">
              <span class="set-text" @click="deleteSku(row.row,row.$index)">删除</span>
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
          <Item :title="item.key" 
            v-for="(item,index) in productInfo.propList" :key="index">
            {{item.value}}
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
      <div class="desc" v-html="productInfo.desc"></div>
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
                <el-input v-model="row.row.key" :ref="'props-'+row.$index"/>
              </template>
            </el-table-column>
            <el-table-column label="内容">
              <template slot-scope="row">
                <el-input v-model="row.row.value"/>
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
<!-- 店铺区块 -->
    <Dialog :show="shopShowDialog" width="60%">
      <div class="joker-form shop-form">
        <Item title="店铺ID">
          <el-input v-model="shopHeader.id"/>
        </Item>
        <Item title="店铺名称">
          <el-input v-model="shopHeader.name"/>
        </Item>
        <Item title="店铺来源">
          <el-input v-model="shopHeader.from"/>
        </Item>
        <Item className="w100">
          <el-button @click="getShopList">搜索</el-button>
        </Item>
      </div>
      <el-table ref="multipleTable" :data="shopList" max-height="500px">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column label="店铺名称" prop="name"></el-table-column>
        <el-table-column label="评分" prop="score"></el-table-column>
        <el-table-column label="logo"></el-table-column>
      </el-table>
      <Page @changePage="changePage" :page="page" align="right"/>
      <el-button @click="saveShop">保存</el-button>
    </Dialog>
  </div>
</template>

<script>
import Index from './index.js';
export default Index;
</script>

<style lang="scss" scope>
#app .joker-page-product-details {
  .sku-item{
    >.img{
      width: 60px;
      height: 60px;
      display: block;
      border:1px solid #eee;
    }
  }
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
        position: relative;
        .set-text{
          left: 0;
          top:0;  
          position: absolute;
        }
      }
      .product-list-box{
        overflow-y:scroll;
        // 修改滚动条属性
        .product-list{
          display: flex;
          border:1px solid #eee;
          >li{
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
    .shop-form{
      >.joker-form-item{
        width: auto;
      }
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
  .product-image-item{
    position: relative;
    .delete-image{
      position: absolute;
      right: 0px;
      top: 0px;
      cursor: pointer;
      color: #fff;
    }
  }
}
.sku-item-list{
  overflow: hidden;
  .sku-item-img{
    width: 80px;
    cursor: pointer;
    height: 80px;
    float: left;
    border:1px solid #eee;
  }
}
</style>