<template>
  <div class="joker-component-page">
    <el-pagination
      :class="align=='right'?'text-right':''"
      @size-change="changeSize"
      @current-change="changeCurrent"
      :current-page="page.current"
      :page-sizes="size"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props:{
    align:{
      type:String,
      default:()=>'right'
    },
    size:{
      type:Array,
      default:()=>[10,20,30,50]
    },
    page:{
      type:Object,
      default:()=>{
        return {
          size:10,
          total:0,
          current:1,
        }
      }
    }
  },
  methods:{
    changeCurrent(page){
      this.page.current = page;
      this.$emit('changePage',this.page)
    },
    changeSize(page){
      this.page.size = page;
      this.$emit('changePage',this.page)
    }
  }
}
</script>

<style lang="scss">
.joker-component-page{
  margin-top:20px;
  .text-right{
    text-align: right;
  }
}
.el-pager li {
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}
</style>