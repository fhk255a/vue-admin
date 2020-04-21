import Page from '@/components/Page';
import Table from '@/components/Table';
import Container from '@/components/Container';
import SearchForm from '@/components/SearchForm';
import isPass from '@/lib/esss';
import PRODUCT from '@/api/product';
import {KEY} from '@/api/config';
export default {
  mixins:[isPass],
  components:{
    SearchForm,
    Container,
    Table,
    Page
  },
  mounted(){
    this.getList();
    KEY.get('PRODUCT_STATUS').then(res=>{
      if(res.code==200){
        this.searchConfig[2].data = res.data;
      }
    })
  },
  methods:{
    // 创建商品
    create(){
      this.$router.push('/product/details/add');
    },
    // 切换分页
    changePage(page){
      this.page = page;
      this.getList();
    },
    // 获取商品列表
    getList(){
      // TODO 发请求 获取商品
      let params = {
        current:this.page.current,
        size:this.page.size,
        id:this.header.id,
        status:this.header.status,
        title:this.header.title
      }
      this.$store.dispatch('loading',true);
      PRODUCT.list(params).then(res=>{
        if(res.code == 200){
          this.tableList = res.data.data.map(item=>{
            item.status = item.status==1?true:false;
            return item;
          });
          this.page.total = res.data.total;
        }
      }).catch(err=>{

      }).finally(()=>{
        this.$store.dispatch('loading',false);
      });
    },
    // 切换状态
    changeStatus(item){
      this.$store.dispatch('loading',true);
      PRODUCT.status(item.id,item.status?1:0).then(res=>{
        if(res.code == 200){
          this.getData();
        }
        this.notify(`<span class="color-blue">[ ${res.msg} ]</span>`);
      }).catch(err=>{
        this.notify(`<span class="color-blue">[ ${err} ]</span>`);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
    search(from){
      this.header = from;
      this.getList();
    },
    clear(data){
      this.header={
        id:'',
        status:1,
        title:'',
      }
      this.notify(`<span class="color-green">重置了搜索条件</span>`);
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
      page:{
        current:1,
        size:10,
        total:0
      },
      tableList:[],
      header:{
        id:'',
        status:'',
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
          value:'title'
        },
        {
          label:'售价',
          value:'outPrice'
        },
        {
          label:'分类',
          value:'categoryName'
        },
        {
          label:'店铺名称',
          value:'shopName'
        },
        {
          label:'状态',
          value:'status',
          set:true,
        },
        {
          label:'创建时间',
          value:'createTime'
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
          data:[]
        }
      ]
    }
  },
}