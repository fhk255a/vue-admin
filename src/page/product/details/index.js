import Card from '@/components/Card';
import Item from '@/components/Item';
import Dialog from '@/components/Dialog';
import Page from '@/components/Page';
import Upload from '../upload.vue';
import Editor from '@/components/Editor';
import isPass from '@/lib/esss';
import PRODUCT,{ CATEGORY,SHOP } from '@/api/product';
export default {
  mixins:[isPass],
  methods:{
    // 保存店铺
    saveShop(){
      const selectArr = this.$refs['multipleTable'].selection;
      if(selectArr.length>1){
        this.notify('店铺不能选择多个');
        this.$refs['multipleTable'].clearSelection();
        return;
      }else{
        this.shopShowDialog = false;
        this.productInfo.shopId = selectArr[0].id;
        this.productInfo.shopName = selectArr[0].name;
      }
    },
    changePage(page){
      this.page = page;
      this.getShopList();
    },
    // 打开店铺列表
    changeShopDialog(){
      this.shopShowDialog = true;
      this.productInfo.shopId = '';
      this.productInfo.shopName = '';
      this.getShopList();
    },
    getShopList(){
      const params = {
        id:this.shopHeader.id,
        name:this.shopHeader.name,
        from:this.shopHeader.from,
        current:this.page.current,
        size:this.page.size
      }
      this.$store.dispatch('loading',true);
      SHOP.list(params).then(res=>{
        if(res.code == 200){
          this.$store.dispatch('productShop',res.data.data);
          this.shopList = res.data.data;
          this.page.total = res.data.total;
        }
      }).catch(err=>{

      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
    // 添加图片
    submitSkuImg(img){
      if(img.code == 200){
        this.productInfo.skuList[img.index].imgUrl=img.data;
      }
    },
    // 新增sku
    addSku(){
      this.productInfo.skuList.push({
        id:null,
        label:'',
        inPrice:'',
        outPrice:'',
        status:false,
        imgUrl:'',
        count:0
      })
    },
    // 设置为主图
    setMainImage(){
      this.productInfo.mainImage = this.mainImage;
    },
    // 上传图片
    uploadSuccess(img){
      if(img.code==200){
        this.productInfo.images.push(img.data)
      }
      // 
    },
    // 获取商品详情
    getData(id){
      PRODUCT.details(id).then(res=>{
        if(res.code == 200){
          this.productInfo = res.data;
          this.mainImage = res.data.mainImage;
          this.productInfo.images = res.data.images?JSON.parse(res.data.images):[];
          this.productInfo.propList = res.data.propList?JSON.parse(res.data.propList):[];
          this.productInfo.attrList = res.data.attrList?JSON.parse(res.data.attrList):[];
          this.productInfo.categoryId = this.productInfo.categoryId?[this.productInfo.categoryId]:[];
          this.notify(`<span class="color-blue">你已进入商品详情页</span>`,'提示','warning');
        }else{
          this.notify(`<span class="color-red">${res.msg}</span>`,'EMMMMM...','error');
        }
      }).catch(err=>{
        
      })
    },
    // 修改详情页
    editDetails(){
      this.editDialog = true;
      this.htmlDesc = this.productInfo.desc;
    },
    updateHtml(desc){
      this.htmlDesc = desc;
    },
    // 选择sku图
    selectSku(url){
      this.productInfo.skuList[this.currentSkuIndex].imgUrl = url.image?url.image:url;
      this.skuDialog = false;
    },
    closeSku(){
      this.skuDialog = false;
      this.currentSkuIndex = null;
    },
    // 打开sku选择图
    openSku(index){
      this.currentSkuIndex = index;
      this.skuDialog=true;
    },
    // 删除sku
    deleteSku(item,index){
      this.productInfo.skuList.splice(index,1);
      if(item.id){
        this.deleteIds.push(item.id);
      }
    },
    // 保存商品
    saveDesc(){
      this.productInfo.desc = this.htmlDesc;
      this.editDialog = false;
    },
    // 编辑商品简介
    editOther(){
      this.otherDialog = true;
      this.propList = [...this.productInfo.propList];
    },
    // 保存简介
    saveProps(){
      for(let i = 0 ; i < this.propList.length;i++){
        if(this.propList[i].key == ''){
          this.$refs['props-'+i].focus();
          this.$message.error('简介名称不能为空');
          return;
        }
      }
      this.productInfo.propList =[...this.propList];
      this.otherDialog = false;
    },
    // 删除简介
    removeProps(row){
      const INDEX = this.productInfo.propList.findIndex(item=>{
        return (item.value==row.value && item.key == row.key)
      });
      if(INDEX != -1){
        this.productInfo.propList.splice(INDEX,1);
      }
    },
    // 添加简介
    addProps(){
      this.propList.push({
        key:'',
        value:'',
      })
    },
    getCategory(){
      this.categoryDialog = true;
      if(this.category.length<1){
        CATEGORY.tree().then(res=>{
          if(res.code == 200){
            this.$store.dispatch('changeCategory',res.data);
          }
        })
      }
    },
    // 保存全部商品信息
    saveProduct(){
      let timer = null;
      if(this.productInfo.categoryId.length>0){
        this.productInfo.categoryId = this.productInfo.categoryId[this.productInfo.categoryId.length-1];
      }else{
        this.notify(`<span class="color-red">商品分类不能为空</span>`,'EMMMMM...','error');
      }
      let data={
        deleteIds:this.deleteIds.join(','),
        json:JSON.stringify(this.productInfo)
      }
      this.$confirm('是否确定更改商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearTimeout(timer);
        PRODUCT.save(data).then(res=>{
          if(res.code == 200){
            this.notify(`<span class="color-blue">[ ${res.msg} ] </span>`,'success','修改成功');
            if(res.data.id){
              this.$router.push(`/product/details/${res.data.id}`);
              this.getData(res.data.id);
            }
          }else{
            this.notify(`<span class="color-red">${res.msg}</span>`,'EMMMMM...','error');
          }
        }).catch(err=>{
          this.notify(res.msg);       
        })
      }).catch(() => {
        this.notify('您点了取消');          
      });
    }
  },
  data(){
    return{
      // 店铺分页
      page:{
        size:20,
        current:1,
        total:0
      },
      // 店铺搜索框
      shopHeader:{
        id:'',
        name:'',
        from:'',
      },
      categoryDialog:false,//修改分类
      shopShowDialog:false, // 店铺列表展示
      shopList:[],// 店铺列表数据
      // 商品信息
      productInfo:{
        propList:[], // 简介列表
        skuList:[], // sku列表
        attrList:[], // 规格
        desc:'',
        images:[],// 商品图片
        title:'',
        subTitle:'',
        inPrice:'',
        outPrice:'',
        categoryId:[1],
        fromUrl:'',//来源链接
        tag:[],
        mainImage:'',//主图
        id:null
      },  
      deleteIds:[],// 删除的sku
      currentSkuIndex:null,
      skuDialog:false,
      propList:[],
      htmlDesc:'',// 商品详情页
      mainImage:'', // 主图
      editDialog:false, // 编辑详情页
      otherDialog:false, // 修改简介页
    }
  },
  computed: {
    category(){
      return this.$store.state.product.category;
    },
    shop(){
      return this.$store.state.product.shopList;
    },
  },
  mounted(){
    if(this.$route.params.id!='add'){
      this.getData(this.$route.params.id);
    }
  },
  components:{
    Card,
    Upload,
    Editor,
    Item,
    Dialog,
    Page
  }
}