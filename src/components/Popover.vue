<template>
  <el-popover
    placement="top"
    :width="width"
    v-model="show">
    <slot></slot>
    <p @mousedown.stop="" v-if="msg">{{msg}}</p>
    <div style="text-align: right; margin-top: 10px">
      <el-button size="mini" type="text" @click.stop="$emit('no')">取消</el-button>
      <el-button type="primary" size="mini" @click.stop="$emit('yes')">确定</el-button>
    </div>
  </el-popover>
</template>

<script>
export default {
  props:{
    width:{
      type:String,
      default:()=>'150px'
    },
    msg:{
      type:String,
      default:()=>''
    },
    show:{
      type:Boolean,
      default:()=>false
    },
  }
}
</script>