<template>
  <div class="joker-page-product-shop">
    <SearchForm @search="search" :config="searchConfig" :header="header">
    </SearchForm>
    <div class="mb-20"/>
    <Container>
      <Table :config="tableConfig" :tableList="tableList">
        <template slot-scope="row" slot="shopFrom">
          {{form.find(item=>row.scope.data.shopFrom == item.value)['label']}}
        </template>
        <template slot-scope="row" slot="createTime">
          {{$timer(row.scope.data.createTime)}}
        </template>
        <template slot-scope="row" slot="set">
          <span class="set-text icon-btn iconfont icon-qushuchakanshuxing" @click="view(row.scope.data,row.scope.index)"></span>
          <span class="set-text color-red icon-btn iconfont icon-shanchu" @click="remove(row.scope.data)"></span>
        </template>
      </Table>
    </Container>
    <el-dialog   
      :visible.sync="dialog.dialog"
      width="800px"
      top="5vh">
      <Card :title="''+currentData.id" class="set-currentshop">
        <div class="joker-form">
          <div class="joker-form-item">
            <div class="joker-form-item-label">店铺名称：</div>
            <div class="joker-form-item-content">
              <el-input v-model="currentData.fromShopName"/>
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
export default {
  methods:{
    search(from){
      this.header = from;
    },
    // 获取店铺列表
    getData(){
      const res = this.$store.state.product.shopList;
      console.log(res);
      if(res.code==200){
        this.tableList = [...res.data];
      }
    },
    // 查看详情
    view(item,index){
      this.dialog.dialog = true;
      this.dialog.edit = true;
      this.currentData = {...item};
    },
    // 保存
    save(){
      const INDEX = this.tableList.findIndex(item=>item.id == this.currentData.id);
      // 这里保存我用store模拟 场景自己定义
      this.tableList[INDEX] = {...this.currentData};
      console.log(this.tableList[INDEX]);
      this.$store.dispatch('changeProductShop',this.tableList);
      this.dialog.dialog = false;
      this.dialog.edit = false;
      this.dialog.add = false;
      const res = this.$store.state.product.shopList;
      this.getData();
    },
    remove(row){
      const INDEX = this.tableList.findIndex(item=>item.id == row.id);
      this.$confirm('是否删除该店铺?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableList.splice(INDEX,1);
        this.notify(`您手滑删掉了<span class="color-red">[ ${row.id} ]</span>`,'success','我的天！','好样的');
      }).catch(() => {
        this.notify('您点了取消');          
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
      currentData:{},
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