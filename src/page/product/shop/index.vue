<template>
  <div class="joker-page-product-shop">
    <SearchForm @search="search" :config="searchConfig" :header="header">
    </SearchForm>
    <div class="mb-20"/>
    <Container>
      <el-button @click="add()" v-if="isPass('product::shop::add')"><i class="iconfont icon-tianjia" style="margin-right:10px"></i>添加</el-button>
      <Table :config="tableConfig" :tableList="tableList">
        <template slot-scope="row" slot="logo">
          <div style="width:60px;height:60px">
            <img :src="row.scope.data.logo" 
              @click="$store.dispatch('imgDialog',{status:true,img:row.scope.data.logo})" 
              class="img" alt="">
          </div>
        </template>
        <template slot-scope="row" slot="createTime">
          {{$timer(row.scope.data.createTime)}}
        </template>
        <template slot-scope="row" slot="updateTime">
          {{$timer(row.scope.data.updateTime)}}
        </template>
        <template slot-scope="row" slot="set">
          <span v-if="isPass('product::shop::edit')" class="set-text icon-btn iconfont icon-qushuchakanshuxing" @click="view(row.scope.data,row.scope.index)"></span>
          <span v-if="isPass('product::shop::remove')" class="set-text color-red icon-btn iconfont icon-shanchu" @click="remove(row.scope.data)"></span>
        </template>
      </Table>
      <Page @changePage="changePage" :page="page" align="right"/>
    </Container>
    <el-dialog   
      :visible.sync="dialog.dialog"
      width="800px"
      top="5vh">
      <Card :title="dialog.edit?''+currentData.name:'添加店铺'" class="set-currentshop">
        <div class="joker-form">
          <Item title="店铺编号：" width="80px">
            <span class="color-red" style="font-size:12px">{{currentData.id?currentData.id:'系统生成'}}</span>
          </Item>
          <Item title="店铺名称：" width="80px">
            <el-input v-model="currentData.name" ref="addShopIdInput"/>
            <span class="color-red" style="font-size:12px">商品名称不能为空</span>
          </Item>
          <Item title="店铺来源：" width="80px">
            <el-select v-model="currentData.from">
              <el-option 
                :label="item.label" 
                :value="item.value" 
                :key="index" 
                v-for="(item,index) in searchConfig[1].data"></el-option>
            </el-select>
          </Item>
          <Item title="LOGO：" width="80px">
            <div v-if="currentData.logo" class="logo">
              <img class="img" :src="currentData.logo"/>
              <span @click="currentData.logo = ''" class="set-text">删除图片</span>
            </div>
            <Upload v-else @success="uoloadSuccess" path="shopLogo"></Upload>
          </Item>
          <Item title="入库时间：" v-if="!dialog.add" width="80px">
            {{$timer(currentData.createTime)}}
          </Item>
        </div>
        <div class="footer">
          <el-button @click="save">保存</el-button>
        </div>
      </Card>
    </el-dialog>
  </div>
</template>

<script>
import Page from '@/components/Page';
import Upload from '@/components/Upload';
import Card from '@/components/Card';
import Table from '@/components/Table';
import Container from '@/components/Container';
import SearchForm from '@/components/SearchForm';
import Item from '@/components/Item';
import isPass from '@/lib/esss';
import {KEY} from '@/api/config';
import {SHOP} from '@/api/product';
export default {
  mixins:[isPass],
  methods:{
    search(from){
      this.header = from;
      this.getData();
    },
    uoloadSuccess(res){
      if(res.code == 200){
        this.currentData.logo = res.data;
      }
    },
    changePage(page){
      this.page = page;
      this.getData();
    },
    // 获取店铺列表
    getData(){
      const params = {
        id:this.header.id,
        name:this.header.name,
        from:this.header.from,
        current:this.page.current,
        size:this.page.size
      }
      this.$store.dispatch('loading',true);
      SHOP.list(params).then(res=>{
        if(res.code==200){
          this.tableList = res.data.data.map(item=>{
            const Index = this.searchConfig[1].data.findIndex(it=>it.value == item.from);
            item.from = Index==-1?item.from:this.searchConfig[1].data[Index].label;
            return item;
          });
          this.page.total = res.data.total;
        }
      }).catch(err=>{}).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
    // 查看详情
    view(item,index){
      this.dialog.dialog = true;
      this.dialog.edit = true;
      this.dialog.add = false;
      this.currentData = {...item};
    },
    // 添加
    add(){
      this.dialog.dialog = true;
      this.dialog.add = true;
      this.dialog.edit = false;
      this.currentData = {
        "id": null,
        "from": "",
        "name": "",
        "status": true,
        "logo": "",
        "score": 0,
        "createTime": '',
        "productCount": 0,
      };
    },
    // 保存
    save(){
      // 保存
      if(this.currentData.fromShopName==''){
        this.$message.error('添加失败，名称不能为空');
        this.$refs.fromShopName.focus();
        return;
      }
      // 创建
      else{
        this.$store.dispatch('loading',true);
        SHOP.save(this.currentData).then(res=>{
          if(res.code == 200){
            this.dialog.dialog = false;
            this.dialog.edit = false;
            this.dialog.add = false;
            this.notify(`<span class="color-red"> [ ${res.msg} ] </span>`,'OH~','success');
            this.getData();
          }else{
            this.notify(`<span class="color-red"> [ ${res.msg} ] </span>`,'EM~','error');
          }
        }).finally(()=>{
          this.$store.dispatch('loading',false);
        })
      }
      // 这里保存我用store模拟 场景自己定义
    },
    remove(row){
      this.$confirm('是否删除该店铺?该店铺下得商品都会归为ID为1得店铺', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('loading',true);
        SHOP.delete(row.id).then(res=>{
          if(res.code==200){
            this.notify(`<span class="color-blue"> [ ${res.msg} ] </span>`,'OH~','success');
            this.getData();
          }else{
            this.notify(`<span class="color-red"> [ ${res.msg} ] </span>`,'EM~','error');
          }
        }).catch(err=>{
          this.notify(err);
        }).finally(()=>{
          this.$store.dispatch('loading',false);
        })
      }).catch(() => {
        this.$message.info('您点了取消');          
      });
      this.getData();
    }
  },
  mounted(){
    KEY.get('PRODUCT_FROM').then(res=>{
      if(res.code==200){
        this.searchConfig[1].data = res.data;
        this.getData();
      }
    })
    KEY.get('STATUS').then(res=>{
      if(res.code==200){
        this.searchConfig[2].data = res.data;
      }
    })
  },
  data(){
    return{
      tableList:[], // 店铺列表
      // 搜索配置
      searchConfig:[
        {
          label:'店铺编号',
          key:'id',
          type:'input'
        },
        {
          label:'店铺名称',
          key:'name',
          type:'input'
        },
        {
          label:'店铺来源',
          key:'from',
          type:'select',
          data:[]
        },
        {
          label:'店铺状态',
          key:'status',
          type:'select',
          data:[],
        }
      ],
      // 搜索参数
      header:{
        name:'',
        from:'',
        id:'',
        status:'',
      },
      page:{
        current:1,
        size:10,
        total:0
      },
      // 表格配置
      tableConfig:[
        {
          label:'ID',
          value:'id',
        },
        {
          label:'店铺名称',
          value:'name',
        },
        {
          label:'LOGO',
          value:'logo',
          set:true
        },
        {
          label:'店铺来源',
          value:'from',
        },
        {
          label:'入库时间',
          value:'createTime',
          set:true
        },
        {
          label:'更新时间',
          value:'updateTime',
          set:true
        },
        {
          label:'操作',
          value:'set',
          set:true
        },
      ],
      // 当前弹框的内容 
      currentData:{
        "id": null,
        "from": "",
        "name": "",
        "status": true,
        "logo": "",
        "score": 0,
        "createTime": '',
        "productCount": 0,
      },
      // 编辑
      dialog:{
        dialog:false,
        edit:false,
        add:false,
      }
    }
  },
  components:{
    Table,
    Card,
    Page,
    Item,
    SearchForm,
    Container,
    Upload
  }
}
</script>

<style lang="scss">
#app .set-currentshop {
  .joker-form{
    .joker-form-item{
      width: 100%;
      .logo{
        img{
          width: 60px;
          height: 60px;
        }
      }
    }
  }
  .footer{
    border-top:1px solid #eee;
    padding-top:10px;
    text-align: right;
  }
}
</style>