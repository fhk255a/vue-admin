import Card from '@/components/Card';
import Item from '@/components/Item';
import Dialog from '@/components/Dialog';
import Upload from '../upload.vue';
import Editor from '@/components/Editor';
import productData from '@/store/data/product';
import isPass from '@/lib/esss';
import PRODUCT,{ CATEGORY } from '@/api/product';
export default {
  mixins:[isPass],
  methods:{
    // 添加图片
    submitSkuImg(img){
      console.log(img)
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
          this.productInfo.images = JSON.parse(res.data.images);
          this.productInfo.propList = JSON.parse(res.data.propList);
          this.productInfo.categoryId = [this.productInfo.categoryId];
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
      this.productInfo.skuList[this.currentSkuIndex].imgUrl = url;
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
      this.$confirm('是否保存商品详情?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.productInfo.desc = this.htmlDesc;
        this.editDialog = false;
        this.notify(`<span class="color-red">您更改了商品详情.</span>`);
      }).catch(() => {
        this.notify('您点了取消');          
      });
    },
    // 编辑商品简介
    editOther(){
      this.otherDialog = true;
      this.propList = [...this.productInfo.propList];
    },
    // 保存简介
    saveProps(){
      this.$confirm('是否保存商品简介?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for(let i = 0 ; i < this.propList.length;i++){
          if(this.propList[i].key == ''){
            this.$refs['props-'+i].focus();
            this.$message.error('简介名称不能为空');
            return;
          }
        }
        this.productInfo.propList =[...this.propList];
        this.otherDialog = false;
        this.notify(`<span class="color-red">您更改了商品简介.</span>`);
      }).catch(() => {
        this.notify('您点了取消');          
      });
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
    // 保存全部商品信息
    saveProduct(){
      let timer = null;
      this.productInfo.categoryId = this.productInfo.categoryId[this.productInfo.categoryId.length-1];
      
      let data = {
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
    }
  },
  mounted(){
    if(this.$route.params.id!='add'){
      this.getData(this.$route.params.id);
    }
    console.log(this.category)
    if(this.category.length<1){
      CATEGORY.tree().then(res=>{
        if(res.code == 200){
          this.$store.dispatch('changeCategory',res.data);
        }
      })
    }
  },
  components:{
    Card,
    Upload,
    Editor,
    Item,
    Dialog
  }
}