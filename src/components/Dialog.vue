<template>
    <el-dialog
      class="defalus-dialog"
      :visible.sync="defaultShow"
      :top="top"
      @close="close"
      :width="width">
      <Card :title="title">
        <slot name="right"/>
        <slot/>
      </Card>
    </el-dialog>
</template>

<script>
import Card from '@/components/Card';
export default {
  watch:{
    show(d){
      this.defaultShow = d;
    }
  },
  data(){
    return{
      defaultShow:false,
    }
  },
  props:{
    show:{
      type:Boolean,
      default:()=>false
    },
    width:{
      type:String,
      default:()=>'500px'
    },
    top:{
      type:String,
      default:()=>'5vh'
    },
    title:{
      type:String,
      default:()=>'操作'
    }
  },
  methods:{
    close(){
      this.$emit('close',this.defaultShow);
    }
  },
  components:{
    Card
  }
}
</script>

<style>

</style>