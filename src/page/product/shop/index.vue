<template>
  <div class="joker-page-product-shop">
    <SearchForm @search="search" :config="searchConfig" :header="header">
    </SearchForm>
    <div class="mb-20"/>
    <Container>
      <el-button @click="add()" v-if="isPass('product::shop::add')"><i class="iconfont icon-tianjia" style="margin-right:10px"></i>添加</el-button>
      <Table :config="tableConfig" :tableList="tableList">
        <template slot-scope="row" slot="shopFrom">
          {{row.scope.data.shopFrom?form.find(item=>row.scope.data.shopFrom == item.value)['label']:''}}
        </template>
        <template slot-scope="row" slot="logoUrl">
          <div style="width:60px;height:60px">
            <img :src="row.scope.data.logoUrl" @click="$store.dispatch('imgDialog',{status:true,img:row.scope.data.logoUrl})" class="img" alt="">
          </div>
        </template>
        <template slot-scope="row" slot="createTime">
          {{$timer(row.scope.data.createTime)}}
        </template>
        <template slot-scope="row" slot="set">
          <span v-if="isPass('product::shop::edit')" class="set-text icon-btn iconfont icon-qushuchakanshuxing" @click="view(row.scope.data,row.scope.index)"></span>
          <span v-if="isPass('product::shop::remove')" class="set-text color-red icon-btn iconfont icon-shanchu" @click="remove(row.scope.data)"></span>
        </template>
      </Table>
    </Container>
    <el-dialog   
      :visible.sync="dialog.dialog"
      width="800px"
      top="5vh">
      <Card :title="dialog.edit?''+currentData.id:'添加店铺'" class="set-currentshop">
        <div class="joker-form">
          <div class="joker-form-item" v-if="dialog.add">
            <div class="joker-form-item-label">店铺编号：</div>
            <div class="joker-form-item-content">
              <el-input v-model="currentData.id" ref="addShopIdInput"/>
              <span class="color-red" style="font-size:12px">商品ID不能重复且空</span>
            </div>
          </div>
          <div class="joker-form-item">
            <div class="joker-form-item-label">店铺名称：</div>
            <div class="joker-form-item-content">
              <el-input v-model="currentData.fromShopName" ref="fromShopName"/>
              <span class="color-red" style="font-size:12px">商品名称不能为空</span>
            </div>
          </div>
          <div class="joker-form-item">
            <div class="joker-form-item-label">店铺来源：</div>
            <div class="joker-form-item-content">
              <el-select v-model="currentData.shopFrom">
                <el-option 
                  :label="item.label" 
                  :value="item.value" 
                  :key="index" 
                  v-for="(item,index) in form"></el-option>
              </el-select>
            </div>
          </div>
          <div class="joker-form-item">
            <div class="joker-form-item-label">LOGO：</div>
            <div class="joker-form-item-content">
              <el-input v-model="currentData.logoUrl"/>
            </div>
          </div>
          <div class="joker-form-item" v-if="!dialog.add">
            <div class="joker-form-item-label">入库时间：</div>
            <div class="joker-form-item-content">
              {{$timer(currentData.createTime)}}
            </div>
          </div>
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
import Card from '@/components/Card';
import Table from '@/components/Table';
import Container from '@/components/Container';
import SearchForm from '@/components/SearchForm';
import isPass from '@/lib/esss';
export default {
  mixins:[isPass],
  methods:{
    search(from){
      this.header = from;
    },
    // 获取店铺列表
    getData(){
      const res = this.$store.state.product.shopList;
      if(res.code==200){
        this.tableList = res.data.map(item=>{
          item.logoUrl = !item.logoUrl?'http://118.24.39.97/joker.jpg':item.logoUrl;
          return item;
        });
      }
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
        "id": '',
        "shopFrom": "",
        "fromShopName": "",
        "shopTag": "",
        "logoUrl": "",
        "score": 0,
        "createTime": 0,
        "updateTime": 0,
        "productNum": 0,
        "shopTags": [],
      };
    },
    // 保存
    save(){
      // 保存
      if(this.currentData.id==''){
        this.$message.error('添加失败，ID不能为空');
        this.$refs.addShopIdInput.focus();
        return;
      }
      if(this.currentData.fromShopName==''){
        this.$message.error('添加失败，名称不能为空');
        this.$refs.fromShopName.focus();
        return;
      }
      if(this.dialog.edit){
        const INDEX = this.tableList.findIndex(item=>item.id == this.currentData.id);
        this.tableList[INDEX] = {...this.currentData};
        this.$store.dispatch('changeProductShop',this.tableList);
        this.dialog.dialog = false;
        this.dialog.edit = false;
        this.dialog.add = false;
        this.notify(`您手滑保存了<span class="color-red"> [ ${this.currentData.id} ] </span>`,'success','我的天！',' ');
        this.getData();
      }
      // 创建
      else{
        if(this.tableList.findIndex(item=>item.id == this.currentData.id)==-1){
          this.tableList.unshift({
            ...this.currentData,
            createTime:new Date().getTime()
          });
          this.$store.dispatch('changeProductShop',this.tableList);
          this.dialog.dialog = false;
          this.dialog.edit = false;
          this.dialog.add = false;
          this.notify(`您手滑创建了<span class="color-red"> [ ${this.currentData.id} ] </span>`,'success','创建成功',' ');
          this.getData();
        }else{
          this.$message.error('添加失败，该ID已经存在');
          this.$refs.addShopIdInput.focus();
          return;
        }
      }
      // 这里保存我用store模拟 场景自己定义
    },
    remove(row){
      const INDEX = this.tableList.findIndex(item=>item.id == row.id);
      this.$confirm('是否删除该店铺?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableList.splice(INDEX,1);
        this.notify(`您手滑删掉了<span class="color-red"> [ ${row.id} ] </span>`,'error','我的天！',' ');
      }).catch(() => {
        this.$message.info('您点了取消');          
      });
      this.getData();
    }
  },
  mounted(){
    this.getData();
  },
  data(){
    return{
      form:[
        {
          label:'天猫',
          value:'tmall',
        },
        {
          label:'淘宝',
          value:'taobao',
        },
        {
          label:'阿里巴巴',
          value:'1688',
        },
        {
          label:'NOME',
          value:'nome',
        },
      ],
      tableList:[], // 店铺列表
      // 搜索配置
      searchConfig:[
        {
          label:'店铺名称',
          value:'fromShopName',
          type:'input'
        },
        {
          label:'店铺来源',
          value:'shopFrom',
          type:'select',
          data:[
            {
              label:'全部',
              value:'',
            },
            {
              label:'天猫',
              value:'tmall',
            },
            {
              label:'淘宝',
              value:'taobao',
            },
            {
              label:'阿里巴巴',
              value:'1688',
            },
            {
              label:'NOME',
              value:'nome',
            },
          ]
        },
        {
          label:'入库时间',
          value:'createTime',
          type:'input'
        }
      ],
      // 搜索参数
      header:{
        fromShopName:'',
        shopFrom:'',
        createTime:''
      },
      // 表格配置
      tableConfig:[
        {
          label:'ID',
          value:'id',
        },
        {
          label:'店铺名称',
          value:'fromShopName',
        },
        {
          label:'LOGO',
          value:'logoUrl',
          set:true
        },
        {
          label:'店铺来源',
          value:'shopFrom',
          set:true
        },
        {
          label:'入库时间',
          value:'createTime',
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
        "id": '',
        "shopFrom": "",
        "fromShopName": "",
        "shopTag": " ",
        "logoUrl": "",
        "score": 0,
        "createTime": 0,
        "updateTime": 0,
        "productNum": 0,
        "shopTags": [],
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
    SearchForm,
    Container
  }
}
</script>

<style lang="scss">
#app .set-currentshop {
  .joker-form{
    .joker-form-item{
      width: 100%;
    }
  }
  .footer{
    border-top:1px solid #eee;
    padding-top:10px;
    text-align: right;
  }
}
</style>