<template>
  <div class="joker-page-product">
    <Search-form @search="search" ref="searchForm" :config="searchConfig" :header="header" :btns="true" >
      <template slot="btns" slot-scope="row">
        <div class="joker-form-item" >
          <el-button class="j-btn" @click="$refs.searchForm.search()">查询</el-button>
          <el-button @click="clear(row.scope)">清空</el-button>
        </div>
      </template>
    </Search-form>
    <div class="mb-20" />
    <Container>
      <Table ref="table" :tableList="tableList" :config="table" @get="getData">
        <!-- 图片 -->
        <template slot="mainImage" slot-scope="row">
          <div class="product-img">
            <img class="img" 
            @click="$store.dispatch('imgDialog',{status:true,img:row.scope.data.mainImage})" 
            :src="row.scope.data.mainImage" />
          </div>
        </template>
        <!-- 状态 -->
        <template slot="status" slot-scope="row">
          <div>
            <el-switch :disabled="!isPass('product::details::status')" @change="changeStatus(row.scope)" v-model="row.scope.data.status"></el-switch>
          </div>
        </template>
        <!-- 操作 -->
        <template slot="set" slot-scope="row">
          <div>
            <span class="icon-btn iconfont icon-bianjiqianbixieshuru" @click="view(row.scope.data)"></span>
            <span v-if="isPass('product::list::remove')" class="icon-btn iconfont icon-shanchu" @click="remove(row.scope)"></span>
            <span v-if="isPass('product::list::add')" class="icon-btn iconfont icon-qushuchakanshuxing" @click="set(row.scope.data)"></span>
          </div>
        </template>
      </Table>
    </Container>
    <div class="mb-20" />
    <Page @changePage="changePage" align="right"/>
  </div>
</template>

<script>
import Page from '@/components/Page';
import Table from '@/components/Table';
import Container from '@/components/Container';
import SearchForm from '@/components/SearchForm';
import isPass from '@/lib/esss';
export default {
  mixins:[isPass],
  components:{
    SearchForm,
    Container,
    Table,
    Page
  },
  mounted(){
    console.log(this.isPass);
    this.getList();
  },
  methods:{
    // 切换分页
    changePage(page){
      console.log(page);
    },
    // 获取商品列表
    getList(){
      // TODO 发请求 获取商品
      const res = this.$store.state.product.list;
      if(res.code == 200){
        this.tableList = res.data.items.map(item=>{
          item.status = item.status == 1 ? true : false;
          return item;
        });
      }
    },
    // 切换状态
    changeStatus(item){
      this.notify(`<span style="color:#070f14">[ ${item.data.id} ]</span>
       的状态改为 <span style="color:#409EFF">"${item.data.status}"</span>`);
    },
    search(from){
      this.header = from;
    },
    clear(data){
      this.header={
        id:'',
        status:'1',
        title:'',
      }
      this.notify(`<span style="color:#070f14">重置了搜索条件</span>`);
    },
    getData(row){
      this.row = row;
    },
    set(row){
      console.log('remove',row);
    },
    remove(row){
      this.$confirm(`是否删除<span style="color:#409EFF">[ ${row.data.id} ]</span>?`, '提示', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.notify(`<span style="color:#070f14">你手滑删除了商品 <span style="color:#409EFF">[${row.data.id}]</span></span>`);
        this.tableList.splice(row.index,1);
      }).catch(() => {
        this.notify('您点了取消');          
      });
      this.tableList[row.index]
    },
    view(row){
      this.$router.push({
        path:`/product/details/${row.id}`,
      })
    }
  },
  data(){
    return{
      tableList:[],
      header:{
        id:'',
        status:'1',
        title:'',
      },
      table:[
        {
          label:'ID',
          value:'id',
          width:100
        },
        {
          label:'商品图片',
          value:'mainImage',
          set:true,
          width:120
        },
        {
          label:'商品名称',
          value:'title_zh'
        },
        {
          label:'售价',
          value:'price_range_cn'
        },
        {
          label:'状态',
          value:'status',
          set:true,
        },
        {
          label:'创建时间',
          value:'create_time'
        },
        {
          label:'操作',
          set:true,
          value:'set',
        }
      ],
      searchConfig:[
        {
          label:'商品ID',
          type:'input',
          inputType:'number',
          key:'id',
        },
        {
          label:'商品名称',
          type:'input',
          key:'title',
        },
        {
          type:'select',    
          label:'状态',
          key:'status',
          data:[
            {
              label:'男',
              value:'1'
            },
            {
              label:'女',
              value:'0',
            }
          ]
        }
      ]
    }
  },
}
</script>

<style lang="scss">
.joker-page-product{
  .product-img{
    width: 80px;
    height: 80px;
  }
}
</style>