<template>
  <div class="joker-component-search-form">
    <div class="joker-form">
      <template v-for="(item) in currentForm" >
        <!-- input -->
        <div class="joker-form-item" :key="item.key" v-if="item.type=='input'">
          <div class="joker-form-item-label">{{item.label}}</div>
          <div class="joker-form-item-content" :style="{'width':item.width?item.width+'px':width+'px'}">
            <el-input v-model="item.value" v-if="item.inputType=='number'" type="number" :placeholder="item.placeholder?item.placeholder:'请输入...'"/>
            <el-input v-model="item.value" v-else :placeholder="item.placeholder?item.placeholder:'请输入...'"/>
          </div>
        </div>
        <!-- textarea -->
        <div class="joker-form-item" :key="item.key" v-if="item.type=='textarea'">
          <div class="joker-form-item-label">{{item.label}}</div>
          <div class="joker-form-item-content" :style="{'width':item.width?item.width+'px':width+'px'}">
            <el-input type="textarea" v-model="item.value" :placeholder="item.placeholder?item.placeholder:'请输入...'"/>
          </div>
        </div>
        <!-- select -->
        <div class="joker-form-item" :key="item.key" v-if="item.type=='select'">
          <div class="joker-form-item-label">{{item.label}}</div>
          <div class="joker-form-item-content" :style="{'width':item.width?item.width+'px':width+'px'}">
            <el-select clearable v-model="item.value" :placeholder="item.placeholder?item.placeholder:'请选择...'">
              <el-option v-for="(label) in item.data" :key="label.value" :label="label.label" :value="label.value"/>
            </el-select>
          </div>
        </div>
      </template>
      <slot name="btns"></slot>
      <slot>
        <div class="joker-form-item" >
          <el-button class="j-btn" @click="search">查询</el-button>
          <el-button @click="clear">清空</el-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentForm:[], // 默认数据
      initForm:{}, // 用来存储第一次加载的默认的value
    }
  },
  props:{
    width:{
      type:Number,
      default:()=>{
        return 200;
      }
    },
    data:{
      type:Array,
      default:()=>{
        return [];
      }
    },
  },
  mounted(){
    this.currentForm = [...this.data];
    this.data.forEach(item=>{
      this.initForm[item.key] = item.value;
    })
  },
  methods:{
    // 搜索
    search(){
      let data = {};
      this.currentForm.forEach(item=>{
        data[item.key] = item.value;
      })
      this.$emit('search',data);
    },
    // 清空内容
    clear(){
      this.currentForm.map(item=>{
        for(let obj in this.initForm){
          if(item.key == obj){
            item.value = this.initForm[obj];
            break;
          }
        }
       return item;
      })
    }
  }
}
</script>

<style lang="scss">
.joker-component-search-form{
  border:1px solid #eee;    
  padding: 20px;    
  border-radius: 6px;
}
.joker-form{
  display: flex;
  .joker-form-item{
    display: flex;
    align-items: center;  
    margin-right: 50px;
    .joker-form-item-label{
      margin-right: 10px;
    }
  }
}
</style>