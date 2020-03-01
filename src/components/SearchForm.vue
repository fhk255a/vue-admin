<template>
  <div class="joker-component-search-form">
    <div class="joker-form">
      <template v-for="(item) in data" >
        <!-- input -->
        <div class="joker-form-item" :key="item.key" v-if="item.type=='input'">
          <div class="joker-form-item-label">{{item.label}}</div>
          <div class="joker-form-item-content" :style="{'width':item.width?item.width+'px':width+'px'}">
            <el-input clearable v-model="header[item.key]" v-if="item.inputType=='number'" type="number" :placeholder="item.placeholder?item.placeholder:'请输入...'"/>
            <el-input clearable v-model="header[item.key]" v-else :placeholder="item.placeholder?item.placeholder:'请输入...'"/>
          </div>
        </div>
        <!-- textarea -->
        <div class="joker-form-item" :key="item.key" v-if="item.type=='textarea'">
          <div class="joker-form-item-label">{{item.label}}</div>
          <div class="joker-form-item-content" :style="{'width':item.width?item.width+'px':width+'px'}">
            <el-input clearable type="textarea" v-model="header[item.key]" :placeholder="item.placeholder?item.placeholder:'请输入...'"/>
          </div>
        </div>
        <!-- select -->
        <div class="joker-form-item" :key="item.key" v-if="item.type=='select'">
          <div class="joker-form-item-label">{{item.label}}</div>
          <div class="joker-form-item-content" :style="{'width':item.width?item.width+'px':width+'px'}">
            <el-select clearable v-model="header[item.key]" :placeholder="item.placeholder?item.placeholder:'请选择...'">
              <el-option v-for="(label) in item.data" :key="label.value" :label="label.label" :value="label.value"/>
            </el-select>
          </div>
        </div>
      </template>
      <!-- 默认按钮 走当前组件的方法 -->
      <div v-if="!btns" class="joker-form-item" >
        <el-button class="j-btn" @click="search">查询</el-button>
        <el-button @click="clear">清空</el-button>
      </div>
      <!-- 自定义按钮 走调用者的方法 -->
      <slot v-else name="btns" :scope="currentForm"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentForm:[], // 默认数据
    }
  },
  props:{
    btns:{
      type:Boolean,
      default:()=>false
    },
    // 默认宽度
    width:{
      type:Number,
      default:()=>{
        return 200;
      }
    },
    header:{
      type:Object,
      default:()=>{}
    },
    data:{
      type:Array,
      default:()=>{
        return [];
      }
    },
  },
  mounted(){
    // 初始化数据
    this.currentForm = {...this.header};
  },
  methods:{
    // 搜索
    search(){
      let data = {};
      let li = ``;
      // this.header.forEach(item=>{
      //   data[item.key] = item.value;
      //   li+=`<li>${item.key} : ${item.value}</li>`;
      // })
      for (const key in this.header) {
        li+=`<li>${key} : ${this.header[key]}</li>`;
      }
      // 不执行操作 只处理返回数据
      this.$emit('search',this.header);
      this.notify(`<ul>${li}<ul>`);
    },
    // 清空内容
    clear(){
      // 恢复默认表单数据
      // this.currentForm.map(item=>{
      //   for(let obj in this.initForm){
      //     if(item.key == obj){
      //       item.value = this.initForm[obj];
      //       break;
      //     }
      //   }
      //  return item;
      // })
      this.$emit('search',this.currentForm);
      this.notify(`<span style="color:#070f14">重置了搜索条件</span>`);
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
  flex-wrap: wrap;
  .joker-form-item{
    display: flex;
    align-items: center;  
    margin: 5px;
    .joker-form-item-label{
      margin-right: 10px;
    }
  }
}
</style>