<template>
  <div class="joker-page-product">
    <Search-from @search="search" :data="header" :init="header">
      <!-- <template v-slot:btns>
        <div class="joker-form-item" >
          <el-button class="j-btn" @click="searchBtn">查询</el-button>
          <el-button @click="">清空</el-button>
        </div>
      </template> -->
    </Search-from>
    <div class=""></div>
  </div>
</template>

<script>
import SearchFrom from '@/components/SearchFrom';
export default {
  components:{
    SearchFrom,
  },
  methods:{
    search(from){
      console.log(from);
    }
  },
  data(){
    return{
      header:[
        {
          label:'商品名称',
          type:'input',
          inputType:'number',
          value:'',
          key:'name',
        },
        {
          type:'select',    
          label:'状态',
          value:'1',
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
  mounted(){
    console.log(this.$route);
  }
}
</script>